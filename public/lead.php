<?php
// Consultation / feedback form endpoint: delivers requests to a Telegram bot.
// Secrets come from lead-config.php (generated at deploy time from GitHub secrets) or from environment variables.
// Never commit real values.
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body, array $headers = []): void {
    http_response_code($status);
    foreach ($headers as $h) header($h);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    // Diagnostics: open /lead.php in a browser. Shows only whether PHP runs and whether secrets reached the server.
    $c = is_file(__DIR__ . '/lead-config.php') ? (include __DIR__ . '/lead-config.php') : [];
    $c = is_array($c) ? $c : [];
    respond(200, [
        'php' => PHP_VERSION,
        'config_file' => is_file(__DIR__ . '/lead-config.php'),
        'token_set' => ($c['TELEGRAM_BOT_TOKEN'] ?? '') !== '',
        'recipients' => count(array_filter(array_map('trim', explode(',', (string)($c['TELEGRAM_CHAT_ID'] ?? ''))))),
        'curl' => function_exists('curl_init'),
    ]);
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, ['ok' => false, 'error' => 'method_not_allowed'], ['Allow: GET, POST']);

// Same-origin check against cross-site posts
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && $host !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

// Rate limit: 5 requests / 10 minutes per IP (file based, per hosting account)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/lexsite_rl_' . md5($ip);
$now = time();
$hits = [];
if (is_file($rlFile)) {
    $hits = array_values(array_filter(array_map('intval', file($rlFile, FILE_IGNORE_NEW_LINES) ?: []), fn($t) => $now - $t < 600));
}
if (count($hits) >= 5) respond(429, ['ok' => false, 'error' => 'rate_limited'], ['Retry-After: 600']);
$hits[] = $now;
@file_put_contents($rlFile, implode("\n", $hits), LOCK_EX);

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 8000) respond(413, ['ok' => false, 'error' => 'too_large']);
$data = json_decode($raw, true);
if (!is_array($data)) respond(400, ['ok' => false, 'error' => 'bad_json']);

// Honeypot
if (!empty($data['website'])) respond(400, ['ok' => false, 'error' => 'rejected']);

$name = trim((string)($data['name'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$consent = ($data['consent'] ?? false) === true;
$digits = preg_replace('/\D/', '', $phone) ?? '';

$errors = [];
$len = fn(string $s): int => function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
if ($len($name) < 2) $errors['name'] = 'Вкажіть ім’я (щонайменше 2 символи)';
elseif ($len($name) > 100) $errors['name'] = 'Занадто довге ім’я';
if (strlen($phone) > 30) $errors['phone'] = 'Занадто довгий номер';
elseif (!preg_match('/^\+?[\d\s()\-]{9,20}$/', $phone) || strlen($digits) < 9 || strlen($digits) > 15) $errors['phone'] = 'Вкажіть коректний номер телефону';
if ($len($message) > 2000) $errors['message'] = 'Повідомлення занадто довге (максимум 2000 символів)';
if (!$consent) $errors['consent'] = 'Потрібна згода на обробку персональних даних';
if ($errors) respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);

$config = is_file(__DIR__ . '/lead-config.php') ? (include __DIR__ . '/lead-config.php') : [];
$token = is_array($config) ? ($config['TELEGRAM_BOT_TOKEN'] ?? '') : '';
$chatId = is_array($config) ? ($config['TELEGRAM_CHAT_ID'] ?? '') : '';
if ($token === '') $token = (string)getenv('TELEGRAM_BOT_TOKEN');
if ($chatId === '') $chatId = (string)getenv('TELEGRAM_CHAT_ID');
if ($token === '' || $chatId === '') {
    // Honest failure: never claim delivery when the bot is not configured.
    error_log('[consultation] Telegram bot not configured; request NOT delivered');
    respond(503, ['ok' => false, 'error' => 'not_configured']);
}

$text = "Нова заявка з сайту\n\nІм’я: $name\nТелефон: $phone\nПовідомлення: " . ($message !== '' ? $message : '—');
$url = 'https://api.telegram.org/bot' . $token . '/sendMessage';

// TELEGRAM_CHAT_ID may hold one or several Telegram user IDs, comma-separated (each must have pressed /start in the bot).
$recipients = array_values(array_filter(array_map('trim', explode(',', $chatId)), fn($v) => $v !== ''));

$send = function (string $to) use ($url, $text): bool {
    $payload = json_encode(['chat_id' => $to, 'text' => $text, 'disable_web_page_preview' => true], JSON_UNESCAPED_UNICODE);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        curl_exec($ch);
        $done = curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
        curl_close($ch);
        return $done;
    }
    $ctx = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-Type: application/json\r\n", 'content' => $payload, 'timeout' => 8, 'ignore_errors' => true]]);
    $res = @file_get_contents($url, false, $ctx);
    return $res !== false && (json_decode($res, true)['ok'] ?? false) === true;
};

// Success if at least one recipient received the request.
$ok = false;
foreach ($recipients as $to) {
    if ($send($to)) $ok = true;
}

if (!$ok) {
    error_log('[consultation] Telegram delivery failed'); // no personal data or secrets in logs
    respond(502, ['ok' => false, 'error' => 'delivery_failed']);
}
respond(200, ['ok' => true]);

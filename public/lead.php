<?php
// Consultation / feedback form endpoint: delivers requests to a Telegram bot.
// Written for old PHP (5.4+): no arrow functions, no scalar type hints, no ?? operator.
// Secrets come from lead-config.php (generated at deploy time from GitHub secrets) or from environment variables.
// Never commit real values.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond($status, $body, $headers = array()) {
    http_response_code($status);
    foreach ($headers as $h) header($h);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function val($arr, $key, $default = '') {
    return (is_array($arr) && isset($arr[$key])) ? $arr[$key] : $default;
}

function text_len($s) {
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

function load_config() {
    $file = dirname(__FILE__) . '/lead-config.php';
    if (!is_file($file)) return array();
    $c = include $file;
    return is_array($c) ? $c : array();
}

$method = val($_SERVER, 'REQUEST_METHOD');

if ($method === 'GET') {
    // Diagnostics: open /lead.php in a browser. Shows only whether PHP runs and whether secrets reached the server.
    $c = load_config();
    $ids = array_filter(array_map('trim', explode(',', (string)val($c, 'TELEGRAM_CHAT_ID'))));
    respond(200, array(
        'php' => PHP_VERSION,
        'config_file' => is_file(dirname(__FILE__) . '/lead-config.php'),
        'token_set' => val($c, 'TELEGRAM_BOT_TOKEN') !== '',
        'recipients' => count($ids),
        'curl' => function_exists('curl_init'),
    ));
}
if ($method !== 'POST') respond(405, array('ok' => false, 'error' => 'method_not_allowed'), array('Allow: GET, POST'));

// Same-origin check against cross-site posts
$origin = val($_SERVER, 'HTTP_ORIGIN');
$host = val($_SERVER, 'HTTP_HOST');
if ($origin !== '' && $host !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) {
    respond(403, array('ok' => false, 'error' => 'forbidden'));
}

// Rate limit: 5 requests / 10 minutes per IP (file based)
$ip = val($_SERVER, 'REMOTE_ADDR', 'unknown');
$rlFile = sys_get_temp_dir() . '/lexsite_rl_' . md5($ip);
$now = time();
$hits = array();
if (is_file($rlFile)) {
    $lines = file($rlFile, FILE_IGNORE_NEW_LINES);
    if (is_array($lines)) {
        foreach ($lines as $t) {
            if ($now - (int)$t < 600) $hits[] = (int)$t;
        }
    }
}
if (count($hits) >= 5) respond(429, array('ok' => false, 'error' => 'rate_limited'), array('Retry-After: 600'));
$hits[] = $now;
@file_put_contents($rlFile, implode("\n", $hits), LOCK_EX);

$raw = file_get_contents('php://input');
if ($raw === false) $raw = '';
if (strlen($raw) > 8000) respond(413, array('ok' => false, 'error' => 'too_large'));
$data = json_decode($raw, true);
if (!is_array($data)) respond(400, array('ok' => false, 'error' => 'bad_json'));

// Honeypot
if (val($data, 'website') !== '') respond(400, array('ok' => false, 'error' => 'rejected'));

$name = trim((string)val($data, 'name'));
$phone = trim((string)val($data, 'phone'));
$message = trim((string)val($data, 'message'));
$consent = val($data, 'consent', false) === true;
$digits = preg_replace('/\D/', '', $phone);

$errors = array();
if (text_len($name) < 2) $errors['name'] = 'Вкажіть ім’я (щонайменше 2 символи)';
elseif (text_len($name) > 100) $errors['name'] = 'Занадто довге ім’я';
if (strlen($phone) > 30) $errors['phone'] = 'Занадто довгий номер';
elseif (!preg_match('/^\+?[\d\s()\-]{9,20}$/', $phone) || strlen($digits) < 9 || strlen($digits) > 15) $errors['phone'] = 'Вкажіть коректний номер телефону';
if (text_len($message) > 2000) $errors['message'] = 'Повідомлення занадто довге (максимум 2000 символів)';
if (!$consent) $errors['consent'] = 'Потрібна згода на обробку персональних даних';
if (count($errors) > 0) respond(422, array('ok' => false, 'error' => 'validation', 'fields' => $errors));

$config = load_config();
$token = (string)val($config, 'TELEGRAM_BOT_TOKEN');
$chatId = (string)val($config, 'TELEGRAM_CHAT_ID');
if ($token === '') $token = (string)getenv('TELEGRAM_BOT_TOKEN');
if ($chatId === '') $chatId = (string)getenv('TELEGRAM_CHAT_ID');
if ($token === '' || $chatId === '') {
    // Honest failure: never claim delivery when the bot is not configured.
    error_log('[consultation] Telegram bot not configured; request NOT delivered');
    respond(503, array('ok' => false, 'error' => 'not_configured'));
}

$text = "Нова заявка з сайту\n\nІм’я: " . $name . "\nТелефон: " . $phone . "\nПовідомлення: " . ($message !== '' ? $message : '—');
$url = 'https://api.telegram.org/bot' . $token . '/sendMessage';

// TELEGRAM_CHAT_ID may hold one or several Telegram user IDs, comma-separated (each must have pressed /start in the bot).
$recipients = array_filter(array_map('trim', explode(',', $chatId)));

function send_telegram($url, $to, $text) {
    $payload = json_encode(array('chat_id' => $to, 'text' => $text, 'disable_web_page_preview' => true), JSON_UNESCAPED_UNICODE);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_exec($ch);
        $done = (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200);
        curl_close($ch);
        return $done;
    }
    $ctx = stream_context_create(array('http' => array('method' => 'POST', 'header' => "Content-Type: application/json\r\n", 'content' => $payload, 'timeout' => 8, 'ignore_errors' => true)));
    $res = @file_get_contents($url, false, $ctx);
    if ($res === false) return false;
    $j = json_decode($res, true);
    return is_array($j) && val($j, 'ok', false) === true;
}

// Success if at least one recipient received the request.
$ok = false;
foreach ($recipients as $to) {
    if (send_telegram($url, $to, $text)) $ok = true;
}

if (!$ok) {
    error_log('[consultation] Telegram delivery failed'); // no personal data or secrets in logs
    respond(502, array('ok' => false, 'error' => 'delivery_failed'));
}
respond(200, array('ok' => true));

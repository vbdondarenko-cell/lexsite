import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { consultationSchema, flattenErrors } from "@/lib/consultation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 8_000;

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  // Same-origin check against cross-site form posts
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  if (!rateLimit(`lead:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "Retry-After": "600" } });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(json);
  if (!parsed.success) {
    // Honeypot hit: reject without delivery
    const honeypotHit = typeof json === "object" && json !== null && "website" in json && (json as { website?: string }).website;
    if (honeypotHit) return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
    return NextResponse.json({ ok: false, error: "validation", fields: flattenErrors(parsed.error) }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const telegramOn = Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
  const emailOn = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && LEAD_TO_EMAIL);
  if (!telegramOn && !emailOn) {
    // Honest failure: never claim delivery when no channel is configured.
    console.error("[consultation] no delivery channel configured (Telegram/SMTP); request NOT delivered");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { name, phone, message } = parsed.data;
  const jobs: Promise<void>[] = [];

  if (telegramOn) {
    jobs.push(
      (async () => {
        const text = `Нова заявка з сайту

Ім’я: ${name}
Телефон: ${phone}
Повідомлення: ${message || "—"}`;
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
          signal: AbortSignal.timeout(8_000),
        });
        if (!res.ok) throw new Error(`telegram ${res.status}`);
      })(),
    );
  }

  if (emailOn) {
    jobs.push(
      (async () => {
        const transport = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT ?? 465),
          secure: (SMTP_SECURE ?? "true") === "true",
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
        await transport.sendMail({
          from: LEAD_FROM_EMAIL || SMTP_USER,
          to: LEAD_TO_EMAIL,
          subject: "Нова заявка на консультацію — сайт адвоката",
          text: `Ім’я: ${name}
Телефон: ${phone}
Повідомлення: ${message || "—"}`,
          html: `<p><b>Ім’я:</b> ${esc(name)}</p><p><b>Телефон:</b> ${esc(phone)}</p><p><b>Повідомлення:</b> ${esc(message || "—")}</p>`,
        });
      })(),
    );
  }

  // Success if at least one configured channel delivered. Errors are logged without personal data or secrets.
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[consultation] delivery channel failed:", r.reason instanceof Error ? r.reason.message.replace(/bot[^/s]+/g, "bot***") : "unknown");
  });
  if (!results.some((r) => r.status === "fulfilled")) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  // Personal data is intentionally NOT logged.
  return NextResponse.json({ ok: true });
}

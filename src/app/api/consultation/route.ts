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

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_TO_EMAIL) {
    // Honest failure: never claim delivery when the mail channel is not configured.
    console.error("[consultation] SMTP is not configured; request NOT delivered");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { name, phone, message } = parsed.data;
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: (SMTP_SECURE ?? "true") === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: LEAD_FROM_EMAIL || SMTP_USER,
      to: LEAD_TO_EMAIL,
      subject: "Нова заявка на консультацію — сайт LEX",
      text: `Ім’я: ${name}\nТелефон: ${phone}\nПовідомлення: ${message || "—"}`,
      html: `<p><b>Ім’я:</b> ${esc(name)}</p><p><b>Телефон:</b> ${esc(phone)}</p><p><b>Повідомлення:</b> ${esc(message || "—")}</p>`,
    });
  } catch (e) {
    console.error("[consultation] delivery failed", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  // Personal data is intentionally NOT logged.
  return NextResponse.json({ ok: true });
}

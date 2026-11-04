import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn().mockResolvedValue({});
vi.mock("nodemailer", () => ({ default: { createTransport: () => ({ sendMail }) } }));

import { POST } from "@/app/api/consultation/route";
import { consultationSchema } from "@/lib/consultation";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";

const good = { name: "Іван", phone: "+38 (095) 123 45 67", message: "Потрібна консультація", consent: true, website: "" };
const req = (body: unknown, ip = "1.1.1.1", headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/consultation", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip, host: "localhost", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const smtpEnv = { SMTP_HOST: "smtp.test", SMTP_USER: "u", SMTP_PASS: "p", LEAD_TO_EMAIL: "to@test.invalid" };

beforeEach(() => {
  resetRateLimit();
  sendMail.mockClear();
  for (const k of Object.keys(smtpEnv)) delete process.env[k];
});

describe("consultationSchema", () => {
  it("accepts a valid request", () => expect(consultationSchema.safeParse(good).success).toBe(true));
  it.each([
    ["short name", { ...good, name: "І" }],
    ["bad phone", { ...good, phone: "abc" }],
    ["no consent", { ...good, consent: false }],
    ["too long message", { ...good, message: "x".repeat(2001) }],
  ])("rejects %s", (_n, v) => expect(consultationSchema.safeParse(v).success).toBe(false));
});

describe("rateLimit", () => {
  it("blocks after the limit and recovers after the window", () => {
    expect(rateLimit("k", 2, 1000, 0)).toBe(true);
    expect(rateLimit("k", 2, 1000, 1)).toBe(true);
    expect(rateLimit("k", 2, 1000, 2)).toBe(false);
    expect(rateLimit("k", 2, 1000, 1500)).toBe(true);
  });
});

describe("POST /api/consultation", () => {
  it("returns 422 with field errors on invalid input", async () => {
    const res = await POST(req({ ...good, phone: "1" }));
    expect(res.status).toBe(422);
    expect((await res.json()).fields.phone).toBeTruthy();
  });

  it("rejects the honeypot without sending mail", async () => {
    Object.assign(process.env, smtpEnv);
    const res = await POST(req({ ...good, website: "http://spam" }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("never reports success when SMTP is not configured (503)", async () => {
    const res = await POST(req(good));
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
  });

  it("delivers and returns ok when configured", async () => {
    Object.assign(process.env, smtpEnv);
    const res = await POST(req(good));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail.mock.calls[0]![0].to).toBe("to@test.invalid");
  });

  it("reports 502 when delivery throws (no false success)", async () => {
    Object.assign(process.env, smtpEnv);
    sendMail.mockRejectedValueOnce(new Error("boom"));
    const res = await POST(req(good));
    expect(res.status).toBe(502);
  });

  it("escapes HTML in the mail body", async () => {
    Object.assign(process.env, smtpEnv);
    await POST(req({ ...good, message: "<script>x</script>" }));
    expect(sendMail.mock.calls[0]![0].html).not.toContain("<script>");
  });

  it("rate limits the 6th request from one IP", async () => {
    Object.assign(process.env, smtpEnv);
    for (let i = 0; i < 5; i++) expect((await POST(req(good, "9.9.9.9"))).status).toBe(200);
    expect((await POST(req(good, "9.9.9.9"))).status).toBe(429);
  });

  it("rejects cross-origin posts", async () => {
    const res = await POST(req(good, "2.2.2.2", { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    expect((await POST(req("{nope", "3.3.3.3"))).status).toBe(400);
    expect((await POST(req("x".repeat(9000), "4.4.4.4"))).status).toBe(413);
  });
});

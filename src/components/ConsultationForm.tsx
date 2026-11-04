"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { consultationSchema, flattenErrors, type FieldErrors } from "@/lib/consultation";

type Status = "idle" | "submitting" | "error";

const serverMessages: Record<string, string> = {
  rate_limited: "Забагато спроб. Будь ласка, спробуйте пізніше або зателефонуйте нам.",
  not_configured: "Заявки тимчасово не приймаються. Будь ласка, зателефонуйте нам.",
  delivery_failed: "Не вдалося доставити заявку. Будь ласка, спробуйте ще раз або зателефонуйте нам.",
};

export function ConsultationForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const id = useId();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const check = consultationSchema.safeParse(payload);
    if (!check.success) {
      setErrors(flattenErrors(check.error));
      setFormError("");
      setStatus("idle");
      return;
    }
    setErrors({});
    setFormError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
      if (res.ok && data.ok) {
        router.push("/dyakuiemo");
        return;
      }
      if (res.status === 422 && data.fields) setErrors(data.fields);
      setFormError(serverMessages[data.error ?? ""] ?? "Не вдалося надіслати заявку. Будь ласка, спробуйте ще раз або зателефонуйте нам.");
      setStatus("error");
    } catch {
      setFormError("Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.");
      setStatus("error");
    }
  }

  const f = (k: keyof FieldErrors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });
  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className={tone === "dark" ? "on-dark" : "on-light"} aria-busy={busy}>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="field">
          <span>Ім’я</span>
          <input className="input" name="name" autoComplete="name" required {...f("name")} />
          {errors.name && <p id={`${id}-name-err`} className="field-error" role="alert">{errors.name}</p>}
        </label>
        <label className="field">
          <span>Телефон</span>
          <input className="input" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+38 (0__) ___ __ __" required {...f("phone")} />
          {errors.phone && <p id={`${id}-phone-err`} className="field-error" role="alert">{errors.phone}</p>}
        </label>
      </div>
      <label className="field mt-8">
        <span>Коротко про ситуацію (необов’язково)</span>
        <textarea className="input" name="message" rows={3} {...f("message")} />
        {errors.message && <p id={`${id}-message-err`} className="field-error" role="alert">{errors.message}</p>}
      </label>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px]" >
        <label>Не заповнюйте це поле<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="mt-8">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-brass" {...f("consent")} />
          <span>Я погоджуюсь на обробку персональних даних відповідно до <Link href="/polityka-konfidentsiinosti" className="underline underline-offset-4">політики конфіденційності</Link>.</span>
        </label>
        {errors.consent && <p id={`${id}-consent-err`} className="field-error" role="alert">{errors.consent}</p>}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-solid" disabled={busy}>{busy ? "Надсилаємо…" : "Відправити"}</button>
        <p className="text-sm opacity-80">Для економії Вашого часу, просимо попередньо записуватись на зустріч з адвокатом</p>
      </div>
      <div role="status" aria-live="polite" className="mt-6 min-h-6">
        {formError && <p className="field-error" role="alert">{formError}</p>}
      </div>
    </form>
  );
}

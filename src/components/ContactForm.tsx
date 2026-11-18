"use client";

import { useState, type FormEvent } from "react";
import { consultationSchema, flattenErrors, type FieldErrors } from "@/lib/consultation";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ fallbackPhone }: { fallbackPhone: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const parsed = consultationSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error));
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 422) {
        const data = (await res.json()) as { fields?: FieldErrors };
        setErrors(data.fields ?? {});
        setStatus("idle");
        return;
      }
      setNote(res.status === 429 ? "Забагато спроб. Спробуйте пізніше або зателефонуйте." : `Не вдалося надіслати заявку. Зателефонуйте нам: ${fallbackPhone}.`);
      setStatus("error");
    } catch {
      setNote(`Немає зв’язку з сервером. Зателефонуйте нам: ${fallbackPhone}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="glass p-8 text-center">
        <p className="serif text-[length:var(--text-h3)]">Дякуємо! Заявку надіслано.</p>
        <p className="mt-3 text-mist">Ми зв’яжемося з вами найближчим часом.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass grid gap-6 p-6 sm:p-9">
      <label className="field">
        <span>Ім’я</span>
        <input className="input" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
        {errors.name && <p id="e-name" className="field-error">{errors.name}</p>}
      </label>
      <label className="field">
        <span>Телефон</span>
        <input className="input" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+38 0__ ___ __ __" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
        {errors.phone && <p id="e-phone" className="field-error">{errors.phone}</p>}
      </label>
      <label className="field">
        <span>Опишіть ситуацію (необов’язково)</span>
        <textarea className="input min-h-28 resize-y" name="message" rows={4} aria-invalid={!!errors.message} />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </label>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex items-start gap-3 text-sm text-mist">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-[#ffe358]" aria-invalid={!!errors.consent} />
        <span>Погоджуюсь на обробку персональних даних для зворотного зв’язку</span>
      </label>
      {errors.consent && <p className="field-error -mt-3">{errors.consent}</p>}
      <button type="submit" className="btn btn-solid justify-center" disabled={status === "sending"}>
        {status === "sending" ? "Надсилаємо…" : "Надіслати заявку"}
      </button>
      {status === "error" && <p role="alert" className="field-error">{note}</p>}
    </form>
  );
}

import { useState, type FormEvent } from "react";
import { validateConsultation, type FieldErrors } from "@/lib/consultation";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ fallbackPhone, email, onSent }: { fallbackPhone: string; email: string; onSent?: () => void }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [draft, setDraft] = useState<{ name: string; phone: string; message: string } | null>(null);

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
    const found = validateConsultation(payload);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      return;
    }
    setErrors({});
    setDraft({ name: payload.name, phone: payload.phone, message: payload.message });
    setStatus("sending");
    try {
      const res = await fetch("/lead.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      // Success only when the endpoint really answered with {"ok":true}. A 200 with anything else
      // (e.g. the SPA index.html served for an unknown path) must NOT be shown as "sent".
      let data: { ok?: boolean; fields?: FieldErrors } | null = null;
      try {
        data = (await res.json()) as { ok?: boolean; fields?: FieldErrors };
      } catch {
        data = null;
      }
      if (res.ok && data?.ok === true) {
        setStatus("sent");
        form.reset();
        onSent?.();
        return;
      }
      if (res.status === 422 && data?.fields) {
        setErrors(data.fields);
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
        <textarea className="input min-h-20 resize-y" name="message" rows={3} aria-invalid={!!errors.message} />
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
      {status === "error" && (
        <div role="alert" className="field-error space-y-3">
          <p>{note}</p>
          {draft && (
            <a
              className="btn btn-line justify-center"
              href={`mailto:${email}?subject=${encodeURIComponent("Заявка з сайту")}&body=${encodeURIComponent(`Ім’я: ${draft.name}
Телефон: ${draft.phone}

${draft.message}`)}`}
            >
              Надіслати листом з вашої пошти
            </a>
          )}
        </div>
      )}
    </form>
  );
}

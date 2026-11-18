"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/ContactForm";

const FIRST_DELAY_MS = 10_000;
const SECOND_DELAY_MS = 5 * 60_000;
const SENT_KEY = "feedback-sent";

const safeGet = (k: string) => { try { return window.localStorage.getItem(k); } catch { return null; } };
const safeSet = (k: string, v: string) => { try { window.localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

/**
 * Feedback form as a dismissible modal. Opens automatically:
 *  1) 10 s after the page opens, or earlier when the visitor has scrolled to the very bottom;
 *  2) again 5 min after the page opened.
 * Never auto-opens once a request was sent. Links to #zvorotnij-zvyazok open it manually.
 */
export function FeedbackPopup({ phone, email }: { phone: string; email: string }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const firstShown = useRef(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const show = useCallback((manual = false) => {
    if (openRef.current) return;
    if (!manual && safeGet(SENT_KEY)) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    openRef.current = true;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  // Automatic triggers
  useEffect(() => {
    const first = () => {
      if (firstShown.current) return;
      firstShown.current = true;
      show();
    };
    const t1 = window.setTimeout(first, FIRST_DELAY_MS);
    const t2 = window.setTimeout(() => show(), SECOND_DELAY_MS);
    const onScroll = () => {
      const el = document.documentElement;
      if (window.innerHeight + window.scrollY >= el.scrollHeight - 80) first();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const poll = window.setInterval(onScroll, 500); // also covers delayed/throttled scroll events
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  // Manual triggers: any link to #zvorotnij-zvyazok
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href$="#zvorotnij-zvyazok"]');
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      show(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  // Modal behaviour: Esc, scroll lock, focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(8,28,70,0.65)] p-0 sm:items-center sm:p-6" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        onClick={(e) => e.stopPropagation()}
        className="on-dark relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-graphite p-5 text-ivory shadow-2xl sm:rounded-lg sm:p-8"
      >
        <button ref={closeBtn} type="button" onClick={close} aria-label="Закрити" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-2xl leading-none text-mist hover:text-white">×</button>
        <p className="kicker mb-3">§ Зворотний зв’язок</p>
        <h2 id="feedback-title" className="serif pr-10 text-[length:var(--text-h2)]">Безкоштовна консультація</h2>
        <p className="mb-6 mt-3 text-mist">Залиште ім’я та номер телефону — ми передзвонимо й підкажемо, що робити у вашій ситуації.</p>
        <ContactForm fallbackPhone={phone} email={email} onSent={() => safeSet(SENT_KEY, String(Date.now()))} />
        <button type="button" onClick={close} className="mt-4 w-full py-2 text-sm text-mist underline underline-offset-4 hover:text-white">Не зараз</button>
      </div>
    </div>
  );
}

import { company } from "@/content/site";

/** Mobile/tablet: the phone number stays in view while scrolling. Desktop shows it in the sticky header. */
export function FloatingCall() {
  const phone = company.phones[0]!;
  return (
    <a
      href={`tel:${phone.tel}`}
      aria-label={`Зателефонувати ${phone.display}`}
      className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-3 rounded-lg bg-sun px-5 py-3.5 text-base font-bold text-graphite shadow-[0_8px_24px_rgba(14,50,126,0.45)] sm:left-auto sm:right-5 lg:hidden"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>
      {phone.display}
    </a>
  );
}

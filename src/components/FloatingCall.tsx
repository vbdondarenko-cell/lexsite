import { company } from "@/content/site";

export function FloatingCall() {
  const phone = company.phones[0]!;
  return (
    <a
      href={`tel:${phone.tel}`}
      aria-label={`Зателефонувати ${phone.display}`}
      className="fixed bottom-4 right-4 z-30 flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-brass-deep text-white shadow-[0_4px_14px_rgba(14,50,126,0.4)] sm:px-5 w-12 sm:w-auto lg:hidden"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>
      <span className="hidden text-sm font-semibold sm:inline">{phone.display}</span>
    </a>
  );
}

import { Scales } from "@/components/Decor";
import { company } from "@/content/site";
import { MobileNav } from "./MobileNav";

export const navLinks = [
  { href: "#kontakty", label: "Контакти" },
  { href: "#pro-nas", label: "Про нас" },
  { href: "#advokat", label: "Адвокати" },
  { href: "#poslugy", label: "Категорії справ" },
];

export function Header() {
  const phone = company.phones[0]!;
  return (
    <header className="on-dark sticky top-0 z-50 h-[4.5rem] border-b border-white/10 bg-graphite text-ivory">
      <div className="wrap flex h-full items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-3" aria-label="Адвокат — на головну">
          <span aria-hidden className="grid h-10 w-10 place-items-center rounded-[0.6rem] bg-brass text-graphite"><Scales className="h-7 w-7" /></span>
          <span className="serif text-[1.7rem] tracking-[0.06em]">Адвокат</span>
        </a>
        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] uppercase tracking-[0.14em]">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="py-2 hover:text-brass">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <a href={`tel:${phone.tel}`} className="hidden text-sm font-semibold tracking-wide hover:text-brass lg:block">{phone.display}</a>
        <MobileNav links={navLinks} phone={phone} />
      </div>
    </header>
  );
}

import Link from "next/link";
import { company } from "@/content/site";
import { MobileNav } from "./MobileNav";

export const navLinks = [
  { href: "/#poslugy", label: "Категорії справ" },
  { href: "/#kontakty", label: "Контакти" },
];

export function Header() {
  const phone = company.phones[0]!;
  return (
    <header className="on-dark sticky top-0 z-50 h-[4.5rem] border-b border-white/10 bg-graphite/80 text-ivory backdrop-blur-xl">
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="LEX — на головну">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-[0.6rem] bg-brass text-lg font-bold text-graphite">L</span>
          <span className="serif text-[1.4rem] tracking-[0.14em]">LEX</span>
        </Link>
        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] uppercase tracking-[0.14em]">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="py-2 hover:text-brass">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <a href={`tel:${phone.tel}`} className="hidden text-sm font-semibold tracking-wide hover:text-brass lg:block">{phone.display}</a>
        <MobileNav links={navLinks} phone={phone} />
      </div>
    </header>
  );
}

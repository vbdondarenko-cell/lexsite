import Link from "next/link";
import { company } from "@/content/site";
import { MobileNav } from "./MobileNav";

export const navLinks = [
  { href: "/pro-nas", label: "Про нас" },
  { href: "/poslugy/naselennyu", label: "Населенню" },
  { href: "/poslugy/biznesu", label: "Бізнесу" },
  { href: "/spravy", label: "Справи" },
  { href: "/vidhuky", label: "Відгуки" },
  { href: "/kontakty", label: "Контакти" },
];

export function Header() {
  const phone = company.phones[0]!;
  return (
    <header className="on-dark sticky top-0 z-50 h-[4.5rem] bg-graphite text-ivory">
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" className="serif text-[1.9rem] tracking-[0.18em]" aria-label="LEX — на головну">LEX</Link>
        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] uppercase tracking-[0.14em]">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="py-2 hover:text-brass">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <a href={`tel:${phone.tel}`} className="hidden text-sm tracking-wide hover:text-brass lg:block">{phone.display}</a>
        <MobileNav links={navLinks} phone={phone} />
      </div>
    </header>
  );
}

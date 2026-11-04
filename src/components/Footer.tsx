import Link from "next/link";
import { company } from "@/content/site";
import { navLinks } from "./Header";

export function Footer() {
  return (
    <footer className="on-dark bg-graphite text-ivory">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="serif text-[2.5rem] tracking-[0.18em]">LEX</p>
          <p className="mt-4 max-w-xs text-mist">{company.tagline}</p>
        </div>
        <nav aria-label="Нижня навігація" className="lg:col-span-3">
          <p className="kicker mb-5">Розділи</p>
          <ul className="space-y-3">
            {navLinks.map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-brass">{l.label}</Link></li>))}
            <li><Link href="/polityka-konfidentsiinosti" className="hover:text-brass">Політика конфіденційності</Link></li>
          </ul>
        </nav>
        <address className="not-italic lg:col-span-5">
          <p className="kicker mb-5">Контакти</p>
          <ul className="space-y-3">
            {company.phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`} className="hover:text-brass">{p.display}</a> <span className="text-mist">— {p.person}</span></li>
            ))}
            <li>{company.address}</li>
            {company.hours.map((h) => (<li key={h.days} className="text-mist">{h.days}: {h.time}</li>))}
          </ul>
        </address>
      </div>
      <div className="wrap rule border-slate py-6 text-sm text-mist">
        <p>© LEX. Сайт розроблено BONSI Studios.</p>
      </div>
    </footer>
  );
}

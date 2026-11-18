import { company } from "@/content/site";

export function Footer() {
  const phone = company.phones[0]!;
  return (
    <footer className="on-dark border-t border-white/10 bg-graphite text-ivory">
      <div className="wrap flex flex-col gap-4 pt-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>© Адвокат Хегай О.Б. · Черкаси · {company.address}</p>
        <p>
          <a href={`tel:${phone.tel}`} className="hover:text-brass">{phone.display}</a>
          {" · "}
          <a href={`mailto:${company.email}`} className="hover:text-brass">{company.email}</a>
        </p>
      </div>
      <div className="wrap pb-24 pt-6 text-center lg:pb-8">
        <p className="border-t border-white/10 pt-5 text-[0.7rem] uppercase tracking-[0.3em] text-mist/70">
          <a href="https://bonsi.site" target="_blank" rel="noopener noreferrer" aria-label="BONSI — відкрити bonsi.site" className="inline-block py-1 hover:text-ivory">
            from <span className="font-bold tracking-[0.3em] text-ivory">BONSI</span>
          </a>
        </p>
      </div>
    </footer>
  );
}

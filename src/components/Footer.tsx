import { company } from "@/content/site";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const phone = company.phones[0]!;
  return (
    <footer className="on-dark border-t border-white/10 bg-graphite text-ivory">
      <div className="wrap pt-10">
        {/* Top row: contacts + social */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Contact info */}
          <div className="text-sm text-mist space-y-1">
            <p className="font-semibold text-ivory">© Адвокат Хегай О.Б. · Черкаси</p>
            <p>{company.address}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <a href={`tel:${phone.tel}`} className="hover:text-brass transition-colors">{phone.display}</a>
              <a href={`mailto:${company.email}`} className="hover:text-brass transition-colors">{company.email}</a>
            </p>
          </div>

          {/* Social icons */}
          <SocialLinks />
        </div>

        {/* Hours row */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-mist/70">
          {company.hours.map((h) => (
            <span key={h.days}>{h.days}: <span className="text-mist">{h.time}</span></span>
          ))}
        </div>

        {/* BONSI credit */}
        <div className="pb-24 pt-6 text-center lg:pb-8">
          <p className="border-t border-white/10 pt-5 text-[0.7rem] uppercase tracking-[0.3em] text-mist/70">
            <a href="https://bonsi.site" target="_blank" rel="noopener noreferrer" aria-label="BONSI — відкрити bonsi.site" className="inline-block py-1 hover:text-ivory">
              from <span className="font-bold tracking-[0.3em] text-ivory">BONSI</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

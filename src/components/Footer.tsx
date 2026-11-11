import { company } from "@/content/site";

export function Footer() {
  const phone = company.phones[0]!;
  return (
    <footer className="on-dark border-t border-white/10 bg-graphite text-ivory">
      <div className="wrap flex flex-col gap-4 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>© LEX · Адвокат Черкаси · {company.address}</p>
        <p>
          <a href={`tel:${phone.tel}`} className="hover:text-brass">{phone.display}</a>
          {" · "}
          <a href={`mailto:${company.email}`} className="hover:text-brass">{company.email}</a>
        </p>
      </div>
    </footer>
  );
}

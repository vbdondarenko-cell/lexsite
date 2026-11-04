import { PageHero } from "@/components/Ui";
import { ConsultationSection } from "@/components/ServicePages";
import { company, consultationCta } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Контакти та консультація",
  description: "Адвокатська компанія LEX: м. Черкаси, бул. Шевченка, 389. Телефони, графік роботи та запис на консультацію.",
  path: "/kontakty",
});

const route = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Черкаси, бульвар Шевченка, 389")}`;

export default function Page() {
  return (
    <>
      <PageHero kicker="Контакти" title="Контакти й консультація" lead={consultationCta.contactsLead} />
      <section className="wrap grid gap-14 py-20 md:grid-cols-3">
        <div>
          <h2 className="kicker mb-5">Адреса</h2>
          <p className="serif text-2xl">{company.address}</p>
          <a href={route} className="btn btn-line mt-6" target="_blank" rel="noopener noreferrer">Маршрут на карті</a>
        </div>
        <div>
          <h2 className="kicker mb-5">Режим роботи</h2>
          <ul className="space-y-2">{company.hours.map((h) => (<li key={h.days}><span className="text-slate">{h.days}:</span> {h.time}</li>))}</ul>
        </div>
        <div>
          <h2 className="kicker mb-5">Телефони</h2>
          <ul className="space-y-4">
            {company.phones.map((p) => (
              <li key={p.tel}><a className="serif text-2xl hover:text-brass-deep" href={`tel:${p.tel}`}>{p.display}</a><br /><span className="text-slate">{p.person}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <ConsultationSection />
    </>
  );
}

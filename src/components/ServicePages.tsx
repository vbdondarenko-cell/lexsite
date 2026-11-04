import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getService, relatedServices, servicesByCategory, type ServiceCategory } from "@/content/services";
import { consultationCta } from "@/content/site";
import { ConsultationForm } from "./ConsultationForm";
import { Breadcrumbs, PageHero, ServiceIndex } from "./Ui";

export function ConsultationSection({ id = "konsultatsiia", tone = "dark" }: { id?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section id={id} className={dark ? "on-dark bg-slate text-ivory" : "bg-ivory-deep"}>
      <div className="wrap grid gap-14 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <p className="kicker mb-6">Консультація</p>
          <h2 className="serif text-[length:var(--text-h2)]">{consultationCta.title}</h2>
          <p className="mt-6 max-w-md opacity-85">{consultationCta.text}</p>
        </div>
        <div className="lg:col-span-7"><ConsultationForm tone={dark ? "dark" : "light"} /></div>
      </div>
    </section>
  );
}

export function ServiceCatalog({ category }: { category: ServiceCategory }) {
  const list = servicesByCategory(category);
  return (
    <>
      <PageHero kicker={categoryLabels[category]} title={categoryLabels[category]} lead={consultationCta.text} />
      <section className="wrap py-20">
        <ServiceIndex list={list} base={`/poslugy/${category}`} />
      </section>
      <ConsultationSection />
    </>
  );
}

export function ServiceDetail({ category, slug }: { category: ServiceCategory; slug: string }) {
  const s = getService(category, slug);
  if (!s) notFound();
  const related = relatedServices(s);
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { href: `/poslugy/${category}`, label: categoryLabels[category] }, { label: s.title }]} />
      <PageHero kicker={categoryLabels[category]} title={s.title} />
      <section className="wrap grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {s.items.length > 0 ? (
            <>
              <h2 className="serif mb-8 text-[length:var(--text-h3)]">Перелік юридичних дій</h2>
              <ul className="prose-measure">
                {s.items.map((it) => (
                  <li key={it} className="rule flex gap-5 py-4">
                    <span aria-hidden className="text-brass-deep">—</span><span>{it}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="prose-measure text-lg">{consultationCta.text}</p>
          )}
        </div>
        <aside className="lg:col-span-4" aria-label="Пов’язані послуги">
          <h2 className="kicker mb-6">Пов’язані послуги</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug} className="rule py-4"><Link className="serif text-xl hover:text-brass-deep" href={`/poslugy/${r.category}/${r.slug}`}>{r.title}</Link></li>
            ))}
          </ul>
        </aside>
      </section>
      <ConsultationSection />
    </>
  );
}

export const detailStaticParams = (category: ServiceCategory) => servicesByCategory(category).map((s) => ({ slug: s.slug }));

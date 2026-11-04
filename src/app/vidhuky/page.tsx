import { PageHero } from "@/components/Ui";
import { ConsultationSection } from "@/components/ServicePages";
import { testimonials } from "@/content/testimonials";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Відгуки клієнтів",
  description: "Відгуки клієнтів адвокатської компанії LEX.",
  path: "/vidhuky",
});

export default function Page() {
  return (
    <>
      <PageHero kicker="Відгуки" title="Відгуки наших клієнтів" />
      <section className="wrap py-20">
        <ul>
          {testimonials.map((t) => (
            <li key={t.author + t.dateOriginal} className="rule grid gap-6 py-12 lg:grid-cols-12">
              <figure className="lg:col-span-9">
                <blockquote className="serif text-[length:var(--text-h3)] leading-snug">“{t.text}”</blockquote>
                <figcaption className="mt-6 text-sm"><span className="font-medium">{t.author}</span> <span className="text-slate">· {t.dateOriginal}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <ConsultationSection />
    </>
  );
}

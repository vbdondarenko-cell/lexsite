import Link from "next/link";
import { PageHero } from "@/components/Ui";
import { ConsultationSection } from "@/components/ServicePages";
import { cases } from "@/content/cases";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Вирішені справи",
  description: "Приклади вирішених справ адвокатської компанії LEX: сімейні, боргові, податкові, цивільні, мобілізаційні та господарські спори.",
  path: "/spravy",
});

export default function Page() {
  return (
    <>
      <PageHero kicker="Практика" title="Вирішені справи" />
      <section className="wrap py-20">
        <ol>
          {cases.map((c, i) => (
            <li key={c.slug}>
              <Link href={`/spravy/${c.slug}`} className="row-link">
                <span className="kicker">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif text-[length:var(--text-h3)]">{c.title}</span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <ConsultationSection />
    </>
  );
}

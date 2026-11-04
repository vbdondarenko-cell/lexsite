import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { ConsultationSection } from "@/components/ServicePages";
import { cases, getCase } from "@/content/cases";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  return pageMeta({ title: c.title, description: c.situation[0] ?? c.title, path: `/spravy/${c.slug}` });
}

export default async function Page({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const practice = getService(c.practice.category, c.practice.slug);
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Головна" }, { href: "/spravy", label: "Вирішені справи" }, { label: c.title }]} />
      <PageHero kicker="Вирішена справа" title={c.title} />
      <article className="wrap grid gap-16 py-20 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-8">
          <section aria-labelledby="s1">
            <h2 id="s1" className="kicker mb-5">Ситуація</h2>
            {c.situation.map((p) => (<p key={p} className="prose-measure mb-4 text-lg">{p}</p>))}
          </section>
          <section aria-labelledby="s2">
            <h2 id="s2" className="kicker mb-5">Позиція та дії адвокатів</h2>
            {c.actionsLead && <p className="prose-measure mb-4 text-lg">{c.actionsLead}</p>}
            {c.actions.length > 1 && c.actionsLead ? (
              <ul className="prose-measure">{c.actions.map((a) => (<li key={a} className="rule py-3">{a}</li>))}</ul>
            ) : (
              c.actions.map((a) => (<p key={a} className="prose-measure mb-4 text-lg">{a}</p>))
            )}
          </section>
          {c.resultText && (
            <section aria-labelledby="s3">
              <h2 id="s3" className="kicker mb-5">Результат</h2>
              {c.resultText.map((p) => (<p key={p} className="serif prose-measure text-[length:var(--text-h3)] leading-snug">{p}</p>))}
            </section>
          )}
        </div>
        <aside className="lg:col-span-4" aria-labelledby="s4">
          <h2 id="s4" className="kicker mb-5">Пов’язана юридична практика</h2>
          {practice && <Link href={`/poslugy/${practice.category}/${practice.slug}`} className="serif rule block py-4 text-xl hover:text-brass-deep">{practice.title}</Link>}
        </aside>
      </article>
      <ConsultationSection />
    </>
  );
}

import { PageHero } from "@/components/Ui";
import { ConsultationSection } from "@/components/ServicePages";
import { about, stats } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Про нас",
  description: "Адвокатська компанія LEX, Черкаси: господарське, цивільне, кримінальне, сімейне, земельне, трудове, адміністративне та військове право.",
  path: "/pro-nas",
});

export default function Page() {
  return (
    <>
      <PageHero kicker="Про нас" title="Чесність, конфіденційність і персональний підхід" />
      <section className="wrap grid gap-14 py-20 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          {about.paragraphs.map((p) => (<p key={p} className="prose-measure text-lg">{p}</p>))}
          <p className="prose-measure text-lg">{about.abroad}</p>
        </div>
        <div className="lg:col-span-5">
          <blockquote className="serif border-l border-brass pl-8 text-[length:var(--text-h2)] leading-tight">“{about.quote}”</blockquote>
          <p className="mt-8 text-slate">{about.closing}</p>
        </div>
      </section>
      <section className="on-dark bg-graphite text-ivory" aria-label="Показники компанії">
        <dl className="wrap grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}><dt className="kicker order-2 mt-2">{s.label}</dt><dd className="serif text-[length:var(--text-h1)]">{s.value}</dd></div>
          ))}
        </dl>
      </section>
      <ConsultationSection />
    </>
  );
}

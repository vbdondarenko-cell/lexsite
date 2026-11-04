import Link from "next/link";
import { ConsultationSection } from "@/components/ServicePages";
import { ServiceIndex } from "@/components/Ui";
import { cases } from "@/content/cases";
import { servicesByCategory } from "@/content/services";
import { about, company, stats } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "LEX — адвокатська компанія, Черкаси",
  description: "Правова допомога для бізнесу та населення в Черкасах. Вирішуємо проблеми будь якої складності та надаємо безкоштовну консультацію.",
  path: "/",
});

export default function Home() {
  const phone = company.phones[0]!;
  return (
    <>
      {/* 2. Hero. Photography slot is intentionally typographic until client-approved real photos exist. */}
      <section className="on-dark relative overflow-hidden bg-graphite text-ivory">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {[58, 70, 82, 94].map((l) => (<div key={l} className="absolute inset-y-0 border-l border-slate" style={{ left: `${l}%` }} />))}
        </div>
        <div className="wrap relative py-28 lg:py-44">
          <p className="kicker reveal mb-10">Адвокатська компанія · {company.addressCity}</p>
          <h1 className="serif reveal max-w-[14ch] text-[length:var(--text-display)]">Правова допомога для бізнесу та населення</h1>
          <p className="reveal mt-10 max-w-xl text-lg text-mist">{company.heroLead}</p>
          <div className="reveal mt-12 flex flex-wrap gap-4">
            <a href="#konsultatsiia" className="btn btn-solid">Безкоштовна консультація</a>
            <a href={`tel:${phone.tel}`} className="btn btn-line">{phone.display}</a>
          </div>
        </div>
      </section>

      {/* 3. Stats (verbatim, pending client confirmation) */}
      <section aria-label="Ключові показники" className="bg-ivory-deep">
        <dl className="wrap grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse"><dt className="kicker mt-2">{s.label}</dt><dd className="serif text-[length:var(--text-h1)]">{s.value}</dd></div>
          ))}
        </dl>
      </section>

      {/* 4. Introduction */}
      <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5"><p className="kicker mb-6">Про нас</p><h2 className="serif text-[length:var(--text-h2)]">Понад 15 років у сфері права</h2></div>
        <div className="space-y-6 lg:col-span-7">
          <p className="prose-measure text-lg">{about.paragraphs[0]}</p>
          <p className="prose-measure text-lg">{about.paragraphs[1]}</p>
          <Link href="/pro-nas" className="btn btn-line">Більше про компанію</Link>
        </div>
      </section>

      {/* 5. Population / Business split */}
      <section className="grid lg:grid-cols-2">
        {([
          ["Для населення", "/poslugy/naselennyu", "bg-graphite text-ivory on-dark"],
          ["Для бізнесу", "/poslugy/biznesu", "bg-slate text-ivory on-dark"],
        ] as const).map(([t, href, cls]) => (
          <Link key={href} href={href} className={`${cls} group block p-10 py-20 lg:p-20`}>
            <p className="kicker mb-6">Послуги</p>
            <p className="serif text-[length:var(--text-h1)]">{t}</p>
            <span className="btn btn-line mt-10 group-hover:bg-ivory group-hover:text-graphite">Переглянути послуги →</span>
          </Link>
        ))}
      </section>

      {/* 6. Practices */}
      <section className="wrap py-24 lg:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="serif text-[length:var(--text-h2)]">Основні юридичні практики</h2>
          <Link href="/poslugy/naselennyu" className="btn btn-line">Усі послуги</Link>
        </div>
        <ServiceIndex list={servicesByCategory("naselennyu").slice(0, 6)} base="/poslugy/naselennyu" />
      </section>

      {/* 7. Principles — only what the legacy text states */}
      <section className="on-dark bg-graphite text-ivory">
        <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5"><p className="kicker mb-6">Принципи роботи</p>
            <ul className="serif text-[length:var(--text-h2)]">{about.principles.map((p) => (<li key={p} className="rule py-3 first-letter:uppercase">{p}</li>))}</ul></div>
          <div className="lg:col-span-7 lg:pl-12">
            <p className="serif text-[length:var(--text-h3)] leading-snug">{about.paragraphs[4]}</p>
            <blockquote className="mt-10 border-l border-brass pl-8 text-mist">“{about.quote}”</blockquote>
          </div>
        </div>
      </section>

      {/* 8. Cases */}
      <section className="wrap py-24 lg:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="serif text-[length:var(--text-h2)]">Вирішені справи</h2>
          <Link href="/spravy" className="btn btn-line">Усі справи</Link>
        </div>
        <ol>{cases.map((c, i) => (
          <li key={c.slug}><Link href={`/spravy/${c.slug}`} className="row-link"><span className="kicker">{String(i + 1).padStart(2, "0")}</span><span className="serif text-[length:var(--text-h3)]">{c.title}</span><span aria-hidden>→</span></Link></li>
        ))}</ol>
      </section>

      {/* 9. Testimonials */}
      <section className="bg-ivory-deep">
        <div className="wrap py-24 lg:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="serif text-[length:var(--text-h2)]">Відгуки наших клієнтів</h2>
            <Link href="/vidhuky" className="btn btn-line">Усі відгуки</Link>
          </div>
          <ul className="grid gap-10 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <li key={t.author + t.dateOriginal}><figure><blockquote className="text-lg">“{t.text}”</blockquote><figcaption className="mt-5 text-sm"><span className="font-medium">{t.author}</span> · {t.dateOriginal}</figcaption></figure></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 + 11. Consultation; contacts live in the footer */}
      <ConsultationSection />
    </>
  );
}

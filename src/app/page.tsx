import Image from "next/image";
import { businessCategories, populationCategories, type Category } from "@/content/categories";
import { Scales } from "@/components/Decor";
import { about, company, lawyer, stats } from "@/content/site";
import { CategoryTile } from "@/components/CategoryTile";
import { ContactForm } from "@/components/ContactForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Адвокат Черкаси",
  description: "Адвокат у Черкасах: правова допомога для бізнесу та населення. Безкоштовна консультація. бул. Шевченка, 389, оф. 22.",
  path: "/",
});

// Exact office point (49.4231852, 32.0974704, per client). dir/ opens turn-by-turn route from the visitor's location.
const route = "https://www.google.com/maps/dir/?api=1&destination=49.4231852,32.0974704";

function CategoryGrid({ id, label, list, cta }: { id: string; label: string; list: Category[]; cta?: boolean }) {
  return (
    <div className="mt-12">
      <h3 id={id} className="kicker mb-6">{label}</h3>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((c, i) => (
          <CategoryTile key={c.title} index={i} category={c} />
        ))}
        {cta && (
          <li className="rounded-lg bg-graphite p-5 text-ivory sm:p-6">
            <span aria-hidden className="text-xl font-bold text-brass">→</span>
            <p className="serif mt-3 text-[length:var(--text-h3)]">Не знайшли свою справу?</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#c9d8f2]">Безкоштовна консультація — опишіть ситуацію, і ми знайдемо рішення.</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Home() {
  const [main] = company.phones;
  return (
    <>
      {/* 1. Contacts first, per client */}
      <section id="kontakty" className="on-dark hero-stage scroll-mt-20 bg-slate text-ivory">
        <div className="wrap relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <p className="kicker reveal mb-5">§ Адвокат · {company.addressCity}</p>
            <h1 className="serif reveal text-[length:var(--text-display)]">
              Правові послуги для населення і <span className="text-sun">бізнесу</span>
            </h1>
            <p className="reveal mt-6 max-w-xl text-base text-mist sm:text-lg">{company.heroLead}</p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href={`tel:${main!.tel}`} className="btn btn-solid">Зателефонувати</a>
              <a href="#pro-nas" className="btn btn-line">Про нас</a>
            </div>
          </div>

          <div className="glass reveal p-6 sm:p-9">
            <p className="kicker">Контакти</p>
            <ul className="mt-4 space-y-3">
              {company.phones.map((p) => (
                <li key={p.tel} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <a href={`tel:${p.tel}`} className="serif text-[1.6rem] leading-tight hover:text-brass sm:text-[1.9rem]">{p.display}</a>
                  <span className="text-sm text-mist">{p.person}</span>
                </li>
              ))}
            </ul>
            <div className="rule my-6" />
            <address className="space-y-2 not-italic">
              <p>{company.address}</p>
              <p><a href={`mailto:${company.email}`} className="hover:text-brass">{company.email}</a></p>
              <p><a href={`https://${company.website}`} className="hover:text-brass" target="_blank" rel="noopener noreferrer">www.{company.website}</a></p>
            </address>
            <ul className="mt-5 space-y-2 text-sm">
              {company.hours.map((h) => (
                <li key={h.days} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-mist"><span aria-hidden className="h-2 w-2 rounded-full bg-brass" />{h.days}</span>
                  <span className="serif text-lg">{h.time}</span>
                </li>
              ))}
            </ul>
            <a href={route} className="btn btn-line mt-6" target="_blank" rel="noopener noreferrer">Маршрут на карті</a>
          </div>
        </div>
      </section>

      {/* 2. About us (text from lex.ck.ua) */}
      <section id="pro-nas" className="on-light scroll-mt-20">
        <div className="wrap py-14 sm:py-20 lg:py-28">
          <p className="kicker mb-5">§ Про нас</p>
          <h2 className="serif max-w-[22ch] text-[length:var(--text-h1)]">Адвокат</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div className="space-y-4 text-base leading-relaxed text-mist sm:text-lg">
              {about.paragraphs.map((p) => (<p key={p}>{p}</p>))}
              <p>{about.abroad}</p>
            </div>
            <div>
              <blockquote className="serif border-l-2 border-brass-deep pl-5 text-[length:var(--text-h3)]">{about.quote}</blockquote>
              <ul className="mt-6 flex flex-wrap gap-2">
                {about.principles.map((p) => (<li key={p} className="rounded-full border border-brass-deep/30 px-4 py-1.5 text-sm capitalize text-brass-deep">{p}</li>))}
              </ul>
              <p className="mt-6 text-mist">{about.closing}</p>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="tile p-5">
                <dt className="serif text-[length:var(--text-h1)] text-brass-deep">{s.value}</dt>
                <dd className="mt-1 text-sm text-mist">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. The lawyer */}
      <section id="advokat" className="on-dark relative scroll-mt-20 overflow-hidden bg-graphite text-ivory">
        <div className="wrap relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
          <figure className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-brass/30">
              <Image src={lawyer.photo} alt={lawyer.photoAlt} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover object-[50%_20%]" />
            </div>
            <figcaption className="mt-5">
              <p className="serif text-[length:var(--text-h3)]">{lawyer.name}</p>
              <p className="kicker mt-2">{lawyer.role} · {company.addressCity}</p>
            </figcaption>
          </figure>
          <div>
            <p className="kicker mb-5">§ Про адвоката</p>
            <h2 className="serif max-w-[20ch] text-[length:var(--text-h1)]">{lawyer.name}</h2>
            <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {lawyer.facts.map((f) => (
                <div key={f.value} className="tile p-3 sm:p-5">
                  <dt className="serif text-[length:var(--text-h2)] text-brass">{f.value}</dt>
                  <dd className="mt-2 text-xs leading-snug text-mist sm:text-sm">{f.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-mist sm:text-lg">
              {lawyer.paragraphs.map((p) => (<p key={p}>{p}</p>))}
            </div>
            <p className="mt-8 border-l-2 border-brass pl-4 text-sm leading-relaxed text-mist">{lawyer.certificate}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-brass/30 lg:col-span-2">
            <Image src={lawyer.teamPhoto} alt={lawyer.teamPhotoAlt} fill sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Case categories */}
      <section id="poslugy" className="on-light relative scroll-mt-20 overflow-hidden bg-ivory-deep">
        <Scales className="pointer-events-none absolute -right-10 top-10 hidden h-[26rem] w-[26rem] text-brass-deep opacity-[0.06] lg:block" />
        <div className="wrap relative py-14 sm:py-20 lg:py-28">
          <p className="kicker mb-5">§ Категорії справ</p>
          <h2 className="serif max-w-[22ch] text-[length:var(--text-h1)]">З якими справами ми працюємо</h2>
          <p className="mt-6 max-w-2xl text-base text-mist sm:text-lg">Супроводжуємо клієнтів на всіх етапах — від консультації до повного вирішення справи в суді чи мирним шляхом.</p>
          <CategoryGrid id="naselennyu" label="Для населення" list={populationCategories} />
          <CategoryGrid id="biznesu" label="Для бізнесу" list={businessCategories} cta />
        </div>
      </section>

      {/* 5. Feedback form */}
      <section id="zvorotnij-zvyazok" className="on-dark scroll-mt-20 bg-graphite text-ivory">
        <div className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
          <div>
            <p className="kicker mb-5">§ Зворотний зв’язок</p>
            <h2 className="serif max-w-[18ch] text-[length:var(--text-h1)]">Безкоштовна консультація</h2>
            <p className="mt-6 max-w-lg text-base text-mist sm:text-lg">Залиште ім’я та номер телефону — ми передзвонимо й підкажемо, що робити у вашій ситуації.</p>
            <address className="mt-8 space-y-1 not-italic text-mist">
              <p>{company.address}</p>
              <p><a href={route} className="text-sun underline underline-offset-4" target="_blank" rel="noopener noreferrer">Як дістатися на карті</a></p>
            </address>
          </div>
          <ContactForm fallbackPhone={main!.display} email={company.email} />
        </div>
      </section>
    </>
  );
}

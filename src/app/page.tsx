import { businessCategories, populationCategories, type Category } from "@/content/categories";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Адвокат Черкаси — адвокатська компанія LEX",
  description: "Адвокат у Черкасах: правова допомога для бізнесу та населення. Безкоштовна консультація. бул. Шевченка, 389, оф. 22.",
  path: "/",
});

const route = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Черкаси, бульвар Шевченка, 389")}`;

function CategoryGrid({ id, label, list, cta }: { id: string; label: string; list: Category[]; cta?: boolean }) {
  return (
    <div className="mt-14">
      <h3 id={id} className="kicker mb-6">{label}</h3>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((c, i) => (
          <li key={c.title} className="tile p-6">
            <span className="kicker">{String(i + 1).padStart(2, "0")}</span>
            <p className="serif mt-3 text-[length:var(--text-h3)]">{c.title}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{c.description}</p>
          </li>
        ))}
        {cta && (
          <li className="rounded-[1.25rem] bg-brass p-6 text-graphite shadow-[0_14px_44px_-6px_rgba(52,229,194,0.45)]">
            <span aria-hidden className="text-xl font-bold">→</span>
            <p className="serif mt-3 text-[length:var(--text-h3)]">Не знайшли свою справу?</p>
            <p className="mt-3 text-[0.95rem] font-semibold leading-relaxed opacity-80">Безкоштовна консультація — опишіть ситуацію, і ми знайдемо рішення.</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Home() {
  const [main, ...others] = company.phones;
  return (
    <>
      <section className="on-dark hero-stage bg-graphite text-ivory">
        <div aria-hidden className="glow" style={{ top: "-12rem", right: "-8rem", width: "42rem", height: "36rem", background: "#14b8a6", opacity: 0.4 }} />
        <div aria-hidden className="glow" style={{ bottom: "-10rem", left: "-12rem", width: "40rem", height: "32rem", background: "#0b5f66", opacity: 0.5 }} />
        <div aria-hidden className="floor" />
        <div className="wrap relative grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <p className="kicker reveal mb-8">Адвокат · {company.addressCity}</p>
            <h1 className="serif reveal text-[length:var(--text-display)]">
              Правові послуги для населення і <span className="text-brass">бізнесу</span>
            </h1>
            <p className="reveal mt-8 max-w-xl text-lg text-mist">{company.heroLead}</p>
            <div className="reveal mt-10 flex flex-wrap gap-4">
              <a href={`tel:${main!.tel}`} className="btn btn-solid">Зателефонувати</a>
              <a href="#poslugy" className="btn btn-line">Категорії справ</a>
            </div>
          </div>

          <div className="glass tilt reveal p-8 sm:p-10">
            <p className="kicker">Зателефонуйте</p>
            <a href={`tel:${main!.tel}`} className="serif mt-4 block text-[length:var(--text-h2)] leading-tight hover:text-brass">{main!.display}</a>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mist">
              {others.map((p) => (
                <li key={p.tel}>
                  {p.person}
                  <br />
                  <a href={`tel:${p.tel}`} className="serif text-[1.05rem] text-ivory hover:text-brass">{p.display}</a>
                </li>
              ))}
            </ul>
            <div className="rule my-8" />
            <p className="kicker">Графік роботи</p>
            <ul className="mt-4 space-y-3">
              {company.hours.map((h) => (
                <li key={h.days} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3"><span aria-hidden className="h-2.5 w-2.5 rounded-full bg-brass shadow-[0_0_10px_var(--color-brass)]" />{h.days}</span>
                  <span className="serif text-[1.05rem]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="poslugy" className="on-dark relative overflow-hidden bg-graphite text-ivory">
        <div aria-hidden className="glow" style={{ top: "20rem", right: "-14rem", width: "40rem", height: "40rem", background: "#14b8a6", opacity: 0.18 }} />
        <div className="wrap relative py-20 lg:py-28">
          <p className="kicker mb-6">Категорії справ</p>
          <h2 className="serif max-w-[22ch] text-[length:var(--text-h1)]">З якими справами ми працюємо</h2>
          <p className="mt-6 max-w-2xl text-lg text-mist">Супроводжуємо клієнтів на всіх етапах — від консультації до повного вирішення справи в суді чи мирним шляхом.</p>
          <CategoryGrid id="naselennyu" label="Для населення" list={populationCategories} />
          <CategoryGrid id="biznesu" label="Для бізнесу" list={businessCategories} cta />
        </div>
      </section>

      <section id="kontakty" className="on-dark relative overflow-hidden bg-graphite text-ivory">
        <div aria-hidden className="floor" />
        <div className="wrap relative py-20 lg:py-28">
          <p className="kicker mb-6">Контакти</p>
          <h2 className="serif max-w-[22ch] text-[length:var(--text-h1)]">Зв’яжіться з нами</h2>
          <p className="mt-6 max-w-2xl text-lg text-mist">Для економії Вашого часу, просимо попередньо записуватись на зустріч з адвокатом.</p>
          <div className="glass mt-12 grid gap-10 p-8 sm:p-12 lg:grid-cols-3">
            <div>
              <h3 className="kicker mb-5">Телефони</h3>
              <ul className="space-y-4">
                {company.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="serif text-xl hover:text-brass">{p.display}</a>
                    <br />
                    <span className="text-sm text-mist">{p.person}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="kicker mb-5">Графік роботи</h3>
              <ul className="space-y-3">
                {company.hours.map((h) => (<li key={h.days}><span className="text-mist">{h.days}:</span><br /><span className="serif text-xl">{h.time}</span></li>))}
              </ul>
            </div>
            <div>
              <h3 className="kicker mb-5">Адреса та пошта</h3>
              <address className="not-italic">
                <p className="text-lg">{company.address}</p>
                <a href={`mailto:${company.email}`} className="mt-3 block text-lg hover:text-brass">{company.email}</a>
              </address>
              <a href={route} className="btn btn-line mt-6" target="_blank" rel="noopener noreferrer">Маршрут на карті</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

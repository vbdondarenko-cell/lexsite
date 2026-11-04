import { PageHero } from "@/components/Ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Політика конфіденційності",
  description: "Політика конфіденційності сайту адвокатської компанії LEX.",
  path: "/polityka-konfidentsiinosti",
});

// DRAFT: the legacy site has no privacy policy. This text must be reviewed and approved by the client's lawyers
// before launch (docs/CONTENT_APPROVAL.md). It describes only what this site technically does.
export default function Page() {
  return (
    <>
      <PageHero kicker="Документ" title="Політика конфіденційності" />
      <section className="wrap py-20">
        <div className="prose-measure space-y-6 text-lg">
          <p><strong>Статус: чернетка, очікує погодження замовником.</strong></p>
          <h2 className="serif text-[length:var(--text-h3)]">Які дані ми отримуємо</h2>
          <p>Через форму консультації ми отримуємо ім’я, номер телефону та, за вашим бажанням, короткий опис ситуації.</p>
          <h2 className="serif text-[length:var(--text-h3)]">Для чого ми їх використовуємо</h2>
          <p>Виключно для того, щоб зв’язатися з вами та надати консультацію.</p>
          <h2 className="serif text-[length:var(--text-h3)]">Як ми їх передаємо</h2>
          <p>Заявка надсилається електронною поштою адвокатській компанії LEX. Сайт не зберігає заявки в базі даних.</p>
          <h2 className="serif text-[length:var(--text-h3)]">Ваші права</h2>
          <p>Ви можете звернутися до нас за телефоном, вказаним на сторінці «Контакти», щоб уточнити або видалити ваші дані.</p>
        </div>
      </section>
    </>
  );
}

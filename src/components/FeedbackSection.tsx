import { ContactForm } from "@/components/ContactForm";
import { company } from "@/content/site";

/** Feedback form as a regular page section (anchor: #zvorotnij-zvyazok). Never opens on its own. */
export function FeedbackSection() {
  const phone = company.phones[0]!;
  return (
    <section id="zvorotnij-zvyazok" className="on-dark scroll-mt-20 bg-graphite text-ivory">
      <div className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
        <div>
          <p className="kicker mb-5">§ Зворотний зв’язок</p>
          <h2 className="serif max-w-[18ch] text-[length:var(--text-h1)]">Безкоштовна консультація</h2>
          <p className="mt-6 max-w-xl text-base text-mist sm:text-lg">
            Залиште ім’я та номер телефону — ми передзвонимо й підкажемо, що робити у вашій ситуації.
          </p>
          <p className="mt-6 text-mist">
            Або зателефонуйте: <a href={`tel:${phone.tel}`} className="font-semibold text-ivory hover:text-brass">{phone.display}</a>
          </p>
        </div>
        <ContactForm fallbackPhone={phone.display} email={company.email} />
      </div>
    </section>
  );
}

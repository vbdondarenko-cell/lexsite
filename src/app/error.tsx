"use client";

import { company } from "@/content/site";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  const phone = company.phones[0]!;
  return (
    <section className="on-dark bg-graphite text-ivory">
      <div className="wrap py-32">
        <p className="kicker mb-6">Помилка</p>
        <h1 className="serif text-[length:var(--text-h1)]">Щось пішло не так</h1>
        <p className="mt-6 max-w-xl text-mist">Спробуйте ще раз або зателефонуйте нам: <a className="underline" href={`tel:${phone.tel}`}>{phone.display}</a>.</p>
        <button type="button" onClick={reset} className="btn btn-solid mt-10">Спробувати ще раз</button>
      </div>
    </section>
  );
}

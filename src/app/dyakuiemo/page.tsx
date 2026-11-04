import Link from "next/link";
import { PageHero } from "@/components/Ui";

export const metadata = { title: "Заявку отримано", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <PageHero kicker="Дякуємо" title="Вашу заявку отримано" lead="Ми зв’яжемося з вами найближчим часом." />
      <section className="wrap py-20"><Link href="/" className="btn btn-line">На головну</Link></section>
    </>
  );
}

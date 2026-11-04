import Link from "next/link";
import { PageHero } from "@/components/Ui";

export const metadata = { title: "Сторінку не знайдено", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHero kicker="404" title="Сторінку не знайдено" lead="Можливо, посилання застаріло. Перейдіть на головну або до переліку послуг." />
      <section className="wrap flex flex-wrap gap-4 py-20">
        <Link href="/" className="btn btn-solid">На головну</Link>
        <Link href="/poslugy/naselennyu" className="btn btn-line">Послуги</Link>
      </section>
    </>
  );
}

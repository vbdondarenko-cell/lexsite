import { notFound } from "next/navigation";
import { detailStaticParams, ServiceDetail } from "@/components/ServicePages";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => detailStaticParams("biznesu");

export async function generateMetadata({ params }: Props) {
  const s = getService("biznesu", (await params).slug);
  if (!s) notFound();
  return pageMeta({ title: s.title, description: `${s.title} — юридичні послуги для бізнесу від LEX, Черкаси. Безкоштовна консультація.`, path: `/poslugy/biznesu/${s.slug}` });
}

export default async function Page({ params }: Props) {
  return <ServiceDetail category="biznesu" slug={(await params).slug} />;
}

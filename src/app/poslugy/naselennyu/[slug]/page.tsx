import { notFound } from "next/navigation";
import { detailStaticParams, ServiceDetail } from "@/components/ServicePages";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => detailStaticParams("naselennyu");

export async function generateMetadata({ params }: Props) {
  const s = getService("naselennyu", (await params).slug);
  if (!s) notFound();
  return pageMeta({ title: s.title, description: `${s.title} — юридична допомога для населення від LEX, Черкаси. Безкоштовна консультація.`, path: `/poslugy/naselennyu/${s.slug}` });
}

export default async function Page({ params }: Props) {
  return <ServiceDetail category="naselennyu" slug={(await params).slug} />;
}

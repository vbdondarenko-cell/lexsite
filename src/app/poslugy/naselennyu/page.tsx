import { ServiceCatalog } from "@/components/ServicePages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Послуги для населення",
  description: "Кримінальні, цивільні, адміністративні, сімейні, трудові справи, спори з банками та МФО, мобілізація та інші юридичні послуги для населення в Черкасах.",
  path: "/poslugy/naselennyu",
});

export default function Page() {
  return <ServiceCatalog category="naselennyu" />;
}

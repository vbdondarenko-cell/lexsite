import { ServiceCatalog } from "@/components/ServicePages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Послуги для бізнесу",
  description: "Абонентський юридичний супровід, спори з державними органами, реєстрація та ліквідація, ліцензії, арбітраж, договори та претензійно-позовна діяльність.",
  path: "/poslugy/biznesu",
});

export default function Page() {
  return <ServiceCatalog category="biznesu" />;
}

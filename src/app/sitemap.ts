import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/pro-nas", "/poslugy/naselennyu", "/poslugy/biznesu", "/spravy", "/vidhuky", "/kontakty", "/polityka-konfidentsiinosti"];
  return [
    ...fixed.map((p) => ({ url: `${siteUrl}${p}` })),
    ...services.map((s) => ({ url: `${siteUrl}/poslugy/${s.category}/${s.slug}` })),
    ...cases.map((c) => ({ url: `${siteUrl}/spravy/${c.slug}` })),
  ];
}

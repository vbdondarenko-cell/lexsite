import type { Metadata } from "next";
import { company } from "@/content/site";

export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const url = `${siteUrl}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { title: opts.title, description: opts.description, url, siteName: "LEX", locale: "uk_UA", type: "website" },
  };
}

/** Schema.org LegalService — only facts present on the legacy site. */
export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: company.name,
    description: company.tagline,
    url: siteUrl,
    telephone: company.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.addressStreet,
      addressLocality: company.addressCity,
      addressCountry: "UA",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
    ],
    sameAs: [company.social.facebook, company.social.instagram],
    areaServed: "UA",
  };
}

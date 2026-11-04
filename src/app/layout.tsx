import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { legalServiceJsonLd, siteUrl } from "@/lib/seo";

const serif = Cormorant_Garamond({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["cyrillic", "latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "LEX — адвокатська компанія, Черкаси", template: "%s | LEX" },
  description: "Правові послуги для населення і бізнесу в Черкасах. Безкоштовна консультація.",
  openGraph: { siteName: "LEX", locale: "uk_UA", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Перейти до змісту</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd()) }} />
      </body>
    </html>
  );
}

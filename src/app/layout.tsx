import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingCall } from "@/components/FloatingCall";
import { FeedbackPopup } from "@/components/FeedbackPopup";
import { company } from "@/content/site";
import { Footer } from "@/components/Footer";
import { legalServiceJsonLd, siteUrl } from "@/lib/seo";

const sans = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Адвокат Черкаси", template: "%s | Адвокат" },
  description: "Правові послуги для населення і бізнесу в Черкасах. Безкоштовна консультація.",
  openGraph: { siteName: "Адвокат", locale: "uk_UA", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Перейти до змісту</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCall />
        <FeedbackPopup phone={company.phones[0]!.display} email={company.email} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd()) }} />
      </body>
    </html>
  );
}

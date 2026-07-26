import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MobileCta } from "@/components/site/MobileCta";
import { site } from "@/content/site";
import { minchoJp } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s ｜ ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

/** 検索エンジンに「誰が運営しているか」を伝える。 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "株式会社ZEN-BU",
      alternateName: "SHINDO",
      url: site.url,
      email: site.email,
      description: site.description,
      areaServed: { "@type": "Place", name: "福島県大沼郡昭和村 小野川" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.tagline,
      inLanguage: "ja",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={minchoJp.variable}>
      {/* 追従CTAバーの高さ分、最後の要素が隠れないよう下に余白を確保する */}
      <body className="pb-[76px] antialiased lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-forest focus:px-4 focus:py-3 focus:text-base"
        >
          本文へスキップ
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}

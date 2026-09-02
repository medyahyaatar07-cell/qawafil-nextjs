import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappFab from "@/components/WhatsappFab";
import PageVeil from "@/components/PageVeil";
import ScrollRevealController from "@/components/ScrollRevealController";
import { ASSOCIATION } from "@/lib/association";
import { getContent } from "@/lib/content";
import { LANGS, isLang, dirFor, type Lang } from "@/lib/i18n";

import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qawafilalkhair.mr";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: T.meta.siteTitle, template: `%s — ${T.meta.siteTitle}` },
    description: T.meta.siteDescription,
    icons: {
      icon: "/images/favicon-32.png",
      apple: "/images/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_MR" : "fr_MR",
      images: ["/images/logo-qawafil.png"],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;
  const dir = dirFor(lang);
  const T = getContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ASSOCIATION.nameAr,
    alternateName: ASSOCIATION.nameFr,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo-qawafil.png`,
    email: ASSOCIATION.email,
    telephone: ASSOCIATION.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: ASSOCIATION.hqAr,
      addressCountry: "MR",
    },
    sameAs: [ASSOCIATION.facebookUrl],
  };

  return (
    <html lang={lang} dir={dir} data-lang={lang} className={`${cairo.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#383844" />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar/`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/ar/`} />
        {/*
          This tag's MIME type (application/ld+json) is not an executable
          script type, so it isn't subject to CSP's script-src at all — same
          reasoning the original pages/middleware.py documented.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {T.nav.skipToContent}
        </a>

        <PageVeil />
        <ScrollRevealController />

        <Header lang={lang} T={T} />

        <main id="main-content">{children}</main>

        <Footer lang={lang} T={T} />

        <WhatsappFab lang={lang} label={T.whatsappFabLabel} />
      </body>
    </html>
  );
}

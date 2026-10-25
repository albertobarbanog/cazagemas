import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getCopy, htmlLang, localePath, ogLocale, otherLocale, type Locale } from "@/config/i18n";

/** Metadata (título, descripción, Open Graph, hreflang) de cada idioma. */
// Imagen para compartir (public/og-image.jpg, la genera `npm run images`).
const shareImage = { url: "/og-image.jpg", width: 1200, height: 630 };

export function buildMetadata(locale: Locale): Metadata {
  const t = getCopy(locale).meta;
  const other = otherLocale(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t.title,
    description: t.description,
    applicationName: siteConfig.name,
    keywords: t.keywords,
    authors: [{ name: siteConfig.artist }],
    alternates: {
      canonical: localePath[locale],
      languages: {
        [htmlLang.es]: localePath.es,
        [htmlLang.en]: localePath.en,
        "x-default": localePath.es,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[other]],
      url: localePath[locale],
      siteName: `${siteConfig.name} Tattoo`,
      title: t.title,
      description: t.description,
      images: [{ ...shareImage, alt: t.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [{ url: shareImage.url, alt: t.ogImageAlt }],
    },
  };
}

import { contact, siteConfig, studio } from "@/config/site";
import { getCopy, localePath, type Locale } from "@/config/i18n";

/** Datos estructurados para Google: negocio local de tipo TattooParlor. */
export function tattooParlorJsonLd(locale: Locale) {
  const t = getCopy(locale);

  return {
    "@context": "https://schema.org",
    "@type": ["TattooParlor", "LocalBusiness"],
    "@id": `${siteConfig.url}/#tattoo-parlor`,
    name: `${siteConfig.name} Tattoo`,
    alternateName: siteConfig.handle,
    description: t.meta.description,
    url: `${siteConfig.url}${localePath[locale] === "/" ? "" : localePath[locale]}`,
    image: [`${siteConfig.url}/og-image.jpg`],
    logo: `${siteConfig.url}/icon.png`,
    telephone: `+${contact.whatsappNumber}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.address.street,
      addressLocality: studio.address.commune,
      addressRegion: "Región Metropolitana de Santiago",
      addressCountry: "CL",
    },
    areaServed: { "@type": "City", name: studio.address.city },
    knowsLanguage: ["es-CL", "en"],
    makesOffer: t.jsonld.offers.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    founder: {
      "@type": "Person",
      name: siteConfig.artist,
      jobTitle: t.jsonld.jobTitle,
      worksFor: { "@type": "Organization", name: studio.name, url: studio.instagram },
    },
    sameAs: [contact.instagram, contact.tiktok, contact.facebook, studio.instagram],
  };
}

import sizes from "./image-sizes.json";
import {
  artworkAlts,
  getCopy,
  logoAlts,
  photoAlts,
  tattooAlts,
  type Locale,
} from "./i18n";

// Datos que no dependen del idioma: contacto, estudio, feed y fotos.
// Los textos traducidos (títulos, párrafos, botones) están en config/i18n.ts.

export const siteConfig = {
  name: "Cazagemas",
  artist: "Javiera",
  handle: "@cazagemas",
  // Cambia esta URL cuando tengas el dominio definitivo.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cazagemas-iota.vercel.app",
} as const;

export const contact = {
  instagram: "https://www.instagram.com/cazagemas",
  tiktok: "https://www.tiktok.com/@cazagemas",
  facebook: "https://www.facebook.com/cazagemas",
  whatsappNumber: "56944930315",
  phoneDisplay: "+56 9 4493 0315",
  email: "cazagemas.tattoo@gmail.com",
} as const;

export const socials = [
  { key: "instagram", href: contact.instagram },
  { key: "tiktok", href: contact.tiktok },
  { key: "facebook", href: contact.facebook },
  { key: "whatsapp", href: `https://wa.me/${contact.whatsappNumber}` },
  { key: "email", href: `mailto:${contact.email}` },
] as const;

export type SocialKey = (typeof socials)[number]["key"];

/** Enlace de WhatsApp con el mensaje precargado en el idioma de la página. */
export const getWhatsappUrl = (locale: Locale) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(getCopy(locale).whatsappMessage)}`;

export const studio = {
  name: "Anónimo Tattoo Studio",
  instagram: "https://www.instagram.com/anonimotattoostudio",
  address: {
    street: "Av. Irarrázaval 50, Oficina C",
    commune: "Ñuñoa",
    city: "Santiago",
    country: "Chile",
  },
  addressLine: "Av. Irarrázaval 50, Oficina C, Ñuñoa, Santiago, Chile",
} as const;

const mapsQuery = encodeURIComponent(`${studio.name}, ${studio.addressLine}`);
export const getMapsEmbedUrl = (locale: Locale) =>
  `https://www.google.com/maps?q=${mapsQuery}&output=embed&hl=${getCopy(locale).mapsLang}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

/**
 * Feed de Instagram con Behold (https://behold.so): es el ID del feed (público, no es un secreto).
 * Si queda vacío ("") o Behold falla, el sitio muestra las fotos locales de `instagramFallback`.
 */
export const beholdFeedId: string = "BzqLu9799uHa4wNJKLaf";

// --- Imágenes -------------------------------------------------------------
// Las fotos se optimizan con `npm run images` (lee /_originals y escribe /public/assets).
// El ancho y alto salen de image-sizes.json, generado por ese mismo script.

export type SiteImage = { src: string; width: number; height: number; alt: string };

const sizeMap = sizes as Record<string, { width: number; height: number }>;

function image(src: string, alt: string): SiteImage {
  const size = sizeMap[src];
  if (!size) throw new Error(`Falta el tamaño de ${src}. Ejecuta "npm run images".`);
  return { src, ...size, alt };
}

const tattoo = (n: number, locale: Locale): SiteImage =>
  image(`/assets/tatuajes/tatuaje-${String(n).padStart(2, "0")}.webp`, tattooAlts[locale][n]);

/** Galería "Tatuajes destacados": cambia el orden o los números para curarla. */
const FEATURED = [
  16, 31, 15, 26, 18, 7, 28, 9, 24, 2,
  3, 19, 4, 30, 13, 23, 6, 32, 22,
  21, 11, 14, 25, 20, 17, 27, 1,
];
/**
 * Se muestran en el feed de Instagram cuando Behold no está configurado o falla.
 * Son los que NO están en FEATURED, para que no se repitan entre secciones.
 */
const INSTAGRAM_FALLBACK = [5, 8, 10, 12, 29];

export const getFeaturedTattoos = (locale: Locale) => FEATURED.map((n) => tattoo(n, locale));
export const getInstagramFallback = (locale: Locale) => INSTAGRAM_FALLBACK.map((n) => tattoo(n, locale));

export const getPhotos = (locale: Locale) => ({
  hero: image("/assets/javiera/hero.webp", photoAlts[locale].hero),
  about: image("/assets/javiera/tatuando.webp", photoAlts[locale].about),
  illustration: image("/assets/javiera/ilustracion.webp", photoAlts[locale].illustration),
});

/** Ilustraciones: el orden coincide con `artworkAlts` en config/i18n.ts. */
const ARTWORKS = [
  "/assets/artworks/ilustracion-01.webp",
  "/assets/artworks/ilustracion-02.webp",
  "/assets/artworks/ilustracion-03.webp",
  "/assets/artworks/ilustracion-04.webp",
  "/assets/artworks/ilustracion-05.webp",
];
export const getArtworks = (locale: Locale) => ARTWORKS.map((src, i) => image(src, artworkAlts[locale][i]));

export const getLogos = (locale: Locale) => ({
  ornament: image("/assets/logos/ornamento.webp", logoAlts[locale].ornament),
  whiteFull: image("/assets/logos/cazagemas-blanco.png", logoAlts[locale].whiteFull),
  studio: image("/assets/logos/anonimo-studio.png", logoAlts[locale].studio),
});

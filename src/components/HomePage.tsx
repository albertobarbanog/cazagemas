import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Featured } from "@/components/sections/Featured";
import { Hero } from "@/components/sections/Hero";
import { Illustrations } from "@/components/sections/Illustrations";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Location } from "@/components/sections/Location";
import { getCopy, localePath, otherLocale, type Locale } from "@/config/i18n";
import { getWhatsappUrl, siteConfig } from "@/config/site";
import { tattooParlorJsonLd } from "@/lib/jsonld";

/** La página completa, en el idioma indicado. La usan `/` (español) y `/en` (inglés). */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const whatsappUrl = getWhatsappUrl(locale);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-lavanda-50 px-5 py-3 text-sm font-medium text-violeta-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skipLink}
      </a>
      <script
        type="application/ld+json"
        // "<" escapado para que el JSON no pueda cerrar la etiqueta <script>.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tattooParlorJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <Navbar nav={t.nav} brand={siteConfig.name} whatsappUrl={whatsappUrl} switchHref={localePath[otherLocale(locale)]} />
      <main id="contenido">
        <Hero locale={locale} />
        <About locale={locale} />
        <Featured locale={locale} />
        <Illustrations locale={locale} />
        <InstagramFeed locale={locale} />
        <Location locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <WhatsAppFab href={whatsappUrl} label={t.fab.label} title={t.fab.title} />
    </>
  );
}

import { cormorant, dmSans } from "@/app/fonts";
import { Providers } from "@/components/ui/Providers";
import { htmlLang, type Locale } from "@/config/i18n";

/** <html> y <body> compartidos. Cada idioma tiene su propio layout raíz con su `lang`. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={htmlLang[locale]} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

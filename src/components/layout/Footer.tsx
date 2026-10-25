import Image from "next/image";
import { getLogos, siteConfig, studio } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Sparkle } from "@/components/ui/Sparkle";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = getCopy(locale);
  const logos = getLogos(locale);

  return (
    <footer className="on-dark grain relative overflow-hidden bg-violeta-900 text-lavanda-50">
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pb-16">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div className="text-center md:text-left">
            <Image
              src={logos.whiteFull.src}
              alt={logos.whiteFull.alt}
              width={logos.whiteFull.width}
              height={logos.whiteFull.height}
              className="mx-auto h-36 w-auto md:mx-0"
            />
          </div>

          <nav aria-label={t.nav.footerAriaLabel} className="text-center">
            <ul className="space-y-3 text-sm">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="py-1 text-lavanda-50/80 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <SocialLinks locale={locale} tone="dark" className="justify-center md:justify-end" />
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.studioAria(studio.name)}
              className="rounded-2xl bg-lavanda-50 p-3 transition-colors hover:bg-white"
            >
              <Image
                src={logos.studio.src}
                alt={logos.studio.alt}
                width={logos.studio.width}
                height={logos.studio.height}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-lavanda-300/25 pt-8 text-center text-xs text-lavanda-50/70">
          <Sparkle className="size-3 text-lavanda-300" />
          <p>
            {t.footer.rights(year, siteConfig.name, siteConfig.artist)}
          </p>
          <p>
            {t.footer.studioLine(studio.name, studio.addressLine)}
          </p>
        </div>
      </div>
    </footer>
  );
}

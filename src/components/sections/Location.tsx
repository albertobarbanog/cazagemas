import Image from "next/image";
import { getLogos, getMapsEmbedUrl, mapsDirectionsUrl, studio } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Location({ locale }: { locale: Locale }) {
  const { address } = studio;
  const t = getCopy(locale).location;
  const logos = getLogos(locale);

  return (
    <section id="ubicacion" className="bg-lavanda-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={<>{t.titleBefore}<em>{t.titleEm}</em></>}
            description={t.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <Reveal className="flex">
            <div className="flex w-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-soft sm:p-10">
              <a
                href={studio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getCopy(locale).footer.studioAria(studio.name)}
                className="max-w-full"
              >
                <Image
                  src={logos.studio.src}
                  alt={logos.studio.alt}
                  width={logos.studio.width}
                  height={logos.studio.height}
                  sizes="16rem"
                  className="h-auto w-64 max-w-full"
                />
              </a>
              <address className="mt-8 not-italic">
                <p className="font-serif text-2xl text-violeta-700">{address.street}</p>
                <p className="mt-1 text-violeta-950/75">
                  {address.commune}, {address.city}, {address.country}
                </p>
              </address>
              <div className="mt-8 flex w-full flex-col gap-3">
                <Button href={mapsDirectionsUrl}>{t.directions}</Button>
                <Button href={studio.instagram} variant="outline">
                  {t.studioInstagram}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-80 overflow-hidden rounded-3xl bg-white shadow-soft lg:min-h-[28rem]">
            <iframe
              title={t.mapTitle(studio.name, studio.addressLine)}
              src={getMapsEmbedUrl(locale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full border-0 lg:h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

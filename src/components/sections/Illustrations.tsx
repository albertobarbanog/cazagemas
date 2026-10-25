import { getArtworks } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Illustrations({ locale }: { locale: Locale }) {
  const t = getCopy(locale);

  return (
    <section id="ilustraciones" className="bg-crema py-24 sm:py-32" aria-labelledby="ilustraciones-titulo">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t.illustrations.eyebrow}
            title={
              <span id="ilustraciones-titulo">
                {t.illustrations.titleBefore}
                <em>{t.illustrations.titleEm}</em>
              </span>
            }
            description={t.illustrations.description}
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl">
          <ImageGallery
            images={getArtworks(locale)}
            labels={t.lightbox}
            columnsClassName="columns-2 gap-3 sm:gap-5 md:columns-5"
            sizes="(min-width: 1024px) 12rem, (min-width: 768px) 20vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

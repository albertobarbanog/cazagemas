import { getFeaturedTattoos, getWhatsappUrl } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageGallery } from "@/components/ui/ImageGallery";

export function Featured({ locale }: { locale: Locale }) {
  const t = getCopy(locale);

  return (
    <section id="tatuajes" className="bg-lavanda-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t.featured.eyebrow}
            title={<>{t.featured.titleBefore}<em>{t.featured.titleEm}</em></>}
            description={t.featured.description}
          />
        </Reveal>

        <div className="mt-14">
          <ImageGallery images={getFeaturedTattoos(locale)} labels={t.lightbox} />
        </div>

        <Reveal className="mt-16 text-center">
          <p className="font-serif text-2xl italic text-violeta-700">{t.featured.ideaTitle}</p>
          <Button href={getWhatsappUrl(locale)} className="mt-6">
            {t.featured.ideaCta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

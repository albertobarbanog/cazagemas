import Image from "next/image";
import { getPhotos } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/ui/Sparkle";

export function About({ locale }: { locale: Locale }) {
  const t = getCopy(locale).about;
  const photos = getPhotos(locale);
  const [lead, ...rest] = t.paragraphs;

  return (
    <section id="sobre-mi" className="relative bg-crema py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={photos.about.src}
              alt={photos.about.alt}
              fill
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 90vw"
              quality={90}
              className="object-cover object-[48%_40%]"
            />
          </div>
          <div className="absolute -bottom-8 -right-3 w-32 overflow-hidden rounded-2xl border-4 border-crema shadow-lift sm:-right-8 sm:w-44">
            <Image
              src={photos.illustration.src}
              alt={photos.illustration.alt}
              width={photos.illustration.width}
              height={photos.illustration.height}
              sizes="(min-width: 640px) 11rem, 8rem"
              quality={90}
              className="h-auto w-full"
            />
          </div>
          <Sparkle className="absolute -left-4 -top-4 size-7 text-lavanda-300" twinkle />
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={t.eyebrow}
              title={<>{t.titleBefore}<em>{t.titleEm}</em></>}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-2xl leading-snug text-violeta-700 sm:text-3xl">{lead}</p>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-violeta-950/80">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label={t.stylesAria}>
              {t.styles.map((style) => (
                <li
                  key={style}
                  className="rounded-full border border-lavanda-300 bg-lavanda-50/60 px-5 py-2 text-sm text-violeta-700"
                >
                  {style}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

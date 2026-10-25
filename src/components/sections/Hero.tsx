import Image from "next/image";
import { getPhotos, getWhatsappUrl, siteConfig, studio } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { FadeUp } from "@/components/ui/FadeUp";
import { Sparkle } from "@/components/ui/Sparkle";

export function Hero({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const photos = getPhotos(locale);

  return (
    <section
      id="inicio"
      className="on-dark grain relative isolate overflow-hidden bg-violeta-900 text-lavanda-50"
    >
      {/* Resplandor violeta y ornamento de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_78%_35%,rgb(120_65_140/0.5),transparent),radial-gradient(40%_40%_at_10%_90%,rgb(72_23_89/0.8),transparent)]"
      />
      <Ornament className="absolute -left-10 top-24 -z-10 h-[34rem] text-lavanda-50/[0.04] lg:left-[38%] lg:top-16 lg:h-[40rem]" />

      <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-24">
        <div className="text-center lg:text-left">
          <FadeUp>
            <p className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-lavanda-200">
              <Sparkle className="size-3" twinkle />
              {siteConfig.handle}
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="mt-6 font-serif text-[clamp(3.75rem,16vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
              {siteConfig.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-lavanda-50/95 lg:mx-0">
              {t.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button href={getWhatsappUrl(locale)} variant="light">
                {t.hero.primaryCta}
              </Button>
              <Button href="#tatuajes" variant="outline-light">
                {t.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 text-sm text-lavanda-50/95">
              {t.hero.workAt(studio.name, studio.address.commune)}
            </p>
          </FadeUp>
        </div>

        {/* La foto (LCP) no se anima: así se pinta en el primer render. */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          {/* Arco desfasado de línea fina */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-3xl border border-lavanda-300/60"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-lift">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
              className="object-cover object-[35%_40%]"
            />
          </div>
          <Sparkle className="absolute -left-4 top-1/4 size-6 text-lavanda-300" twinkle />
          <Sparkle
            className="absolute -right-3 bottom-1/3 size-4 text-lavanda-50"
            twinkle
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>
    </section>
  );
}

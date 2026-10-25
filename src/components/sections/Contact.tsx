import { contact, getWhatsappUrl, siteConfig } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/ui/Sparkle";

export function Contact({ locale }: { locale: Locale }) {
  const t = getCopy(locale).contact;

  return (
    <section
      id="contacto"
      className="on-dark grain relative isolate overflow-hidden bg-violeta-900 py-24 text-lavanda-50 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgb(120_65_140/0.45),transparent)]"
      />
      <Ornament className="absolute left-1/2 top-1/2 -z-10 h-[34rem] -translate-x-1/2 -translate-y-1/2 text-lavanda-50/[0.09] drop-shadow-[0_0_24px_rgb(0_0_0/0.45)]" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow={t.eyebrow}
            title={<>{t.titleBefore}<em>{t.titleEm}</em></>}
            description={t.description}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {t.steps.map((step) => (
              <li key={step.title} className="flex flex-col items-center gap-1">
                <Sparkle className="size-3 text-lavanda-300" />
                <span className="font-medium">{step.title}</span>
                <span className="text-sm text-lavanda-50/95">{step.hint}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            <a
              href={getWhatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-2xl border border-lavanda-300/40 p-5 text-left transition-colors hover:bg-lavanda-50/10"
            >
              <span className="font-serif text-2xl">{t.whatsappLabel}</span>
              <span className="text-sm text-lavanda-50/95">{contact.phoneDisplay}</span>
              <span className="mt-2 text-sm text-lavanda-300">{t.whatsappHint} →</span>
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-2xl border border-lavanda-300/40 p-5 text-left transition-colors hover:bg-lavanda-50/10"
            >
              <span className="font-serif text-2xl">{t.instagramLabel}</span>
              <span className="text-sm text-lavanda-50/95">{siteConfig.handle}</span>
              <span className="mt-2 text-sm text-lavanda-300">{t.instagramHint} →</span>
            </a>
          </div>
          <Button href={getWhatsappUrl(locale)} variant="light" className="mt-10 px-10">
            {t.cta}
          </Button>
          <p className="mt-6 text-sm text-lavanda-50/95">{t.expectations}</p>
        </Reveal>
      </div>
    </section>
  );
}

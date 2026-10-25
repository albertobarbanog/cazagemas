import { contact, getWhatsappUrl } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

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
      <Ornament className="absolute left-1/2 top-1/2 -z-10 h-[34rem] -translate-x-1/2 -translate-y-1/2 text-lavanda-50/[0.035]" />

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
          <Button href={getWhatsappUrl(locale)} variant="light" className="mt-10 px-10">
            {t.cta}
          </Button>
        </Reveal>

        <Reveal delay={0.2}>
          <SocialLinks locale={locale} tone="dark" className="mt-12 justify-center" />
          <p className="mt-8 text-sm text-lavanda-50/80">
            <a href={`tel:+${contact.whatsappNumber}`} className="px-2 py-1 transition-colors hover:text-white">
              {contact.phoneDisplay}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${contact.email}`} className="px-2 py-1 transition-colors hover:text-white">
              {contact.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

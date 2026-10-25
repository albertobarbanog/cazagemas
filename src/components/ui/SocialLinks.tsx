import { MdOutlineMail } from "react-icons/md";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { socials, type SocialKey } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { cn } from "@/lib/cn";

const icons: Record<SocialKey, React.ComponentType<{ className?: string }>> = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  facebook: SiFacebook,
  whatsapp: SiWhatsapp,
  email: MdOutlineMail,
};

type SocialLinksProps = {
  locale: Locale;
  className?: string;
  /** "dark" = íconos claros para fondos oscuros. */
  tone?: "light" | "dark";
};

export function SocialLinks({ locale, className, tone = "light" }: SocialLinksProps) {
  const labels = getCopy(locale).social;
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map(({ key, href }) => {
        const Icon = icons[key];
        const label = labels[key];
        const external = !href.startsWith("mailto:");
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "grid size-12 place-items-center rounded-full border transition-colors duration-300",
                tone === "light"
                  ? "border-lavanda-300 text-violeta-700 hover:border-violeta-700 hover:bg-violeta-700 hover:text-white"
                  : "border-lavanda-300 text-lavanda-50 hover:border-lavanda-50 hover:bg-lavanda-50 hover:text-violeta-950",
              )}
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

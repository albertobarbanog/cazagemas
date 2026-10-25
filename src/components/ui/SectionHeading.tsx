import { cn } from "@/lib/cn";
import { Sparkle } from "./Sparkle";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]",
          dark ? "text-lavanda-200" : "text-violeta-500",
        )}
      >
        <Sparkle className="size-3 text-lavanda-300" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-serif text-4xl font-medium leading-[1.1] sm:text-5xl",
          dark ? "text-lavanda-50" : "text-violeta-700",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed", dark ? "text-lavanda-50/95" : "text-violeta-950/75")}>
          {description}
        </p>
      )}
    </div>
  );
}

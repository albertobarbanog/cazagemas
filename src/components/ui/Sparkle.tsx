import { cn } from "@/lib/cn";

type SparkleProps = {
  className?: string;
  twinkle?: boolean;
  style?: React.CSSProperties;
};

/** Destello de cuatro puntas, el motivo decorativo del sitio. */
export function Sparkle({ className, twinkle = false, style }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 fill-current", twinkle && "animate-twinkle", className)}
      style={style}
    >
      <path d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12Z" />
    </svg>
  );
}

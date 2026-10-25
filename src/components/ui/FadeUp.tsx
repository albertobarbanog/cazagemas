import { cn } from "@/lib/cn";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos. */
  delay?: number;
};

/**
 * Entrada con CSS puro para lo que está en la primera pantalla (hero).
 * A diferencia de <Reveal>, no depende de JavaScript: no retrasa el LCP.
 */
export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <div className={cn("fade-up", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

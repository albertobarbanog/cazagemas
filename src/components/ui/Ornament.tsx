import sizes from "@/config/image-sizes.json";
import { cn } from "@/lib/cn";

/**
 * Ornamento del logo de Cazagemas. Es una imagen blanca usada como máscara,
 * así toma el color del texto (`currentColor`) sobre cualquier fondo.
 */
const SRC = "/assets/logos/ornamento.webp";
const size = (sizes as Record<string, { width: number; height: number }>)[SRC];

export function Ornament({ className }: { className?: string }) {
  const url = `url(${SRC})`;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        aspectRatio: `${size.width} / ${size.height}`,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

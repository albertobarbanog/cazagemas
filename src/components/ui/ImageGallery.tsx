"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteImage } from "@/config/site";
import type { Copy } from "@/config/i18n";
import { cn } from "@/lib/cn";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkle } from "@/components/ui/Sparkle";

type ImageGalleryProps = {
  images: SiteImage[];
  /** Clases de columnas del masonry. */
  columnsClassName?: string;
  /** Atributo `sizes` de las miniaturas, según el ancho que ocupen. */
  sizes?: string;
  labels: Copy["lightbox"];
};

/** Grid masonry con visor ampliado (lightbox). */
export function ImageGallery({
  images,
  columnsClassName = "columns-2 gap-3 sm:gap-5 lg:columns-3",
  sizes = "(min-width: 1152px) 24rem, (min-width: 640px) 33vw, 50vw",
  labels,
}: ImageGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className={columnsClassName}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-5">
            <Reveal delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${labels.enlarge}: ${img.alt}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-lavanda-50 shadow-soft"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={sizes}
                  quality={90}
                  className={cn("h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]")}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center bg-violeta-950/0 opacity-0 transition-[opacity,background-color] duration-500 group-hover:bg-violeta-950/35 group-hover:opacity-100 group-focus-visible:bg-violeta-950/35 group-focus-visible:opacity-100"
                >
                  <Sparkle className="size-8 text-white" />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <Lightbox images={images} index={active} onClose={() => setActive(null)} onIndexChange={setActive} labels={labels} />
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteImage } from "@/config/site";
import type { Copy } from "@/config/i18n";
import { Lightbox } from "@/components/ui/Lightbox";
import { Sparkle } from "@/components/ui/Sparkle";

const tileClass = "group relative block aspect-square w-full overflow-hidden rounded-lg bg-lavanda-50 sm:rounded-2xl";

/** Respaldo del feed de Instagram: imágenes locales en grid cuadrado con visor ampliado. */
export function LocalGrid({ images, labels }: { images: SiteImage[]; labels: Copy["lightbox"] }) {
  const [active, setActive] = useState<number | null>(null);
  // Con pocas imágenes, un grid de 3 columnas más angosto se ve mejor que uno ralo de 4.
  const compact = images.length <= 6;

  return (
    <>
      <ul
        className={
          compact
            ? "mx-auto flex max-w-3xl flex-wrap justify-center gap-1.5 sm:gap-4"
            : "grid grid-cols-3 gap-1.5 sm:gap-4 lg:grid-cols-4"
        }
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={compact ? "w-[calc((100%-0.75rem)/3)] sm:w-[calc((100%-2rem)/3)]" : undefined}
          >
            <button type="button" onClick={() => setActive(i)} aria-label={`${labels.enlarge}: ${img.alt}`} className={tileClass}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1152px) 16rem, (min-width: 640px) 25vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center bg-violeta-950/0 opacity-0 transition-[opacity,background-color] duration-500 group-hover:bg-violeta-950/40 group-hover:opacity-100 group-focus-visible:bg-violeta-950/40 group-focus-visible:opacity-100"
              >
                <Sparkle className="size-7 text-white" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={active} onClose={() => setActive(null)} onIndexChange={setActive} labels={labels} />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { SiteImage } from "@/config/site";
import type { Copy } from "@/config/i18n";

type LightboxProps = {
  images: SiteImage[];
  /** Índice abierto, o null si está cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  labels: Copy["lightbox"];
};

const SWIPE_PX = 50;

/**
 * Visor de imágenes sobre <dialog> modal: el navegador se encarga del foco,
 * de cerrar con Esc y de dejar inerte el resto de la página.
 * Flechas del teclado y deslizar con el dedo para navegar.
 */
export function Lightbox({ images, index, onClose, onIndexChange, labels }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + images.length) % images.length);
  };

  const current = index === null ? null : images[index];
  const prev = index === null ? null : images[(index - 1 + images.length) % images.length];
  const next = index === null ? null : images[(index + 1) % images.length];

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.dialog}
      className="lightbox m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
      }}
    >
      {current && (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            quality={90}
            className="h-auto max-h-[76dvh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
          />
          <p className="max-w-xl text-center text-sm text-lavanda-50/80" aria-live="polite">
            <span className="tabular-nums">
              {(index ?? 0) + 1} / {images.length}
            </span>
          </p>
          {/* Precarga las imágenes vecinas para que la navegación sea instantánea. */}
          {[prev, next].map(
            (img) =>
              img && (
                <link key={img.src} rel="preload" as="image" href={img.src} />
              ),
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-3 top-3 grid size-12 place-items-center rounded-full bg-violeta-950/60 text-2xl leading-none transition-colors hover:bg-violeta-700 sm:right-6 sm:top-6"
      >
        <span aria-hidden="true">×</span>
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.previous}
            className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-violeta-950/60 text-2xl transition-colors hover:bg-violeta-700 sm:left-6"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-violeta-950/60 text-2xl transition-colors hover:bg-violeta-700 sm:right-6"
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}
    </dialog>
  );
}

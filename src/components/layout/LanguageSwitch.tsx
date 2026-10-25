"use client";

import { cn } from "@/lib/cn";

type LanguageSwitchProps = {
  /** Ruta de la versión en el otro idioma. */
  href: string;
  /** Idioma al que se cambia (ej. "EN"). */
  label: string;
  /** Texto accesible, escrito en el idioma de destino. */
  ariaLabel: string;
  /** Código del idioma de destino, para `lang` y `hrefLang`. */
  lang: string;
  className?: string;
};

/** Cambia de idioma conservando la sección en la que estás (el #ancla). */
export function LanguageSwitch({ href, label, ariaLabel, lang, className }: LanguageSwitchProps) {
  return (
    <a
      href={href}
      lang={lang}
      hrefLang={lang}
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={(e) => {
        // Justo antes de navegar, añade el #ancla actual al enlace. Funciona también con
        // Ctrl/Cmd+clic (nueva pestaña), porque no se cancela la navegación del navegador.
        e.currentTarget.href = `${href}${window.location.hash}`;
      }}
      className={cn(
        "grid min-h-11 min-w-11 place-items-center rounded-full border border-current/40 px-3 text-xs font-medium tracking-[0.2em] transition-colors duration-300 hover:border-current",
        className,
      )}
    >
      {label}
    </a>
  );
}

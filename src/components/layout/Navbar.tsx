"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { Copy } from "@/config/i18n";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { Ornament } from "@/components/ui/Ornament";

type NavbarProps = {
  nav: Copy["nav"];
  brand: string;
  whatsappUrl: string;
  /** Ruta de la página en el otro idioma. */
  switchHref: string;
};

export function Navbar({ nav, brand, whatsappUrl, switchHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú abierto: sin scroll de fondo y se cierra con Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        solid
          ? "bg-crema/85 text-violeta-950 shadow-soft backdrop-blur-md"
          : "on-dark bg-transparent text-lavanda-50",
      )}
    >
      <nav aria-label={nav.ariaLabel} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label={nav.homeAria}>
          <Ornament className={cn("h-9 transition-colors", solid ? "text-violeta-700" : "text-lavanda-50")} />
          <span className="font-serif text-2xl font-medium tracking-wide">{brand}</span>
        </a>

        <ul className="hidden items-center gap-5 text-sm lg:flex xl:gap-8">
          {nav.links.slice(1).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative py-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitch
              href={switchHref}
              label={nav.switchLabel}
              ariaLabel={nav.switchAria}
              lang={nav.switchLang}
            />
          </li>
          <li>
            <Button href={whatsappUrl} variant={solid ? "primary" : "light"} className="min-h-10 px-5">
              {nav.book}
            </Button>
          </li>
        </ul>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitch
            href={switchHref}
            label={nav.switchLabel}
            ariaLabel={nav.switchAria}
            lang={nav.switchLang}
            className="min-h-10 min-w-10 px-2.5"
          />

        <button
          type="button"
          className="relative grid size-11 place-items-center"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <m.span
            aria-hidden="true"
            className="absolute h-px w-6 bg-current"
            animate={open ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
          />
          <m.span
            aria-hidden="true"
            className="absolute h-px w-6 bg-current"
            animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
          />
          <m.span
            aria-hidden="true"
            className="absolute h-px w-6 bg-current"
            animate={open ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
          />
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            className="on-dark fixed inset-0 -z-10 flex flex-col justify-center bg-violeta-900 px-8 pb-12 pt-20 text-lavanda-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {nav.links.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-serif text-4xl italic"
                  >
                    {link.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <Button href={whatsappUrl} variant="light" className="mt-10 w-full">
              {nav.bookLong}
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

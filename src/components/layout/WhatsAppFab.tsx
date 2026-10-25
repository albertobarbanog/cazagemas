"use client";

import * as m from "motion/react-m";
import { SiWhatsapp } from "react-icons/si";

/** Botón flotante de WhatsApp, siempre visible. Compacto para no tapar contenido en móvil. */
type WhatsAppFabProps = { href: string; label: string; title: string };

export function WhatsAppFab({ href, label, title }: WhatsAppFabProps) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className="animate-pulse-ring fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-violeta-500 text-white shadow-lift ring-2 ring-white/80 transition-colors duration-300 hover:bg-violeta-700 sm:bottom-6 sm:right-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
    >
      <SiWhatsapp className="size-6" />
    </m.a>
  );
}

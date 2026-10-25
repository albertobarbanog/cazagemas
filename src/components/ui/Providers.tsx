"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/** Hace que todas las animaciones de motion respeten `prefers-reduced-motion`. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // LazyMotion + componentes `m`: carga solo las funciones de animación que usamos.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

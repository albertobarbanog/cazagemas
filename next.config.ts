import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Hay un package-lock.json suelto en el home; fijamos la raíz del proyecto.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = por defecto; 90 para las fotos protagonistas (galerías, ilustraciones, lightbox).
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "behold.pictures" },
    ],
  },
};

export default nextConfig;

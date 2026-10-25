# Cazagemas Tattoo · Sitio web de Javiera

Portafolio one-page de **Javiera (@cazagemas)**, tatuadora en Santiago de Chile (Anónimo Tattoo Studio, Ñuñoa). Su objetivo es que la gente vea su trabajo y la contacte por WhatsApp o Instagram.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · `next/font` · `next/image` · `react-icons`. Listo para Vercel.

## Contenido

- [Correr el proyecto en local](#correr-el-proyecto-en-local)
- [Estructura](#estructura)
- [Cambiar contacto y fotos](#cambiar-contacto-y-fotos)
- [Idiomas (español / inglés)](#idiomas-español--inglés)
- [Feed de Instagram](#feed-de-instagram)
- [Variable de entorno en Vercel](#variable-de-entorno-en-vercel)
- [Desplegar en Vercel](#desplegar-en-vercel)
- [Calidad, accesibilidad y SEO](#calidad-accesibilidad-y-seo)

## Correr el proyecto en local

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev
```

Abre <http://localhost:3000> (si el puerto está ocupado, Next usa el siguiente y lo indica en la terminal).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run images` | Optimiza las fotos de `_originals/` hacia `public/assets/` (ver más abajo) |

## Estructura

```
_originals/            Fotos originales sin optimizar (no se despliegan, ni van a git)
public/assets/         Imágenes optimizadas (WebP/PNG) que usa el sitio
scripts/optimize-images.mjs   Convierte originales → public/assets, e íconos / imagen Open Graph
src/
  app/(es)/            Página en español (/) con su propio layout y `lang="es-CL"`
  app/en/              Página en inglés (/en) con su propio layout y `lang="en"`
  app/                 sitemap, robots, íconos y fuentes
  components/
    layout/            Navbar, Footer, botón flotante de WhatsApp
    sections/          Hero, About, Featured, Illustrations, InstagramFeed, Location, Contact
    ui/                Button, Reveal, FadeUp, Lightbox, SocialLinks, Sparkle, Ornament…
  config/i18n.ts       ⭐ Todos los textos en español e inglés (y los alt de las fotos)
  config/site.ts       ⭐ Contacto, estudio, fotos y feed de Instagram
  lib/behold.ts        Lectura del feed de Instagram (solo servidor) · lib/jsonld.ts: datos estructurados
```

## Idiomas (español / inglés)

El sitio tiene dos versiones: **español en `/`** (la principal) e **inglés en `/en`**. El botón **EN / ES** de la barra de navegación cambia entre ellas y **conserva la sección** en la que estás (por ejemplo, `/#ilustraciones` → `/en#ilustraciones`).

Cada versión tiene su propio `lang`, título, descripción, Open Graph y etiquetas `hreflang`, y ambas están en el `sitemap.xml`, para que Google muestre a cada persona el idioma que le corresponde.

- **Todos los textos** (títulos, botones, párrafos, mensaje de WhatsApp, descripciones de las fotos) están en `src/config/i18n.ts`, en dos bloques: `es` y `en`. Para corregir una traducción, edita el texto ahí.
- La traducción al inglés del texto "Acerca de mí" es una traducción directa del original; conviene que Javiera la revise.
- No hay detección automática de idioma: quien entra a `/` ve español, y cambia con el botón.

## Cambiar contacto y fotos

Los datos que no dependen del idioma se editan en **`src/config/site.ts`**:

- **Contacto y redes:** objeto `contact` (Instagram, TikTok, Facebook, WhatsApp, correo).
- **Estudio y dirección:** objeto `studio`. El mapa y el botón "Cómo llegar" se arman solos a partir de la dirección.
- **Fotos destacadas:** la lista `FEATURED` usa números de foto, por ejemplo `[16, 3, 15, …]`, que corresponden a `public/assets/tatuajes/tatuaje-NN.webp`. Cambia, quita o reordena números para curar la galería. `INSTAGRAM_FALLBACK` hace lo mismo para el respaldo del feed.
- **Ilustraciones:** la lista `ARTWORKS`. Su descripción va en `artworkAlts`, en `src/config/i18n.ts`, en el mismo orden.
- **Textos alternativos (`alt`) de los tatuajes:** `tattooAlts` en `src/config/i18n.ts`, en español y en inglés. Mantenlos al día: ayudan a la accesibilidad y al SEO.

### Agregar fotos nuevas

1. Copia las fotos originales a `_originals/Tatuajes anime /`.
2. **Nómbralas para que queden al final del orden alfabético** (por ejemplo `zz-01.jpg`, `zz-02.jpg`). El script numera por orden de nombre, y si una foto nueva queda en medio, corre la numeración de las demás y los `alt` dejarían de coincidir.
3. Ejecuta `npm run images`. Crea `tatuaje-30.webp`, `tatuaje-31.webp`…
4. Agrega su descripción (en español y en inglés) en `tattooAlts`, en `src/config/i18n.ts`, y su número en `FEATURED` o `INSTAGRAM_FALLBACK`, en `src/config/site.ts`.

El script redimensiona (máx. 1600 px), convierte a WebP y actualiza `src/config/image-sizes.json`. También regenera el favicon, el ícono de iOS y la imagen para compartir (`public/og-image.jpg`).

## Feed de Instagram

El feed se obtiene con **[Behold](https://behold.so)**, un servicio que se conecta a Instagram y entrega las publicaciones como JSON. El sitio las dibuja con su propio diseño (grid cuadrado con overlay al pasar el cursor, cada foto enlaza a su publicación). No usa la API de Meta.

- Muestra solo **fotos y carruseles**, sin reels ni videos, de la **más reciente a la más antigua**.
- Se actualiza solo cada **15 minutos**.
- Si Behold falla, o el ID está vacío, el sitio **no se rompe**: muestra 12 tatuajes locales (`INSTAGRAM_FALLBACK`) y el botón "Ver más en Instagram".

### Configurarlo

1. Crea una cuenta en <https://behold.so> y conecta la cuenta de Instagram (@cazagemas).
2. Crea un feed y copia su ID. Es el texto de `feed-id="…"` en el código que te entrega, o la parte final de `https://feeds.behold.so/ESTE_ID`.
3. Pégalo en `beholdFeedId`, en `src/config/site.ts`. No es un secreto, así que no va en variables de entorno.
4. En el panel de Behold, deja los *reels* desmarcados en los tipos de publicación permitidos. El sitio también los descarta por su cuenta.
5. Vuelve a desplegar.

El plan gratuito de Behold limita el feed a 6 publicaciones (según su documentación; revisa los límites y las condiciones vigentes en su panel, por ejemplo si exige mostrar su marca). Si el feed trae 6 y una es reel, se muestran 5.

## Variable de entorno en Vercel

Solo hay una, y es opcional: en *Project → Settings → Environment Variables* (Production):

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública definitiva, por ejemplo `https://cazagemas.cl`. Se usa en SEO, sitemap y Open Graph. |

Tras cambiarla hay que **volver a desplegar** para que aplique.

## Desplegar en Vercel

1. Sube el proyecto a un repositorio de GitHub (la carpeta `_originals/` queda fuera por el `.gitignore`).
2. En <https://vercel.com/new> importa el repositorio. Vercel detecta Next.js solo; no cambies el comando de build.
3. Agrega `NEXT_PUBLIC_SITE_URL` (ver la sección anterior).
4. Pulsa **Deploy**. La página se regenera cada 15 minutos (ISR): una publicación nueva de Instagram aparece en el sitio en ese plazo.
5. (Opcional) En *Settings → Domains* conecta el dominio propio y actualiza `NEXT_PUBLIC_SITE_URL`.

También puedes desplegar desde la terminal con `npx vercel login` y luego `npx vercel --prod`.

## Calidad, accesibilidad y SEO

- **Lighthouse (build de producción, medido en local):** móvil 91 · 100 · 100 · 100 (Performance · Accesibilidad · Best Practices · SEO); escritorio 100 en las cuatro. El Performance móvil es el más justo: si lo ves bajar de 90, suele ser por imágenes nuevas muy pesadas, así que pásalas por `npm run images`.
- **Accesibilidad:** HTML semántico, enlace "Saltar al contenido", foco visible, menú y lightbox navegables con teclado (Esc, flechas), `alt` en todas las imágenes, contraste WCAG AA verificado y animaciones que respetan `prefers-reduced-motion`.
- **SEO local:** `lang` por idioma (`es-CL` y `en`) con `hreflang`, título y descripción en cada idioma, Open Graph y Twitter con imagen, favicon desde el logo, `sitemap.xml`, `robots.txt` y datos estructurados JSON-LD `TattooParlor` / `LocalBusiness` (dirección, redes y teléfono).
- **Rendimiento:** imágenes en WebP/AVIF con `next/image`, fuentes con `next/font`, animaciones de entrada del hero en CSS puro y Motion con carga parcial (`LazyMotion`).

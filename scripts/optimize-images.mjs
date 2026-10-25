// Optimiza las imágenes originales (_originals/) hacia public/assets/ en WebP.
// Uso: npm run images
// Genera además src/config/image-sizes.json con el ancho/alto de cada imagen.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "_originals");
const OUT = path.join(ROOT, "public", "assets");

const sizes = {};

async function save(pipeline, relOut) {
  const file = path.join(OUT, relOut);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const info = await pipeline.toFile(file);
  sizes[`/assets/${relOut}`] = { width: info.width, height: info.height };
  console.log(`${relOut}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// Calidad alta: next/image vuelve a comprimir al servir, así que partimos de una base limpia.
const webp = (input, maxSide, quality = 90) =>
  sharp(input)
    .rotate()
    .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
    .webp({ quality });

await fs.rm(OUT, { recursive: true, force: true });

// Tatuajes. Esta foto se procesa con el nombre "zzz-E5F26AAA.jpg" (copia) para que quede al final
// del orden y no mueva la numeración de las demás; el original se omite para no duplicarla.
const SKIP_TATTOOS = new Set(["E5F26AAA-75B3-4541-9219-E5313F10F258.jpg"]);
const tattooDir = path.join(SRC, "Tatuajes anime ");
const tattoos = (await fs.readdir(tattooDir))
  .filter((f) => /\.(jpe?g)$/i.test(f) && !SKIP_TATTOOS.has(f))
  .sort();
for (const [i, f] of tattoos.entries()) {
  const n = String(i + 1).padStart(2, "0");
  await save(webp(path.join(tattooDir, f), 1600), `tatuajes/tatuaje-${n}.webp`);
}

// Javiera
const profileDir = path.join(SRC, "Fotos de perfil ");
await save(webp(path.join(profileDir, "B09D22B7-8546-4D4F-9F0A-DD1FCAE3A4A4.jpg"), 1600), "javiera/hero.webp");
await save(webp(path.join(profileDir, "IMG_7662.JPG"), 2000), "javiera/tatuando.webp");
await save(webp(path.join(profileDir, "765881E9-65E7-43AB-92B9-0D1CA687D469.jpg"), 1400), "javiera/ilustracion.webp");

// Ilustraciones
const artDir = path.join(SRC, "Artworks");
await save(webp(path.join(artDir, "ilustracion-digital-chrollo.jpg"), 2200), "artworks/ilustracion-01.webp");
await save(webp(path.join(artDir, "IMG_7323.JPG"), 2200), "artworks/ilustracion-02.webp");
await save(webp(path.join(artDir, "IMG_5137.jpg"), 2200), "artworks/ilustracion-03.webp");
await save(webp(path.join(artDir, "IMG_4579.JPG"), 2200), "artworks/ilustracion-04.webp");
await save(webp(path.join(artDir, "IMG_1878.JPG"), 2200), "artworks/ilustracion-05.webp");

// Logos (todos con fondo transparente)
const logoDir = path.join(SRC, "Logos ");
const whiteLogo = path.join(logoDir, "Logo cazagemas blanco_.png");

// Ornamento solo (sin el texto), en blanco: se tiñe con CSS mask según el fondo.
// Coordenadas medidas sobre el lienzo original de 2480x3508.
const cropped = await sharp(whiteLogo)
  .extract({ left: 600, top: 400, width: 1280, height: 2400 })
  .toBuffer();
// Fuerza el color a blanco puro (el original trae un punto negro suelto) conservando el alfa.
const whiteOnly = await sharp({
  create: { width: 1280, height: 2400, channels: 4, background: "#ffffff" },
})
  .composite([{ input: cropped, blend: "dest-in" }])
  .png()
  .toBuffer();
const ornament = await sharp(whiteOnly).trim().toBuffer();
// WebP con alfa: pesa una fracción del PNG y se usa como máscara CSS.
await save(sharp(ornament).resize({ height: 640 }).webp({ quality: 70, alphaQuality: 70 }), "logos/ornamento.webp");

// Logo completo (ornamento + texto) en blanco, para fondos oscuros.
await save(sharp(whiteLogo).trim().resize({ height: 1000 }).png({ compressionLevel: 9 }), "logos/cazagemas-blanco.png");

// Logo del estudio (negro y rosado, solo sobre fondos claros).
await save(
  sharp(path.join(logoDir, "Logo estudio.png")).resize({ width: 900 }).png({ compressionLevel: 9 }),
  "logos/anonimo-studio.png",
);

// --- Favicon, ícono de iOS (van en src/app por convención de Next) e imagen Open Graph (public/) ---
const APP = path.join(ROOT, "src", "app");
const BG = "#4d1f69";

// Ornamento en el rosado del logo (sin el texto), para los íconos. Mismo recorte que el blanco.
const pinkCrop = await sharp(path.join(logoDir, "Logo cazagemas rosado y blanco.png"))
  .extract({ left: 600, top: 400, width: 1280, height: 2400 })
  .toBuffer();
const pinkOrnament = await sharp(pinkCrop).trim().toBuffer();
const PINK = "#e673c5";

// Destello de cuatro puntas (el mismo de components/ui/Sparkle.tsx): a 16 px el ornamento completo
// se vuelve una mancha, así que ahí se usa esta versión simplificada de la marca.
const sparkleSvg = (size) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">` +
      `<path fill="${PINK}" d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12Z"/></svg>`,
  );

/** Ícono cuadrado: fondo morado + marca centrada. `round` redondea las esquinas (iOS las redondea solo). */
async function iconBuffer(size, { mark = "ornament", fill = 0.9, round = true } = {}) {
  const h = Math.round(size * fill);
  const markBuf =
    mark === "sparkle"
      ? await sharp(sparkleSvg(h * 4)).resize(h, h).png().toBuffer()
      : await sharp(pinkOrnament).resize({ height: h, kernel: "lanczos3" }).png().toBuffer();
  let png = await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: markBuf, gravity: "center" }])
    .png()
    .toBuffer();
  if (round) {
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#fff"/></svg>`,
    );
    png = await sharp(png).composite([{ input: mask, blend: "dest-in" }]).png({ compressionLevel: 9 }).toBuffer();
  }
  return png;
}

async function writeIcon(name, size, options) {
  await fs.writeFile(path.join(APP, name), await iconBuffer(size, options));
  console.log(`app/${name}  ${size}x${size}`);
}
await writeIcon("icon.png", 512, { fill: 0.9 });
// Tamaños de pestaña como PNG aparte: así el navegador elige el de 16 o 32 px en vez de reducir el de 512.
await writeIcon("icon1.png", 16, { mark: "sparkle", fill: 0.82 });
await writeIcon("icon2.png", 32, { fill: 0.92 });
await writeIcon("apple-icon.png", 180, { fill: 0.9, round: false }); // iOS exige cuadrado opaco

// favicon.ico con tres tamaños (PNG incrustados): 16 px con el destello, 32 y 48 px con el ornamento.
const icoFrames = [
  { size: 16, buf: await iconBuffer(16, { mark: "sparkle", fill: 0.82 }) },
  { size: 32, buf: await iconBuffer(32, { fill: 0.92 }) },
  { size: 48, buf: await iconBuffer(48, { fill: 0.92 }) },
];
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // tipo: ícono
header.writeUInt16LE(icoFrames.length, 4);
let offset = 6 + 16 * icoFrames.length;
const entries = icoFrames.map(({ size, buf }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4); // planos
  e.writeUInt16LE(32, 6); // bits por píxel
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
await fs.writeFile(path.join(APP, "favicon.ico"), Buffer.concat([header, ...entries, ...icoFrames.map((f) => f.buf)]));
console.log("app/favicon.ico  16, 32 y 48 px");

const photo = await sharp(path.join(OUT, "javiera", "hero.webp"))
  .resize(630, 630, { fit: "cover", position: "left" })
  .toBuffer();
const wordmark = await sharp(path.join(OUT, "logos", "cazagemas-blanco.png")).resize({ height: 420 }).toBuffer();
const og = sharp({ create: { width: 1200, height: 630, channels: 3, background: BG } })
  .composite([
    { input: photo, left: 0, top: 0 },
    { input: wordmark, left: 630 + Math.round((570 - Math.round(420 * (446 / 1000))) / 2), top: 105 },
  ])
  .jpeg({ quality: 86 });
await og.toFile(path.join(ROOT, "public", "og-image.jpg"));
console.log("public/og-image.jpg  1200x630");

await fs.mkdir(path.join(ROOT, "src", "config"), { recursive: true });
await fs.writeFile(
  path.join(ROOT, "src", "config", "image-sizes.json"),
  JSON.stringify(sizes, null, 2) + "\n",
);

// Textos del sitio en cada idioma. Para cambiar o corregir una traducción, edita este archivo.
// Los datos de contacto, las fotos y el feed de Instagram están en config/site.ts.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Ruta de cada idioma: el español vive en la raíz y el inglés en /en. */
export const localePath: Record<Locale, string> = { es: "/", en: "/en" };
export const htmlLang: Record<Locale, string> = { es: "es-CL", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_CL", en: "en_US" };
export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

const es = {
  meta: {
    ogImageAlt: "Cazagemas Tattoo: retrato de Javiera tatuando junto al logo del estudio",
    title: "Cazagemas | Tatuadora en Ñuñoa, Santiago · Anime y línea fina",
    description:
      "Javiera (@cazagemas), tatuadora en Santiago de Chile. Tatuajes inspirados en anime y manga, línea fina, puntillismo y diseños personalizados en Anónimo Tattoo Studio, Ñuñoa.",
    keywords: [
      "tatuadora Santiago",
      "tatuajes anime",
      "tatuajes manga",
      "tatuajes línea fina",
      "puntillismo",
      "tatuajes Ñuñoa",
      "Cazagemas",
      "Anónimo Tattoo Studio",
    ],
  },
  tagline: "Tatuadora en Santiago · Anime, línea fina y diseños personalizados",
  skipLink: "Saltar al contenido",
  whatsappMessage: "¡Hola Javiera! Vi tu página y me gustaría cotizar un tatuaje 🖤",
  mapsLang: "es",
  nav: {
    ariaLabel: "Principal",
    footerAriaLabel: "Pie de página",
    links: [
      { href: "#inicio", label: "Inicio" },
      { href: "#sobre-mi", label: "Sobre mí" },
      { href: "#tatuajes", label: "Tatuajes" },
      { href: "#ilustraciones", label: "Ilustraciones" },
      { href: "#instagram", label: "Instagram" },
      { href: "#ubicacion", label: "Ubicación" },
      { href: "#contacto", label: "Contacto" },
    ],
    book: "Agendar",
    bookLong: "Agenda tu tatuaje",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    homeAria: "Cazagemas, inicio",
    // Botón de idioma: muestra el idioma al que se cambia.
    switchLabel: "EN",
    switchAria: "Switch to English",
    switchLang: "en",
  },
  hero: {
    primaryCta: "Agenda tu tatuaje",
    secondaryCta: "Ver portafolio",
    workAt: (studio: string, commune: string) => `Atiendo en ${studio} · ${commune}`,
  },
  about: {
    eyebrow: "Acerca de mí",
    titleBefore: "Detrás de ",
    titleEm: "Cazagemas",
    stylesAria: "Estilos",
    styles: ["Anime & Manga", "Línea fina", "Puntillismo", "Diseños personalizados"],
    paragraphs: [
      "¡Hola! Me llamo Javiera y soy tatuadora en Santiago de Chile.",
      "Mi trabajo se inspira principalmente en el anime y el manga, aunque también disfruto desarrollar diseños personalizados y explorar distintos estilos, como la línea fina y el puntillismo.",
      "Estudié Artes Visuales y, aunque mi camino terminó llevándome al mundo del tatuaje, el dibujo y la creación artística siempre han sido una parte importante de mí. Además de tatuar, me gusta experimentar con la ilustración y la pintura, tanto en digital como con técnicas tradicionales, especialmente con acrílicos, marcadores y lápices.",
      "Me encanta poder llevar ideas, personajes e historias a la piel, creando diseños que conecten con los gustos y la personalidad de cada persona. Disfruto mucho el proceso creativo que hay detrás de cada tatuaje, desde la primera idea hasta verla convertida en una pieza sobre la piel.",
      "La idea es que podamos trabajar juntos para crear algo que te guste, te represente y que disfrutes llevar contigo. ¡Gracias por visitar mi espacio y conocer un poco más de mi trabajo!",
    ],
  },
  featured: {
    eyebrow: "Portafolio",
    titleBefore: "Tatuajes ",
    titleEm: "destacados",
    description:
      "Una selección de piezas inspiradas en anime y manga, en línea fina, puntillismo y diseños hechos a medida.",
    ideaTitle: "¿Tienes una idea en mente?",
    ideaCta: "Cuéntamela por WhatsApp",
  },
  illustrations: {
    eyebrow: "Ilustración",
    titleBefore: "Más allá de la ",
    titleEm: "piel",
    description: "Dibujo y pinto con acrílicos, marcadores y lápices, además de ilustración digital.",
  },
  instagram: {
    eyebrow: "@cazagemas",
    titleBefore: "Mi trabajo en ",
    titleEm: "Instagram",
    description: "Lo más reciente de mi cuenta, directo desde Instagram.",
    button: "Ver más en Instagram",
    viewPost: "Ver en Instagram",
    fallbackAlt: "Publicación de Instagram de @cazagemas",
  },
  location: {
    eyebrow: "Ubicación",
    titleBefore: "Dónde ",
    titleEm: "encontrarme",
    description: "Atiendo en Anónimo Tattoo Studio, ubicado en la comuna de Ñuñoa.",
    directions: "Cómo llegar",
    studioInstagram: "Instagram del estudio",
    mapTitle: (studio: string, address: string) => `Mapa de ${studio}, ${address}`,
  },
  contact: {
    eyebrow: "Contacto",
    titleBefore: "Hablemos de tu próxima ",
    titleEm: "pieza",
    description:
      "Escríbeme por WhatsApp o Instagram con tu idea, la zona del cuerpo y el tamaño aproximado, y la conversamos.",
    cta: "Agenda tu tatuaje",
  },
  footer: {
    rights: (year: number, name: string, artist: string) =>
      `© ${year} ${name} · ${artist}. Todos los derechos reservados.`,
    studioLine: (studio: string, address: string) => `Tatuajes en ${studio} · ${address}`,
    studioAria: (studio: string) => `${studio} en Instagram`,
  },
  lightbox: {
    dialog: "Galería de imágenes ampliada",
    close: "Cerrar",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    enlarge: "Ampliar",
  },
  fab: {
    label: "Escríbeme por WhatsApp para cotizar un tatuaje",
    title: "Escríbeme por WhatsApp",
  },
  social: {
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    email: "Correo",
  },
  jsonld: {
    jobTitle: "Tatuadora",
    offers: ["Tatuajes anime y manga", "Tatuajes de línea fina", "Puntillismo", "Diseños personalizados"],
  },
};

export type Copy = typeof es;

const en: Copy = {
  meta: {
    ogImageAlt: "Cazagemas Tattoo: portrait of Javiera tattooing next to the studio logo",
    title: "Cazagemas | Tattoo Artist in Ñuñoa, Santiago · Anime & Fine Line",
    description:
      "Javiera (@cazagemas), tattoo artist in Santiago, Chile. Anime and manga-inspired tattoos, fine line, dotwork and custom designs at Anónimo Tattoo Studio, Ñuñoa.",
    keywords: [
      "tattoo artist Santiago",
      "anime tattoos",
      "manga tattoos",
      "fine line tattoos",
      "dotwork tattoos",
      "tattoos Ñuñoa",
      "Cazagemas",
      "Anónimo Tattoo Studio",
    ],
  },
  tagline: "Tattoo artist in Santiago · Anime, fine line and custom designs",
  skipLink: "Skip to content",
  whatsappMessage: "Hi Javiera! I saw your website and I'd like to get a quote for a tattoo 🖤",
  mapsLang: "en",
  nav: {
    ariaLabel: "Main",
    footerAriaLabel: "Footer",
    links: [
      { href: "#inicio", label: "Home" },
      { href: "#sobre-mi", label: "About" },
      { href: "#tatuajes", label: "Tattoos" },
      { href: "#ilustraciones", label: "Illustrations" },
      { href: "#instagram", label: "Instagram" },
      { href: "#ubicacion", label: "Location" },
      { href: "#contacto", label: "Contact" },
    ],
    book: "Book",
    bookLong: "Book your tattoo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Cazagemas, home",
    switchLabel: "ES",
    switchAria: "Cambiar a español",
    switchLang: "es",
  },
  hero: {
    primaryCta: "Book your tattoo",
    secondaryCta: "View portfolio",
    workAt: (studio: string, commune: string) => `Based at ${studio} · ${commune}`,
  },
  about: {
    eyebrow: "About me",
    titleBefore: "Behind ",
    titleEm: "Cazagemas",
    stylesAria: "Styles",
    styles: ["Anime & Manga", "Fine line", "Dotwork", "Custom designs"],
    paragraphs: [
      "Hi! My name is Javiera and I'm a tattoo artist in Santiago, Chile.",
      "My work is mainly inspired by anime and manga, although I also enjoy developing custom designs and exploring different styles, such as fine line and dotwork.",
      "I studied Visual Arts and, although my path ended up leading me to the world of tattooing, drawing and artistic creation have always been an important part of me. Besides tattooing, I like to experiment with illustration and painting, both digital and with traditional techniques, especially with acrylics, markers and pencils.",
      "I love bringing ideas, characters and stories to the skin, creating designs that connect with each person's tastes and personality. I really enjoy the creative process behind every tattoo, from the first idea to seeing it turned into a piece on the skin.",
      "The idea is that we can work together to create something you like, that represents you and that you enjoy carrying with you. Thank you for visiting my space and getting to know a little more about my work!",
    ],
  },
  featured: {
    eyebrow: "Portfolio",
    titleBefore: "Featured ",
    titleEm: "tattoos",
    description:
      "A selection of pieces inspired by anime and manga, in fine line, dotwork and custom-made designs.",
    ideaTitle: "Have an idea in mind?",
    ideaCta: "Tell me about it on WhatsApp",
  },
  illustrations: {
    eyebrow: "Illustration",
    titleBefore: "Beyond the ",
    titleEm: "skin",
    description: "I draw and paint with acrylics, markers and pencils, as well as digital illustration.",
  },
  instagram: {
    eyebrow: "@cazagemas",
    titleBefore: "My work on ",
    titleEm: "Instagram",
    description: "The latest from my account, straight from Instagram.",
    button: "See more on Instagram",
    viewPost: "View on Instagram",
    fallbackAlt: "Instagram post by @cazagemas",
  },
  location: {
    eyebrow: "Location",
    titleBefore: "Where to ",
    titleEm: "find me",
    description: "I work at Anónimo Tattoo Studio, located in the Ñuñoa district.",
    directions: "Get directions",
    studioInstagram: "Studio's Instagram",
    mapTitle: (studio: string, address: string) => `Map of ${studio}, ${address}`,
  },
  contact: {
    eyebrow: "Contact",
    titleBefore: "Let's talk about your next ",
    titleEm: "piece",
    description:
      "Message me on WhatsApp or Instagram with your idea, the area of the body and the approximate size, and we'll talk it through.",
    cta: "Book your tattoo",
  },
  footer: {
    rights: (year: number, name: string, artist: string) => `© ${year} ${name} · ${artist}. All rights reserved.`,
    studioLine: (studio: string, address: string) => `Tattooing at ${studio} · ${address}`,
    studioAria: (studio: string) => `${studio} on Instagram`,
  },
  lightbox: {
    dialog: "Enlarged image gallery",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    enlarge: "Enlarge",
  },
  fab: {
    label: "Message me on WhatsApp to get a tattoo quote",
    title: "Message me on WhatsApp",
  },
  social: {
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  jsonld: {
    jobTitle: "Tattoo artist",
    offers: ["Anime and manga tattoos", "Fine line tattoos", "Dotwork", "Custom designs"],
  },
};

const dictionaries: Record<Locale, Copy> = { es, en };

export const getCopy = (locale: Locale): Copy => dictionaries[locale];

// --- Textos alternativos (alt) de las imágenes ----------------------------

/** Tatuajes: el número corresponde a public/assets/tatuajes/tatuaje-NN.webp. */
export const tattooAlts: Record<Locale, Record<number, string>> = {
  es: {
    1: "Tatuaje de línea fina de una chica de anime de ojos azules con detalles de color en el antebrazo",
    2: "Tatuaje de línea fina de un personaje de anime de cabello puntiagudo caminando",
    3: "Tatuaje de una chica de anime con kimono rodeada de flores rojas y naranjas",
    4: "Tatuaje anime en negro y gris de un personaje de cabello recogido",
    5: "Tatuaje estilo panel de manga con ojos, retrato de personaje y un destello en línea fina",
    6: "Tatuaje de un círculo de transmutación rojo con dos personajes de anime",
    7: "Tatuaje de manga con ojos intensos sobre el retrato de un personaje de cabello largo",
    8: "Tatuaje con puntillismo de dos personajes de anime dentro de un corazón",
    9: "Tatuaje de una chica de anime con un panel de ojos y flores",
    10: "Tatuaje de un personaje de anime con gafas redondas dentro de un corazón",
    11: "Tatuaje de línea fina de un personaje de cabello claro con un panel de ojos violetas",
    12: "Tatuaje de un personaje de anime de cabello puntiagudo y capa oscura",
    13: "Tatuaje de un joven de anime sonriendo dentro de un corazón",
    14: "Tatuaje de línea fina de un personaje de anime con delantal y arnés",
    15: "Tatuaje de una chica de anime con un panel de ojos violetas y detalle de flor",
    16: "Tatuaje de Gon de Hunter x Hunter con un panel de ojos naranjos, en estilo manga",
    17: "Tatuaje de dos personajes de anime abrazados dentro de un corazón de flores",
    18: "Tatuaje de Hisoka de Hunter x Hunter con panel de ojos y detalles en rojo y azul",
    19: "Tatuaje de Killua de Hunter x Hunter con panel de ojos azules en línea fina",
    20: "Tatuaje de un personaje de anime junto a un lobo con trazos dinámicos",
    21: "Tatuaje de manga en blanco y negro de un personaje de traje con panel de ojos",
    22: "Tatuaje de manga con panel de ojos y un personaje con kimono, con salpicaduras de tinta",
    23: "Tatuaje de un personaje de anime con panel de ojos y detalles violetas",
    24: "Tatuaje de manga con panel de ojos y trazos rojos",
    25: "Tatuaje de un personaje de anime con parche en el ojo y efecto de trazos rotos",
    26: "Tatuaje de dos personajes de anime en un encuadre de manga",
    27: "Tatuaje a color de un personaje de anime de cabello violeta con una margarita",
    28: "Tatuaje de línea fina de una araña junto a un personaje de anime",
    29: "Tatuaje de una chica de anime con flores y detalles de color",
    30: "Tatuaje de un panel de manga en negro de un personaje con una cicatriz en el rostro cerrando el puño, con un pequeño gato negro encima",
    31: "Tatuaje a color de Gon y Killua de Hunter x Hunter, con fuego y rayos, en línea fina",
    32: "Tatuaje de un árbol sin hojas con pequeños espíritus del bosque (kodamas, de La princesa Mononoke) en la pantorrilla",
  },
  en: {
    1: "Fine line tattoo of an anime girl with blue eyes and touches of color on the forearm",
    2: "Fine line tattoo of a spiky-haired anime character walking",
    3: "Tattoo of an anime girl in a kimono surrounded by red and orange flowers",
    4: "Black and grey anime tattoo of a character with tied-up hair",
    5: "Manga panel-style tattoo with eyes, a character portrait and a fine line sparkle",
    6: "Tattoo of a red transmutation circle with two anime characters",
    7: "Manga tattoo with intense eyes above the portrait of a long-haired character",
    8: "Dotwork tattoo of two anime characters inside a heart",
    9: "Tattoo of an anime girl with an eyes panel and flowers",
    10: "Tattoo of an anime character with round glasses inside a heart",
    11: "Fine line tattoo of a light-haired character with a panel of violet eyes",
    12: "Tattoo of a spiky-haired anime character in a dark cloak",
    13: "Tattoo of a smiling young anime character inside a heart",
    14: "Fine line tattoo of an anime character with an apron and harness",
    15: "Tattoo of an anime girl with a panel of violet eyes and a flower detail",
    16: "Tattoo of Gon from Hunter x Hunter with a panel of orange eyes, in manga style",
    17: "Tattoo of two anime characters embracing inside a heart of flowers",
    18: "Tattoo of Hisoka from Hunter x Hunter with an eyes panel and red and blue details",
    19: "Fine line tattoo of Killua from Hunter x Hunter with a panel of blue eyes",
    20: "Tattoo of an anime character next to a wolf with dynamic strokes",
    21: "Black and white manga tattoo of a character in a suit with an eyes panel",
    22: "Manga tattoo with an eyes panel and a character in a kimono, with ink splatters",
    23: "Tattoo of an anime character with an eyes panel and violet details",
    24: "Manga tattoo with an eyes panel and red strokes",
    25: "Tattoo of an anime character with an eye patch and a broken-strokes effect",
    26: "Tattoo of two anime characters in a manga frame",
    27: "Color tattoo of a violet-haired anime character with a daisy",
    28: "Fine line tattoo of a spider next to an anime character",
    29: "Tattoo of an anime girl with flowers and touches of color",
    30: "Black manga panel tattoo of a character with a facial scar clenching a fist, with a small black cat on top",
    31: "Color fine line tattoo of Gon and Killua from Hunter x Hunter, with fire and lightning",
    32: "Tattoo of a leafless tree with small forest spirits (kodama, from Princess Mononoke) on the calf",
  },
};

export const photoAlts: Record<Locale, { hero: string; about: string; illustration: string }> = {
  es: {
    hero: "Javiera, tatuadora de Cazagemas, concentrada tatuando un antebrazo en el estudio",
    about: "Javiera tatuando con guantes negros en Anónimo Tattoo Studio",
    illustration: "Javiera sosteniendo una de sus ilustraciones enmarcadas de personajes de anime",
  },
  en: {
    hero: "Javiera, tattoo artist at Cazagemas, focused on tattooing a forearm in the studio",
    about: "Javiera tattooing with black gloves at Anónimo Tattoo Studio",
    illustration: "Javiera holding one of her framed illustrations of anime characters",
  },
};

/** Ilustraciones, en el mismo orden que `artworks` en config/site.ts. */
export const artworkAlts: Record<Locale, string[]> = {
  es: [
    "Ilustración digital de Chrollo de Hunter x Hunter con una araña, cadenas y un libro, vista en la tableta gráfica",
    "Ilustración enmarcada con varios retratos de personajes de anime a color",
    "Ilustración enmarcada de un personaje de anime con panel de ojos, hecha con marcadores",
    "Ilustración enmarcada de Hisoka y Chrollo de Hunter x Hunter junto a un gato",
    "Javiera sosteniendo su ilustración enmarcada de Jinx de Arcane en el estudio",
  ],
  en: [
    "Digital illustration of Chrollo from Hunter x Hunter with a spider, chains and a book, shown on a drawing tablet",
    "Framed illustration with several color portraits of anime characters",
    "Framed illustration of an anime character with an eyes panel, made with markers",
    "Framed illustration of Hisoka and Chrollo from Hunter x Hunter next to a cat",
    "Javiera holding her framed illustration of Jinx from Arcane in the studio",
  ],
};

export const logoAlts: Record<Locale, { ornament: string; whiteFull: string; studio: string }> = {
  es: {
    ornament: "Ornamento del logo de Cazagemas",
    whiteFull: "Logo de Cazagemas Tattoo",
    studio: "Logo de Anónimo Tattoo Studio",
  },
  en: {
    ornament: "Cazagemas logo ornament",
    whiteFull: "Cazagemas Tattoo logo",
    studio: "Anónimo Tattoo Studio logo",
  },
};

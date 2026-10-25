import "server-only";

// Lee el feed de Instagram a través de Behold (https://behold.so), un servicio que ya
// se conecta a Instagram y entrega las publicaciones como JSON. El ID del feed es público:
// va en config/site.ts y no es un secreto.

export type InstagramPost = {
  id: string;
  src: string;
  permalink: string;
  alt: string;
};

type BeholdPost = {
  id: string;
  caption?: string;
  prunedCaption?: string;
  permalink: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  sizes?: Record<"small" | "medium" | "large" | "full", { mediaUrl: string } | undefined>;
};

// Debe coincidir con `revalidate` de app/page.tsx.
const REVALIDATE_SECONDS = 900;

const toAlt = (caption: string | undefined, fallback: string) => {
  const text = caption?.replace(/\s+/g, " ").trim();
  if (!text) return fallback;
  return text.length > 140 ? `${text.slice(0, 137)}…` : text;
};

// Debe estar autorizado en next.config (images.remotePatterns).
const isAllowedImageHost = (url: string) => {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && hostname === "behold.pictures";
  } catch {
    return false;
  }
};

/**
 * Publicaciones más recientes (solo imágenes y carruseles, sin reels ni videos),
 * ordenadas de nueva a antigua. Devuelve `null` si no hay feed configurado o si falla.
 */
export async function getBeholdPosts(
  feedId: string,
  limit = 12,
  fallbackAlt = "Instagram",
): Promise<InstagramPost[] | null> {
  if (!/^[A-Za-z0-9]+$/.test(feedId)) return null;

  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[behold] El feed respondió ${res.status}`);
      return null;
    }

    const json = (await res.json()) as { posts?: BeholdPost[] };
    const time = (post: BeholdPost) => Date.parse(post.timestamp) || 0;

    return (json.posts ?? [])
      .filter((post) => {
        const src = post.sizes?.large?.mediaUrl ?? post.sizes?.medium?.mediaUrl;
        return (
          (post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM") &&
          !post.permalink.includes("/reel/") &&
          !!src &&
          isAllowedImageHost(src)
        );
      })
      .sort((a, b) => time(b) - time(a))
      .slice(0, limit)
      .map((post) => ({
        id: post.id,
        // Behold entrega recortes cuadrados con URL estable (no caducan como las de Instagram).
        src: (post.sizes?.large?.mediaUrl ?? post.sizes?.medium?.mediaUrl) as string,
        permalink: post.permalink,
        alt: toAlt(post.prunedCaption ?? post.caption, fallbackAlt),
      }));
  } catch (error) {
    console.error("[behold] No se pudo leer el feed:", error instanceof Error ? error.message : "error");
    return null;
  }
}

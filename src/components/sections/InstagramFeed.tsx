import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { beholdFeedId, contact, getInstagramFallback } from "@/config/site";
import { getCopy, type Locale } from "@/config/i18n";
import { getBeholdPosts } from "@/lib/behold";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocalGrid } from "./LocalGrid";

const COUNT = 12;
// Con muy pocas publicaciones el grid se ve vacío: en ese caso usamos el respaldo local.
const MIN_LIVE_POSTS = 3;
// Hasta este número de publicaciones el grid es de 3 columnas y más angosto (se ve mejor que uno ralo).
const COMPACT_MAX = 6;

const tileClass = "group relative block aspect-square overflow-hidden rounded-lg bg-lavanda-50 sm:rounded-2xl";

export async function InstagramFeed({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  // Feed de Behold; si no está configurado o falla, se usa el respaldo local.
  const live = await getBeholdPosts(beholdFeedId, COUNT, t.instagram.fallbackAlt);
  const posts = live && live.length >= MIN_LIVE_POSTS ? live : null;
  const compact = !!posts && posts.length <= COMPACT_MAX;

  return (
    <section id="instagram" className="bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t.instagram.eyebrow}
            title={<>{t.instagram.titleBefore}<em>{t.instagram.titleEm}</em></>}
            description={t.instagram.description}
          />
        </Reveal>

        <div className="mt-14">
          {posts ? (
            <ul
              className={
                compact
                  ? "mx-auto flex max-w-3xl flex-wrap justify-center gap-1.5 sm:gap-4"
                  : "grid grid-cols-3 gap-1.5 sm:gap-4 lg:grid-cols-4"
              }
            >
              {posts.map((post) => (
                <li
                  key={post.id}
                  className={compact ? "w-[calc((100%-0.75rem)/3)] sm:w-[calc((100%-2rem)/3)]" : undefined}
                >
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.instagram.viewPost}: ${post.alt}`}
                    className={tileClass}
                  >
                    <Image
                      src={post.src}
                      alt={post.alt}
                      fill
                      sizes={compact ? "(min-width: 768px) 15rem, 33vw" : "(min-width: 1152px) 16rem, (min-width: 640px) 25vw, 33vw"}
                      quality={90}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 grid place-items-center bg-violeta-950/0 opacity-0 transition-[opacity,background-color] duration-500 group-hover:bg-violeta-950/40 group-hover:opacity-100 group-focus-visible:bg-violeta-950/40 group-focus-visible:opacity-100"
                    >
                      <SiInstagram className="size-7 text-white" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <LocalGrid images={getInstagramFallback(locale)} labels={t.lightbox} />
          )}
        </div>

        <Reveal className="mt-14 text-center">
          <Button href={contact.instagram}>
            <SiInstagram className="size-4" aria-hidden="true" />
            {t.instagram.button}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

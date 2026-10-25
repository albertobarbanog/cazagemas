import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { htmlLang, localePath } from "@/config/i18n";

const url = (path: string) => (path === "/" ? siteConfig.url : `${siteConfig.url}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  // Cada idioma es una entrada y se enlazan entre sí (hreflang).
  const languages = {
    [htmlLang.es]: url(localePath.es),
    [htmlLang.en]: url(localePath.en),
  };
  return [
    { url: url(localePath.es), changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: url(localePath.en), changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
  ];
}

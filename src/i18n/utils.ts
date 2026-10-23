import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLang, type Lang, ui } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  return lang && lang in ui ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: keyof typeof ui.en): string =>
    (ui[lang][key] ?? ui[defaultLang][key] ?? key) as string;
}

export function localizedUrl(lang: Lang, path = "") {
  return getRelativeLocaleUrl(lang, path.replace(/^\/|\/$/g, ""));
}

export function getLocalizedPath(url: URL, lang: Lang) {
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments[0] in ui) segments.shift();
  return localizedUrl(lang, segments.join("/"));
}

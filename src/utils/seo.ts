import type { Metadata } from "next";
import { baseURL } from "@/resources";
import { routing } from "@/i18n/routing";

/** 로케일별 절대 URL. 기본 언어(ko)는 접두어 없이, 영어는 /en 접두어를 붙입니다. */
export function localizedUrl(path: string, locale: string) {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return `${baseURL}${clean || "/"}`;
  return `${baseURL}/${locale}${clean}`;
}

/** canonical, hreflang(ko/en/x-default), og:url 을 현재 로케일 기준으로 덧씌웁니다. */
export function withAlternates(meta: Metadata, path: string, locale: string): Metadata {
  const canonical = localizedUrl(path, locale);
  return {
    ...meta,
    alternates: {
      canonical,
      languages: {
        ko: localizedUrl(path, "ko"),
        en: localizedUrl(path, "en"),
        "x-default": localizedUrl(path, "ko"),
      },
    },
    openGraph: { ...meta.openGraph, url: canonical, locale: locale === "en" ? "en_US" : "ko_KR" },
  };
}

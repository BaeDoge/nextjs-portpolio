import type { Metadata } from "next";
import { baseURL } from "@/resources";
import { routing } from "@/i18n/routing";

/** 목록 페이지의 메타 설명(검색 결과에 표시되는 문구). */
export const PAGE_DESCRIPTIONS = {
  work: {
    ko: "KB국민은행 업무, 연구, 공모전에서 진행한 AI 프로젝트와 담당 역할을 정리했습니다.",
    en: "AI projects from KB Kookmin Bank, research, and competitions, with my role in each.",
  },
  blog: {
    ko: "업무와 학습 중에 정리한 기술 글을 모았습니다.",
    en: "Technical notes from my work and studies.",
  },
  gallery: {
    ko: "업무, 공모전, 연구, 활동 사진을 모았습니다.",
    en: "Photos from work, competitions, research, and activities.",
  },
} as const;

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

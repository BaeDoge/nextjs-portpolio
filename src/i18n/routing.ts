// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  // "as-needed": 기본 언어(ko)는 지금까지처럼 접두어 없이(/about),
  // 영어만 /en/about 처럼 접두어가 붙어요.
  // → 기존에 공유된 링크, OG 이미지, sitemap의 /about 같은 URL이 전부 그대로 유지돼요.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

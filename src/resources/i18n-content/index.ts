// src/resources/content/index.ts
//
// 편의 re-export. 나중에 실제로 [locale] 라우팅을 붙일 때,
// 각 page.tsx에서 `getHomeText(locale)` 처럼 꺼내 쓰면 됩니다.
// 지금 당장은 배선(wiring)하지 않았고, 포맷만 준비된 상태입니다.

import { Locale } from "./types";
import { homeText } from "./home";
import { aboutText } from "./about";
import { workText } from "./work";
import { blogText } from "./blog";
import { galleryText } from "./gallery";

export function getHomeText(locale: Locale) {
  return homeText[locale];
}
export function getAboutText(locale: Locale) {
  return aboutText[locale];
}
export function getWorkText(locale: Locale) {
  return workText[locale];
}
export function getBlogText(locale: Locale) {
  return blogText[locale];
}
export function getGalleryText(locale: Locale) {
  return galleryText[locale];
}

export * from "./types";

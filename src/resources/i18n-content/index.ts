// 페이지별 텍스트를 로케일로 꺼내 쓰는 헬퍼 모음.

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

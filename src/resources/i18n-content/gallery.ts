// src/resources/content/gallery.ts
//
// Gallery 페이지의 타이틀/설명 포맷. 이미지 목록(alt 텍스트 등)은
// content.tsx의 gallery.images 배열에 그대로 남아있고, 개수가 많아
// 이 포맷 대상에서는 제외했습니다 — 필요해지면 이미지별로
// { ko: alt, en: alt } 형태로 확장하면 됩니다.
//
// 원본: src/resources/content.tsx 의 `gallery` 객체

import { Dictionary } from "./types";

export interface GalleryText {
  title: string;
  description: string;
}

export const galleryText: Dictionary<GalleryText> = {
  ko: {
    title: "갤러리 – 배승호",
    description: "배승호의 활동을 담은 사진 모음",
  },
  en: {
    title: "Photo gallery – Seung Ho Bae",
    description: "A photo collection by Seung Ho Bae",
  },
};

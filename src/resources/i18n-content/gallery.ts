// Gallery 페이지의 제목·설명(ko/en). 이미지 목록은 content.tsx 의 gallery.images 에 있습니다.

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

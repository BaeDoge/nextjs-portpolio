// src/resources/content/blog.ts
//
// Blog 목록 페이지의 타이틀/설명 포맷. 개별 포스트(src/app/blog/posts/*.mdx)는
// 별도로 .ko.mdx / .en.mdx로 나누는 걸 권장합니다 (아래 README 참고).
//
// 원본: src/resources/content.tsx 의 `blog` 객체

import { Dictionary } from "./types";

export interface BlogText {
  title: string;
  description: string;
}

export const blogText: Dictionary<BlogText> = {
  ko: {
    title: "블로그 – 배승호",
    description: "배승호의 최근 작업과 배운 것들을 기록합니다",
  },
  en: {
    title: "Blogs – Seung Ho Bae",
    description: "Read what Seung Ho Bae has been up to recently",
  },
};

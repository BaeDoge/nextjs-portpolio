// src/resources/content/work.ts
//
// Work(프로젝트) 페이지 포맷. 목록 페이지 자체의 타이틀/설명만 담고,
// 프로젝트 개별 내용(src/app/work/projects/*.mdx)은 이 포맷 대상이 아닙니다.
// MDX 프로젝트 글은 나중에 번역하려면 각 .mdx 파일을 .ko.mdx / .en.mdx로
// 나누는 방식을 권장합니다 (블로그 포스트와 동일한 패턴).
//
// 원본: src/resources/content.tsx 의 `work` 객체

import { Dictionary } from "./types";

export interface WorkText {
  title: string;
  description: string;
}

export const workText: Dictionary<WorkText> = {
  ko: {
    title: "프로젝트 – 배승호",
    description: "배승호의 개발 및 디자인 프로젝트 모음",
  },
  en: {
    title: "Projects – Seung Ho Bae",
    description: "Design and dev projects by Seung Ho Bae",
  },
};

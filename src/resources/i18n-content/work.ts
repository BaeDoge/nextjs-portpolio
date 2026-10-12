// Work 목록 페이지의 제목·설명(ko/en). 프로젝트 본문은 work/projects/*.mdx 와 work/projects/en/*.mdx 에 있습니다.

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

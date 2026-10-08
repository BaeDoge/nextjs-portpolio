// src/resources/content/home.ts
//
// 예시로 완성까지 채워둔 페이지입니다. 이 파일의 구조를 그대로 복사해서
// about.ts / work.ts / blog.ts / gallery.ts 를 채워나가면 됩니다.
//
// 원본: src/resources/content.tsx 의 `home` 객체
// headline / featured.title 처럼 JSX(<br/>, <strong> 등)가 섞여 있던 필드는
// 번역하기 쉽도록 순수 문자열/배열로 풀어놨습니다.
// (줄바꿈이 필요한 곳은 string[] 로 표현 → 나중에 렌더링할 때 join('<br/>') 하면 됨)

import { Dictionary } from "./types";

export interface HomeText {
  title: string;
  description: string;
  /** 여러 줄이면 배열 원소 하나가 한 줄 */
  headline: string[];
  featured: {
    role: string;
    company: string;
  };
  subline: string;
}

export const homeText: Dictionary<HomeText> = {
  ko: {
    title: "배승호's Portfolio",
    description: "AI Platform Engineer로서의 작업을 소개하는 포트폴리오 웹사이트",
    headline: ["Challenge-Oriented Developer,", "배승호 입니다."],
    featured: {
      role: "AI & Cloud Backend Engineer",
      company: "KB Kookmin Bank",
    },
    subline: "",
  },
  en: {
    title: "Seung Ho Bae's Portfolio",
    description: "Portfolio website showcasing my work as an AI Platform Engineer",
    headline: ["Challenge-Oriented Developer,", "This is Seung Ho Bae."],
    featured: {
      role: "AI & Cloud Backend Engineer",
      company: "KB Kookmin Bank",
    },
    subline: "",
  },
};

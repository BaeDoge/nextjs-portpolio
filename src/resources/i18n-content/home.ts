// 홈 화면 텍스트(ko/en). src/app/[locale]/page.tsx 에서 사용합니다.
// 줄바꿈이 필요한 필드는 string[] 로 두고, 렌더링할 때 <br/> 로 이어 붙입니다.

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

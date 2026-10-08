// src/resources/content/about.ts
//
// About 페이지 포맷. 섹션 제목처럼 짧은 항목은 미리 채워뒀고,
// 원문 content.tsx에서 JSX/HTML이 섞여 길게 작성된 항목
// (intro 본문, 경력별 achievements, 수상 목록, 논문 목록)은
// TODO로 남겨뒀습니다. content.tsx를 보면서 하나씩 옮기면 됩니다.
//
// 원본: src/resources/content.tsx 의 `about` 객체

import { Dictionary } from "./types";

export interface AboutText {
  title: string;
  description: string;
  sections: {
    intro: string; // TODO: content.tsx의 intro.description 본문 옮기기 (줄바꿈은 \n\n)
    workExperience: string; // 섹션 제목 — "Work Experience"
    education: string; // 섹션 제목 — "Education"
    technicalSkills: string; // 섹션 제목 — "Technical Skills"
    awards: string; // 섹션 제목 — "Awards"
    study: string; // 섹션 제목 — "Study" (논문)
  };
  // TODO: content.tsx의 work.experiences[].achievements 배열을
  // 항목별로 { ko: "...", en: "..." } 형태로 옮기기 (지금은 예시 1개만)
  workAchievementsExample: string;
  // TODO: content.tsx의 studies.projects[].title 배열 옮기기
  studyTitlesExample: string;
}

export const aboutText: Dictionary<AboutText> = {
  ko: {
    title: "About – 배승호",
    description: "AI Platform Engineer, 배승호를 소개합니다",
    sections: {
      intro: "TODO: content.tsx intro.description 본문 옮기기",
      workExperience: "경력",
      education: "학력",
      technicalSkills: "기술 스택",
      awards: "수상",
      study: "논문",
    },
    workAchievementsExample: "TODO",
    studyTitlesExample: "TODO",
  },
  en: {
    title: `About – Seung Ho Bae`,
    description: "Meet Seung Ho Bae, AI Platform Engineer",
    sections: {
      intro: "TODO: translate intro.description from content.tsx",
      workExperience: "Work Experience",
      education: "Education",
      technicalSkills: "Technical Skills",
      awards: "Awards",
      study: "Study",
    },
    workAchievementsExample: "TODO",
    studyTitlesExample: "TODO",
  },
};

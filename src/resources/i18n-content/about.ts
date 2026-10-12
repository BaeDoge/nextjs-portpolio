// About 페이지 텍스트(ko/en). 현재 About 페이지는 content.tsx / content.en.tsx 를 사용하며,
// 이 파일은 연결되지 않았습니다.

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

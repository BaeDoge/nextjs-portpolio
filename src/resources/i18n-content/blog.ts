// Blog 목록 페이지의 제목·설명(ko/en). 글 본문은 blog/posts/*.mdx 와 blog/posts/en/*.mdx 에 있습니다.

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

// GitHub API 호출이 막혔을 때(비인증 호출은 IP당 시간당 60회 제한) 대신 보여주는 공개 저장소 목록.
// 저장소가 늘어나면 가끔 갱신하세요. API가 정상이면 사용되지 않습니다.
import type { Repo } from "@/utils/github";

export const GITHUB_FALLBACK: Repo[] = [
  { name: "python-share-calender", html_url: "https://github.com/BaeDoge/python-share-calender", description: "share calender for air-gapped company", language: "Python", fork: false, archived: false, pushed_at: "2026-11-06T00:00:00Z" },
  { name: "nextjs-tech-blog", html_url: "https://github.com/BaeDoge/nextjs-tech-blog", description: null, language: "MDX", fork: false, archived: false, pushed_at: "2026-11-06T00:00:00Z" },
  { name: "python-issue-crawler", html_url: "https://github.com/BaeDoge/python-issue-crawler", description: "python issue crawler", language: "Python", fork: false, archived: false, pushed_at: "2026-11-06T00:00:00Z" },
  { name: "nextjs-portpolio", html_url: "https://github.com/BaeDoge/nextjs-portpolio", description: null, language: "MDX", fork: false, archived: false, pushed_at: "2026-11-06T00:00:00Z" },
  { name: "java8-develop-env", html_url: "https://github.com/BaeDoge/java8-develop-env", description: "develop env for java8", language: "Batchfile", fork: false, archived: false, pushed_at: "2026-11-03T00:00:00Z" },
  { name: "python-buyma-management", html_url: "https://github.com/BaeDoge/python-buyma-management", description: null, language: "Python", fork: false, archived: false, pushed_at: "2026-11-02T00:00:00Z" },
  { name: "python-ai-news-crawler", html_url: "https://github.com/BaeDoge/python-ai-news-crawler", description: null, language: "Python", fork: false, archived: false, pushed_at: "2026-10-25T00:00:00Z" },
  { name: "python-youtube-audio-library-crawler", html_url: "https://github.com/BaeDoge/python-youtube-audio-library-crawler", description: "youtube free audio library musics crawler", language: "Python", fork: false, archived: false, pushed_at: "2026-10-18T00:00:00Z" },
  { name: "python-knowledge-store", html_url: "https://github.com/BaeDoge/python-knowledge-store", description: "python-knowledge-store", language: "Python", fork: false, archived: false, pushed_at: "2026-09-16T00:00:00Z" },
  { name: "OmniRoute", html_url: "https://github.com/BaeDoge/OmniRoute", description: null, language: "TypeScript", fork: true, archived: false, pushed_at: "2026-09-01T00:00:00Z" },
];

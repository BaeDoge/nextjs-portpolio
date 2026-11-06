// GitHub 공개 저장소 목록 (서버 전용). 숨김(private) 저장소는 API가 돌려주지 않습니다.
// 비인증 호출은 IP당 시간당 60회라 Vercel에서는 자주 막힙니다. Vercel 환경변수에 GITHUB_TOKEN
// (권한 없는 읽기 전용 토큰이면 충분)을 넣으면 한도가 크게 늘고, 막혔을 때는 github-fallback.ts 목록을 씁니다.
import { GITHUB_FALLBACK } from "@/resources/github-fallback";

export const GITHUB_USERNAME = "BaeDoge";

export interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  MDX: "#fcb32c",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Batchfile: "#C1F12E",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  "C++": "#f34b7d",
};

export async function getRepos(): Promise<{ repos: Repo[]; live: boolean }> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const all: Repo[] = [];
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?visibility=public&per_page=100&page=${page}&sort=pushed`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      // 인증 토큰이 private 저장소에 접근할 수 있더라도 공개 저장소만 표시합니다.
      const batch: Array<Repo & { private?: boolean }> = await res.json();
      const publicBatch = batch.filter((repo) => repo.private === false);
      all.push(...publicBatch);
      if (batch.length < 100) break;
    }
    const repos = all
      .map(({ name, html_url, description, language, fork, archived, pushed_at }) => ({
        name, html_url, description, language, fork, archived, pushed_at,
      }))
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
    if (repos.length === 0) throw new Error("empty");
    return { repos, live: true };
  } catch (error) {
    console.warn("[github] API 호출 실패, 대체 목록 사용:", String(error));
    return { repos: GITHUB_FALLBACK, live: false };
  }
}

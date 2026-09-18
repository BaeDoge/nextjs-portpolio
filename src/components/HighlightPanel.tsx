// src/components/HighlightPanel.tsx
//
// 메인 페이지 히어로 영역 (이전 MiniTerminal 자리).
//
// 설계 의도:
//   - 아래 ImpactStats(4년+/5편/10회+)와 숫자가 겹치지 않게, 여기서는 "무엇을 만들었나"만 보여줌
//   - 커밋 수/스트릭 같은 활동량 지표는 의도적으로 제외 (활동량이 적을 때 역효과)
//   - 대신 실제 저장소를 GitHub 공개 API로 가져와 최근 작업물을 보여줌
//
// GitHub API는 토큰 없이 시간당 60회 제한이 있어서, 1시간 캐시(revalidate)를 걸어둠.

import { getLocale } from "next-intl/server";

const GITHUB_USERNAME = "BaeDoge";

// 히어로에 띄우고 싶은 저장소를 직접 지정 (비워두면 최근 업데이트순 자동)
// 예: const PINNED = ["portpolio", "tech-blog-pipeline"];
const PINNED: string[] = [];

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
}

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 }, // 1시간 캐시
      },
    );
    if (!res.ok) return [];
    const all: Repo[] = await res.json();
    const own = all.filter((r) => !r.fork);

    if (PINNED.length > 0) {
      const picked = PINNED.map((n) => own.find((r) => r.name === n)).filter(
        (r): r is Repo => Boolean(r),
      );
      if (picked.length > 0) return picked.slice(0, 4);
    }
    return own.slice(0, 4);
  } catch {
    return [];
  }
}

export default async function HighlightPanel() {
  const repos = await getRepos();
  const isEn = (await getLocale()) === "en";

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "1.25rem",
        border: "0.5px solid var(--neutral-alpha-medium)",
        borderRadius: 16,
        background: "var(--background-overlay)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.6,
          color: "var(--neutral-on-background-weak)",
        }}
      >
        WHAT I&apos;M BUILDING
      </div>

      {/* 현재 집중하고 있는 것 — 직접 수정해서 쓰는 영역 */}
      <div
        style={{
          padding: "12px 14px",
          borderRadius: 12,
          background: "var(--background-secondary)",
        }}
      >
        <div style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", marginBottom: 4 }}>
          {isEn ? "Currently working on" : "지금 하는 일"}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--neutral-on-background-strong)" }}>
          {/* TODO: 담백하게 직접 수정하세요 (1~2문장) */}
          {isEn
            ? "Building an in-house generative AI financial assistant and its RAG pipeline."
            : "사내 생성형 AI 금융 어시스턴트와 RAG 파이프라인을 만들고 있습니다."}
        </div>
      </div>

      {/* 실제 저장소 목록 */}
      {repos.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 10,
                border: "0.5px solid var(--neutral-alpha-medium)",
                display: "block",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--neutral-on-background-strong)" }}>
                  {repo.name}
                </span>
                {repo.language && (
                  <span style={{ fontSize: 10, color: "var(--neutral-on-background-weak)", flexShrink: 0 }}>
                    {repo.language}
                  </span>
                )}
              </div>
              {repo.description && (
                <div
                  style={{
                    fontSize: 11,
                    lineHeight: 1.5,
                    marginTop: 3,
                    color: "var(--neutral-on-background-weak)",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {repo.description}
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, color: "var(--neutral-on-background-weak)", textDecoration: "none" }}
        >
          github.com/{GITHUB_USERNAME} →
        </a>
      </div>
    </div>
  );
}

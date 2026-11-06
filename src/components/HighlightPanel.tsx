// src/components/HighlightPanel.tsx
//
// 메인 히어로 오른쪽 패널: "지금 하는 일" + 공개 저장소 전체 + 언어 분포 + 지식 지도(챗봇 시각화).
//
// 설계 의도:
//   - ImpactStats(4년+/5편/10회+)와 숫자가 겹치지 않게, 여기서는 "무엇을 만들었나"만 보여줌
//   - 커밋 수/스트릭 같은 활동량 지표는 의도적으로 제외 (활동량이 적을 때 역효과)
//   - 저장소는 GitHub 공개 API(숨김 저장소 제외)에서 가져오고, 막히면 대체 목록을 씀 (utils/github.ts)

import { getLocale } from "next-intl/server";
import KnowledgeMap from "@/components/KnowledgeMap";
import { GITHUB_USERNAME, LANGUAGE_COLORS, getRepos } from "@/utils/github";

function formatMonth(iso: string, isEn: boolean) {
  const d = new Date(iso);
  return isEn
    ? d.toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "Asia/Seoul" })
    : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default async function HighlightPanel() {
  const { repos } = await getRepos();
  const isEn = (await getLocale()) === "en";

  // 언어 분포 (저장소 수 기준)
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const langs = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const langTotal = langs.reduce((s, [, n]) => s + n, 0);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "1.25rem",
        border: "0.5px solid var(--neutral-alpha-medium)",
        borderRadius: 16,
        background: "var(--background-overlay)",
        overflowY: "auto",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, color: "var(--neutral-on-background-weak)" }}>
        WHAT I&apos;M BUILDING
      </div>

      {/* 현재 집중하고 있는 것 — 직접 수정해서 쓰는 영역 */}
      <div style={{ padding: "12px 14px", borderRadius: 12, background: "var(--background-secondary)" }}>
        <div style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", marginBottom: 4 }}>
          {isEn ? "Currently working on" : "지금 하는 일"}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--neutral-on-background-strong)" }}>
          {isEn
            ? "I develop chatbot systems for internal customers and employees, as well as a KB video consultation system."
            : "사내 고객용/직원용 챗봇 시스템과 KB 화상상담시스템을 개발하고 있습니다."}
        </div>
      </div>

      {/* 공개 저장소 전체 (스크롤) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minHeight: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--neutral-on-background-weak)" }}>
          <span>{isEn ? "Public repositories" : "공개 저장소"}</span>
          <span>{repos.length}</span>
        </div>
        <div className="hero-repo-list" style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 230, overflowY: "auto", paddingRight: 2 }}>
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-repo"
              style={{
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: 10,
                border: "0.5px solid var(--neutral-alpha-medium)",
                display: "block",
                opacity: repo.archived ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--neutral-on-background-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {repo.name}
                  {repo.fork && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 500, color: "var(--neutral-on-background-weak)" }}>fork</span>}
                </span>
                {repo.language && (
                  <span style={{ fontSize: 10, color: "var(--neutral-on-background-weak)", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <i style={{ width: 7, height: 7, borderRadius: "50%", background: LANGUAGE_COLORS[repo.language] ?? "#8b949e", display: "inline-block" }} />
                    {repo.language}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {repo.description ?? ""}
                </span>
                <span style={{ fontSize: 10, color: "var(--neutral-on-background-weak)", flexShrink: 0 }}>
                  {formatMonth(repo.pushed_at, isEn)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 언어 분포 */}
      {langTotal > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            role="img"
            aria-label={langs.map(([l, n]) => `${l} ${n}`).join(", ")}
            style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", gap: 2 }}
          >
            {langs.map(([lang, n]) => (
              <span key={lang} style={{ flex: n, background: LANGUAGE_COLORS[lang] ?? "#8b949e" }} />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 10px", fontSize: 10, color: "var(--neutral-on-background-weak)" }}>
            {langs.slice(0, 4).map(([lang, n]) => (
              <span key={lang} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <i style={{ width: 7, height: 7, borderRadius: "50%", background: LANGUAGE_COLORS[lang] ?? "#8b949e", display: "inline-block" }} />
                {lang} {Math.round((n / langTotal) * 100)}%
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 챗봇이 검색하는 지식을 점으로 보여주는 지도 + 질문 입력 */}
      <KnowledgeMap />

      <div style={{ marginTop: "auto", paddingTop: 4 }}>
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

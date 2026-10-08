"use client";

// src/components/blog/BlogTagFilter.tsx
// 34개로 늘어난 블로그 글을 태그로 걸러볼 수 있게 하는 클라이언트 필터.
// 카드 렌더링은 기존 Post 컴포넌트를 그대로 재사용합니다.
import { useMemo, useState } from "react";
import { Grid } from "@once-ui-system/core";
import { useLocale } from "next-intl";
import Post from "./Post";

// 태그가 화면에 표시되는 고정 순서 (기존 About 기술 스택 분류와 톤을 맞춤)
const TAG_ORDER = [
  "GenAI",
  "AI/ML",
  "Cloud & Infra",
  "Troubleshooting",
  "Automation",
  "Open Source",
  "Tooling",
  "Career",
  "Portfolio",
];

interface PostLite {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    tag?: string;
    image?: string;
    team?: { avatar: string }[];
  };
}

export function BlogTagFilter({ posts }: { posts: PostLite[] }) {
  const isEn = useLocale() === "en";
  const [active, setActive] = useState<string | null>(null);

  const tags = useMemo(() => {
    const present = new Set(posts.map((p) => p.metadata.tag).filter(Boolean) as string[]);
    return TAG_ORDER.filter((t) => present.has(t));
  }, [posts]);

  const filtered = active ? posts.filter((p) => p.metadata.tag === active) : posts;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 24,
          paddingLeft: 24,
        }}
      >
        <TagPill
          label={isEn ? "All" : "전체"}
          active={active === null}
          onClick={() => setActive(null)}
        />
        {tags.map((tag) => (
          <TagPill key={tag} label={tag} active={active === tag} onClick={() => setActive(tag)} />
        ))}
      </div>

      {filtered.length > 0 ? (
        <Grid columns="2" s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {filtered.map((post) => (
            <Post key={post.slug} post={post} thumbnail direction="column" />
          ))}
        </Grid>
      ) : (
        <p
          style={{
            paddingLeft: 24,
            fontSize: 13,
            color: "var(--neutral-on-background-weak)",
          }}
        >
          {isEn ? "No posts with this tag yet." : "아직 이 태그의 글이 없어요."}
        </p>
      )}
    </>
  );
}

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        border: active
          ? "1px solid var(--brand-alpha-medium)"
          : "0.5px solid var(--neutral-alpha-medium)",
        background: active ? "var(--brand-alpha-weak)" : "transparent",
        color: active
          ? "var(--brand-on-background-medium)"
          : "var(--neutral-on-background-weak)",
      }}
    >
      {label}
    </button>
  );
}

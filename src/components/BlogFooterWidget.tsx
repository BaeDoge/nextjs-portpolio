// src/components/BlogFooterWidget.tsx
"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function BlogFooterWidget() {
  const isEn = useLocale() === "en";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;

    // Supabase에 구독자 저장
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  };

  return (
    <div style={{
      borderTop: "0.5px solid var(--neutral-alpha-medium)",
      paddingTop: "2rem",
      marginTop: "1rem",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
      }}>
        {/* 뉴스레터 구독 */}
        <div style={{
          padding: "1.25rem",
          border: "0.5px solid var(--neutral-alpha-medium)",
          borderRadius: 12,
          background: "var(--background-overlay)",
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6,
            color: "var(--neutral-on-background-strong)" }}>
            {isEn ? "\u2709\uFE0F Get notified of new posts" : "✉️ 새 글 알림 받기"}
          </div>
          <div style={{ fontSize: 12, color: "var(--neutral-on-background-weak)",
            marginBottom: 12, lineHeight: 1.6 }}>
            {isEn ? "I'll email you when a new tech post goes up." : "새 기술 글이 올라오면 이메일로 알려드릴게요."}
          </div>
          {submitted ? (
            <div style={{ fontSize: 13, color: "#1D9E75" }}>
              {isEn ? "\u2713 You're subscribed. Thank you!" : "✓ 등록됐습니다! 감사해요 :)"}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: "7px 10px", borderRadius: 8,
                  border: "0.5px solid var(--neutral-alpha-medium)",
                  background: "var(--background-default)",
                  color: "var(--neutral-on-background-strong)",
                  fontSize: 12, outline: "none", fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: "7px 14px", borderRadius: 8,
                  background: "var(--brand-solid-strong)",
                  border: "none", color: "#fff", fontSize: 12,
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                {isEn ? "Subscribe" : "구독"}
              </button>
            </div>
          )}
        </div>

        {/* 연락하기 */}
        <div style={{
          padding: "1.25rem",
          border: "0.5px solid var(--neutral-alpha-medium)",
          borderRadius: 12,
          background: "var(--background-overlay)",
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6,
            color: "var(--neutral-on-background-strong)" }}>
            {isEn ? "\uD83D\uDCAC Let's talk about the post" : "💬 글에 대해 얘기해요"}
          </div>
          <div style={{ fontSize: 12, color: "var(--neutral-on-background-weak)",
            marginBottom: 12, lineHeight: 1.6 }}>
            {isEn ? "Feedback or questions are always welcome." : "피드백이나 질문이 있으면 언제든지 연락 주세요."}
          </div>
{/*           
            href="mailto:doge@kbfg.com"
            style={{
              display: "inline-block", padding: "7px 14px", borderRadius: 8,
              border: "0.5px solid var(--neutral-alpha-medium)",
              color: "var(--neutral-on-background-medium)",
              textDecoration: "none", fontSize: 12,
            }}
          >
            doge@kbfg.com →
          </a> */}
        </div>

        {/* 포트폴리오 챗봇 유도 */}
        <div style={{
          padding: "1.25rem",
          border: "0.5px solid var(--neutral-alpha-medium)",
          borderRadius: 12,
          background: "var(--background-overlay)",
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6,
            color: "var(--neutral-on-background-strong)" }}>
            {isEn ? "\uD83E\uDD16 Ask the AI" : "🤖 AI에게 물어보기"}
          </div>
          <div style={{ fontSize: 12, color: "var(--neutral-on-background-weak)",
            marginBottom: 12, lineHeight: 1.6 }}>
            {isEn ? "Curious about me? Ask the AI chatbot directly." : "저에 대해 더 궁금하다면 AI 챗봇에게 바로 물어보세요."}
          </div>
          <a href={isEn ? "/en" : "/"}
            style={{
              display: "inline-block", padding: "7px 14px", borderRadius: 8,
              background: "var(--brand-alpha-weak)",
              color: "var(--brand-on-background-medium)",
              textDecoration: "none", fontSize: 12,
              border: "0.5px solid var(--brand-alpha-medium)",
            }}
          >
            {isEn ? "Ask on the portfolio home \u2192" : "포트폴리오 홈에서 물어보기 →"}
          </a>
        </div>
      </div>
    </div>
  );
}
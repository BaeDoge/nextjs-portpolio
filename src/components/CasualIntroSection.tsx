"use client";

import { useLocale } from "next-intl";

const CARDS_KO = [
  {
    emoji: "🏦",
    label: "빠른 실무 경험",
    content:
      "25살에 첫 실무를 시작하여\nKB 국민은행에서 4년간 AI 서비스를 개발·운영하고 있습니다.",
    accent: "#378ADD",
    accentBg: "#E6F1FB",
  },
  {
    emoji: "🤖",
    label: "대규모 대고객서비스",
    content:
      "일 트래픽 5만건 이상의\nKB 챗봇 기반 서비스 \n및 KB 화상상담시스템의\n개발 업무를 수행하였습니다.",
    accent: "#7F77DD",
    accentBg: "#EEEDFE",
  },
  {
    emoji: "🏆",
    label: "열정가",
    content:
      "30번이 넘게 공모전을 도전하며\n수많은 실패를 경험하고\n새로운 도전에 재미를\n붙이게 되었습니다.",
    accent: "#EF9F27",
    accentBg: "#FAEEDA",
  },
  {
    emoji: "🌱",
    label: "넓은 업무 커버리지",
    content:
      "금융,의료,항공 등\n다양한 도메인 및 업무 경험을\n가지고 있습니다.",
    accent: "#D85A30",
    accentBg: "#FAECE7",
  },
];

const CARDS_EN = [
  {
    emoji: "🏦",
    label: "Early Hands-on Experience",
    content:
      "First internship at 25.\nSince 26, I've been building and\noperating AI services at KB Kookmin Bank.",
    accent: "#378ADD",
    accentBg: "#E6F1FB",
  },
  {
    emoji: "🤖",
    label: "Large-scale Customer Service",
    content:
      "Built and operated KB's chatbot,\ncallbot and video consultation systems\nserving over 50,000 requests per day.",
    accent: "#7F77DD",
    accentBg: "#EEEDFE",
  },
  {
    emoji: "🏆",
    label: "Driven by Curiosity",
    content:
      "A 4.4/4.5 major GPA, along with\nlab research, work-study programs,\ninternships and competitions —\nalways aiming for results worth showing.",
    accent: "#EF9F27",
    accentBg: "#FAEEDA",
  },
  {
    emoji: "🌱",
    label: "Broad Technical Coverage",
    content:
      "AI Modeling & LLM\nK8S & Docker\nWeb development\nWorkflow automation —\nalways curious about new technology.",
    accent: "#D85A30",
    accentBg: "#FAECE7",
  },
];

const HEADING = {
  ko: "배승호 미리보기",
  en: "Seung Ho Bae at a glance",
};

export default function CasualIntroSection() {
  const locale = useLocale();
  const isEn = locale === "en";
  const CARDS = isEn ? CARDS_EN : CARDS_KO;

  return (
    <div style={{ width: "100%" }}>
      {/* 섹션 헤더 */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 15,
          fontWeight: 500,
          color: "var(--neutral-on-background-strong)",
          lineHeight: 1.5,
        }}>
          {isEn ? HEADING.en : HEADING.ko}
        </p>
      </div>

      {/* 카드 그리드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 10,
        width: "100%",
      }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              padding: "1rem 1.1rem",
              borderRadius: 12,
              background: "var(--background-overlay)",
              borderTopWidth: "0.5px",
              borderRightWidth: "0.5px",
              borderBottomWidth: "0.5px",
              borderLeftWidth: 3,
              borderStyle: "solid",
              borderTopColor: "var(--neutral-alpha-medium)",
              borderRightColor: "var(--neutral-alpha-medium)",
              borderBottomColor: "var(--neutral-alpha-medium)",
              borderLeftColor: card.accent,
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `inset 0 0 0 0.5px ${card.accent}44`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* 라벨 */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 16 }}>{card.emoji}</span>
              <span style={{
                fontSize: 18,
                fontWeight: 600,
                color: card.accent,
                letterSpacing: "0.2px",
              }}>
                {card.label}
              </span>
            </div>

            {/* 내용 */}
            <p style={{
              fontSize: 16,
              color: "var(--neutral-on-background-medium)",
              lineHeight: 1.75,
              whiteSpace: "pre-line",
              margin: 0,
            }}>
              {card.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

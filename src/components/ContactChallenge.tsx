// src/components/ContactChallenge.tsx
"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const VISITOR_TYPES_KO = [
  { id: "recruiter",    label: "🏢 채용 담당자", sub: "" },
  { id: "curious",      label: "🤔 방문자",      sub: "포트폴리오 문의" },
  { id: "collaborator", label: "🚀 협업 제안",   sub: "협업 문의" },
];

const VISITOR_TYPES_EN = [
  { id: "recruiter",    label: "🏢 Recruiter",          sub: "" },
  { id: "curious",      label: "🤔 Visitor",            sub: "Portfolio enquiry" },
  { id: "collaborator", label: "🚀 Collaboration",      sub: "Partnership enquiry" },
];

const INTERESTS_KO = ["구인", "개발 문의", "포트폴리오 문의", "협업 문의", "기타"];

const INTERESTS_EN = ["Hiring", "Development enquiry", "Portfolio enquiry", "Collaboration", "Other"];

type Step = "type" | "interest" | "message" | "done";

export default function ContactChallenge() {
  const isEn = useLocale() === "en";
  const VISITOR_TYPES = isEn ? VISITOR_TYPES_EN : VISITOR_TYPES_KO;
  const INTERESTS = isEn ? INTERESTS_EN : INTERESTS_KO;
  const [step, setStep] = useState<Step>("type");
  const [visitorType, setVisitorType] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const progressMap: Record<Step, number> = { type: 25, interest: 60, message: 90, done: 100 };

  const handleSubmit = async () => {
    setLoading(true);
    await supabase.from("visitor_messages").insert({
      visitor_type: visitorType,
      interest,
      message: message.trim() || null,
      email: email.trim() || null,
    });
    setLoading(false);
    setStep("done");
  };

  return (
    <div style={{
      background: "var(--background-overlay)",
      border: "0.5px solid var(--neutral-alpha-medium)",
      borderRadius: 16,
      padding: "1.75rem",
      maxWidth: 480,
    }}>
      <p style={{ fontSize: 16, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 4 }}>
        Contact Me !
      </p>
      <p style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", marginBottom: "1.25rem" }}>
        {/* 어떤 질문도 환영이에요. */}
      </p>

      {step !== "done" && (
        <div style={{ height: 3, background: "var(--neutral-alpha-weak)", borderRadius: 2, marginBottom: "1.5rem" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "var(--brand-solid-strong)",
            width: `${progressMap[step]}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      )}

      {step === "type" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {VISITOR_TYPES.map(t => (
            <button key={t.id} onClick={() => { setVisitorType(t.id); setStep("interest"); }} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", borderRadius: 10, cursor: "pointer",
              background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
              textAlign: "left", width: "100%",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--neutral-alpha-weak)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-strong)" }}>{t.label}</span>
              <span style={{ fontSize: 11, color: "var(--neutral-on-background-weak)" }}>{t.sub}</span>
            </button>
          ))}
        </div>
      )}

      {step === "interest" && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-medium)", marginBottom: 12 }}>
            {isEn ? "Thanks for reaching out!" : "연락 감사합니다!"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INTERESTS.map(i => (
              <button key={i} onClick={() => { setInterest(i); setStep("message"); }} style={{
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
                color: "var(--neutral-on-background-medium)",
              }}>
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "message" && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-medium)", marginBottom: 8 }}>
            {isEn ? "Your message" : "하고 싶은 말"} <span style={{ fontWeight: 400, color: "var(--neutral-on-background-weak)" }}>{isEn ? "(optional)" : "(선택)"}</span>
          </p>
          <textarea
            value={message} onChange={e => setMessage(e.target.value)}
            placeholder={isEn ? "Hi! I really enjoyed your portfolio :)" : "안녕하세요! 포트폴리오 잘 봤습니다. :)"}
            rows={3} maxLength={300}
            style={{
              width: "100%", borderRadius: 10, padding: "10px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, lineHeight: 1.6, resize: "vertical", outline: "none",
              marginBottom: 10, fontFamily: "inherit",
            }}
          />
          <p style={{ fontSize: 12, color: "var(--neutral-on-background-weak)", marginBottom: 8 }}>
            {isEn ? "Leave an email and I\u2019ll reply" : "이메일 남기면 답장 드릴게요"} <span style={{ opacity: 0.6 }}>{isEn ? "(optional)" : "(선택)"}</span>
          </p>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%", borderRadius: 10, padding: "9px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, outline: "none", marginBottom: 14, fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep("interest")} style={{
              padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13,
              background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
              color: "var(--neutral-on-background-weak)",
            }}>{isEn ? "\u2190 Back" : "← 뒤로"}</button>
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 1, padding: "9px 16px", borderRadius: 10, cursor: "pointer",
              background: "var(--brand-solid-strong)", border: "none",
              fontSize: 13, fontWeight: 500, color: "#fff", opacity: loading ? 0.6 : 1,
            }}>
              {loading ? (isEn ? "Sending..." : "전송 중...") : (isEn ? "Send \u2192" : "전달하기 →")}
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 8 }}>
            {isEn ? "Thank you!" : "감사합니다!"}
          </p>
          <p style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", lineHeight: 1.7 }}>
            {isEn ? "Got your message." : "메시지 잘 받았어요."}<br />
            {isEn
              ? (email ? "I\u2019ll make sure to reply by email :)" : "Feel free to reach me at doge@kbfg.com anytime.")
              : (email ? "이메일로 꼭 답장 드릴게요 :)" : "언제든지 doge@kbfg.com 으로도 연락 주세요.")}
          </p>
        </div>
      )}
    </div>
  );
}
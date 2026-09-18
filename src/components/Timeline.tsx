// src/components/Timeline.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const SY = 2017, EY = 2026.9, TM = (EY - SY) * 12;
const mo = (y: number, m: number) => (y - SY) * 12 + (m - 1);
const pc = (o: number) => `${(o / TM * 100).toFixed(2)}%`;
const sp = (s: number, e: number) => `${((e - s) / TM * 100).toFixed(2)}%`;
const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

const CATS = [
  { id: "study",  label: "학업",        labelEn: "Education",      color: "#378ADD", light: "#85B7EB" },
  { id: "mil",    label: "군복무",      labelEn: "Military",       color: "#888780", light: "#B4B2A9" },
  { id: "res",    label: "연구·논문",   labelEn: "Research",       color: "#7F77DD", light: "#AFA9EC" },
  { id: "work",   label: "근로장학",    labelEn: "Work-Study",     color: "#639922", light: "#97C459" },
  { id: "comp",   label: "공모전",      labelEn: "Competitions",   color: "#EF9F27", light: "#FAC775" },
  { id: "intern", label: "인턴십",      labelEn: "Internship",     color: "#1D9E75", light: "#5DCAA5" },
  { id: "kb",     label: "KB국민은행",  labelEn: "KB Kookmin Bank",color: "#D85A30", light: "#F0997B" },
  { id: "act",    label: "업무 외 활동", labelEn: "Extracurricular",color: "#4F46E5", light: "#A5B4FC" },
  { id: "certi",  label: "자격증·교육", labelEn: "Certifications", color: "#0891B2", light: "#67E8F9" },
];

// 컬러 참고표 (Once UI 팔레트 기준)
// Purple  계열: #7F77DD (mid) / #AFA9EC (light)
// Teal    계열: #1D9E75 (mid) / #5DCAA5 (light)
// Coral   계열: #D85A30 (mid) / #F0997B (light)
// Pink    계열: #D4537E (mid) / #ED93B1 (light)
// Gray    계열: #888780 (mid) / #B4B2A9 (light)
// Blue    계열: #378ADD (mid) / #85B7EB (light)
// Green   계열: #639922 (mid) / #97C459 (light)
// Amber   계열: #BA7517 (mid) / #EF9F27 (light)
// Red     계열: #E24B4A (mid) / #F09595 (light)

// 사용 안 한 컬러 중 추천
// Indigo  : / 
// Cyan    :  / 
// Rose    : #BE185D / #FDA4AF
// Violet  : #6D28D9 / #C4B5FD
// Lime    : #4D7C0F / #A3E635
// Orange  : #C2410C / #FCA773


export const TIMELINE_ACTS = [
  { c:"study",  t:"영남대 정보통신공학과", en:"Yeungnam Univ., Information & Communication Eng.",
    sy:2017,sm:3,  ey:2023,em:2,  d:"전액장학금", dEn:"Full scholarship",
    g:["전체 GPA 4.21/4.5","전공 GPA 4.46/4.5"], gEn:["Overall GPA 4.21/4.5","Major GPA 4.46/4.5"] },
  { c:"mil",    t:"대한민국 육군 복무",   en:"Republic of Korea Army",
    sy:2018,sm:1,  ey:2019,em:10, d:"2019.10 전역", dEn:"Discharged Oct 2019",
    g:[""], gEn:[""] },
  { c:"res",    t:"MCL 학부연구생",       en:"Undergraduate Researcher, MCL",
    sy:2020,sm:1,  ey:2022,em:6,  d:"Mobile Communication Lab", dEn:"Mobile Communication Lab",
    g:["논문 작성","학술대회 참여"], gEn:["Paper writing","Conference presentations"] },
  { c:"work",   t:"교내 근로장학생",      en:"Work-Study Program",
    sy:2020,sm:3,  ey:2022,em:9,  d:"하나테크놀러지 · 중앙도서관 근로활동", dEn:"Hana Technology & Central Library",
    g:["생활비 벌기"], gEn:["Supporting living costs"] },
  { c:"comp",   t:"공모전 집중 기간", en:"Hackathons & Competitions",
    sy:2021,sm:1,  ey:2021,em:12, d:"AI · 데이터 분석 · Vision · 그 외, 10종", dEn:"10 competitions: AI, data analysis, vision and more",
    g:["SK","KB","산업통상자원부"], gEn:["SK","KB","Ministry of Trade, Industry and Energy"] },
  { c:"intern", t:"Qisens AI 인턴십",    en:"Qisens AI Internship",
    sy:2022,sm:3,  ey:2022,em:6,  d:"항공 영상 Segmentation · Labeling · 학술발표", dEn:"Aerial image segmentation, labeling and academic presentation",
    g:["Computer Vision","DL"], gEn:["Computer Vision","DL"] },
  { c:"intern", t:"ETRI 연구소 인턴십",  en:"ETRI Research Internship",
    sy:2022,sm:7,  ey:2022,em:8,  d:"PPG/ECG 기반 혈압 추정 모델 개발, 통신학회 논문 등록", dEn:"PPG/ECG-based blood pressure estimation model; paper registered with KICS",
    g:["ETRI","의료IT융합연구실"], gEn:["ETRI","Medical IT Convergence Lab"] },
  { c:"kb",     t:"금융AI센터 — AI 금융비서", en:"Financial AI Center — AI Financial Assistant",
    sy:2022,sm:12, ey:2024,em:9,  d:"아바타 챗봇 개발·운영 · 클라우드 운영 및 비용 최적화 · CI/CD · 학습데이터 관리", dEn:"Avatar chatbot development and operation, cloud ops and cost optimization, CI/CD, training-data management",
    g:["AWS","K8S","DL"], gEn:["AWS","K8S","DL"] },
  { c:"certi",  t:"승격필수 자격 취득",  en:"Certifications Required for Promotion",
    sy:2023,sm:6,  ey:2024,em:6, d:"조직내 승격필수 은행업무 교육 3종 수료", dEn:"Completed three mandatory banking courses required for promotion",
    g:["상품판매","자산관리/가계여신","데이터/AI"], gEn:["Product sales","Asset management / household credit","Data & AI"] },
  { c:"kb",     t:"고객컨택혁신부 — 챗봇·콜봇", en:"Customer Contact Innovation — Chatbot & Callbot",
    sy:2024,sm:9,  ey:2025,em:6,  d:"대고객 챗봇·콜봇 개발 및 운영", dEn:"Development and operation of customer-facing chatbot and callbot",
    g:["LLM","RAG","데이터 분석"], gEn:["LLM","RAG","Data analysis"] },
  { c:"act",    t:"ECHO 사회공헌 활동",  en:"KB ECHO Social Contribution Program",
    sy:2025,sm:1,  ey:2025,em:12, d:"조직내 청년 사회공헌 문화 선도 그룹 활동", dEn:"Leading group for the company's youth social-contribution culture",
    g:["사회공헌"], gEn:["Social contribution"] },
  { c:"act",    t:"Chapter 프로그램",  en:"KB Chapter Program",
    sy:2025,sm:1,  ey:2025,em:12, d:"조직내 IT 인력간 기술역량 강화 커뮤니티 리더 활동", dEn:"Community leader for strengthening technical skills among in-house IT staff",
    g:["기술 커뮤니티"], gEn:["Tech community"] },
  { c:"certi",  t:"자격증 집중 기간",  en:"Certification Sprint",
    sy:2025,sm:3,  ey:2025,em:10, d:"업무와 병행하며 IT / 언어 자격증 취득", dEn:"Earned IT and language certifications alongside full-time work",
    g:["PCCP","PCCE","ADSP","DASP","SQLD","OPIC"], gEn:["PCCP","PCCE","ADSP","DASP","SQLD","OPIC"] },
  { c:"kb",     t:"학습관리시스템 개발",   en:"Learning Management System",
    sy:2025,sm:6,  ey:2026,em:4,  d:"다수 챗봇 통합 운영 · 관리 플랫폼 개발 · 클라우드 환경 구축", dEn:"Unified operation of multiple chatbots, management platform development, cloud environment setup",
    g:["FastAPI","Flask","MySQL","AWS","Redis","DL","JS","HTMX"], gEn:["FastAPI","Flask","MySQL","AWS","Redis","DL","JS","HTMX"] },
  { c:"kb",     t:"생성형 AI 챗봇 고도화",   en:"Enhancing Generative AI Chatbots",
    sy:2026,sm:4,  ey:2026,em:5,  d:"RAG 기반 생성형 AI 챗봇 시스템 구축 (직원용 챗봇 -> 고객용 챗봇)", dEn:"Built a RAG-based generative AI chatbot system (employee-facing to customer-facing)",
    g:["RAG","AI Agent","LLM"], gEn:["RAG","AI Agent","LLM"] },
  { c:"kb",     t:"KB 화상상담시스템 개발·운영",   en:"KB Video Consultation System",
    sy:2026,sm:6,  ey:2026,em:9,  d:"지점 방문 없이 금융 상담·상품 가입이 가능한 비대면 채널. 신탁상품 및 스타뱅킹 비대면 가입에 필요한 실명확인 서비스 운영", dEn:"A remote channel for financial consultation and product subscription without visiting a branch. Operated the identity-verification service required for trust products and non-face-to-face Star Banking subscriptions",
    g:["실명확인","신탁 비대면","Vision","DevOps"], gEn:["Identity verification","Remote trust sales","Vision","DevOps"] },
  { c:"act",    t:"KB IT's Your Life 멘토링",   en:"KB IT's Your Life Mentoring",
    sy:2026,sm:7,  ey:2026,em:8,  d:"취업준비생 대상 3주간 IT 프로젝트 멘토링 및 최종 팀 프로젝트 심사위원", dEn:"Three weeks of IT project mentoring for job seekers, plus serving as a judge for the final team projects",
    g:["멘토링","사회공헌","심사위원"], gEn:["Mentoring","Social contribution","Judging"] },
];

type Act = typeof TIMELINE_ACTS[0];

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    } as React.CSSProperties,
  };
}

// ── 교차 배치 세로 타임라인 아이템 ─────────────────────────────
function AltItem({ a, idx, isLast, catMap, isEn }: {
  a: Act; idx: number; isLast: boolean;
  catMap: Record<string, typeof CATS[0]>;
  isEn: boolean;
}) {
  const c = catMap[a.c];
  const isLeft = idx % 2 === 0;
  const isPulse = a.ey === 2026 && a.em === 4;
  const { ref, style } = useFadeIn(idx * 60);

  const card = (
    <div style={{
      flex: 1,
      padding: "0.9rem 1.1rem",
      borderRadius: 10,
      background: "var(--background-overlay)",
      borderTopWidth: "0.5px",
      borderRightWidth: "0.5px",
      borderBottomWidth: "0.5px",
      borderLeftWidth: isLeft ? "0.5px" : 3,
      borderStyle: "solid",
      borderTopColor: "var(--neutral-alpha-medium)",
      borderRightColor: isLeft ? "var(--neutral-alpha-medium)" : "var(--neutral-alpha-medium)",
      borderBottomColor: "var(--neutral-alpha-medium)",
      borderLeftColor: isLeft ? "var(--neutral-alpha-medium)" : c.color,
      // borderRightWidth: isLeft ? 3 : "0.5px",
      // borderRightColor2: isLeft ? c.color : "var(--neutral-alpha-medium)",
      maxWidth: "calc(50% - 28px)",
      textAlign: isLeft ? "right" : "left",
    }}>
      <div style={{
        fontSize: 12, fontFamily: "monospace",
        color: "var(--neutral-on-background-weak)", marginBottom: 4,
      }}>
        {a.sy}.{String(a.sm).padStart(2,"0")}
        {(a.ey !== a.sy || a.em !== a.sm) && ` — ${a.ey}.${String(a.em).padStart(2,"0")}`}
      </div>
      <div style={{
        display: "inline-block", padding: "1px 7px", borderRadius: 20,
        background: `${c.color}22`, border: `1px solid ${c.color}55`,
        fontSize: 11, fontWeight: 500, color: c.light, marginBottom: 6,
      }}>{isEn ? c.labelEn : c.label}</div>
      <div style={{
        fontSize: 15, fontWeight: 600,
        color: "var(--neutral-on-background-strong)",
        lineHeight: 1.4, marginBottom: 3,
      }}>{isEn ? a.en : a.t}</div>
      {!isEn && a.en && (
        <div style={{ fontSize: 12, color: "var(--neutral-on-background-weak)", fontStyle: "italic", marginBottom: 6 }}>
          {a.en}
        </div>
      )}
      <div style={{ fontSize: 13.5, color: "var(--neutral-on-background-medium)", lineHeight: 1.7 }}>
        {isEn ? a.dEn : a.d}
      </div>
      {a.g && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 4, marginTop: 7,
          justifyContent: isLeft ? "flex-end" : "flex-start",
        }}>
          {(isEn ? a.gEn : a.g).map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: "3px 9px", borderRadius: 20,
              border: `1px solid ${c.color}44`, color: c.light, background: `${c.color}15`,
            }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );

  const spacer = <div style={{ flex: 1, maxWidth: "calc(50% - 28px)" }} />;

  return (
    <div ref={ref} style={{ ...style, position: "relative", marginBottom: isLast ? 0 : "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {/* 왼쪽 카드 */}
        {isLeft ? card : spacer}

        {/* 중앙 도트 */}
        <div style={{
          width: 56, flexShrink: 0,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div style={{
            width: isPulse ? 14 : 10,
            height: isPulse ? 14 : 10,
            borderRadius: "50%",
            background: c.color,
            border: "2px solid var(--background-default)",
            marginTop: 14,
            animation: isPulse ? "tlpulse 2s infinite" : "none",
            zIndex: 1,
            flexShrink: 0,
          }} />
        </div>

        {/* 오른쪽 카드 */}
        {isLeft ? spacer : card}
      </div>
    </div>
  );
}

// ── 교차 세로 타임라인 ────────────────────────────────────────
function AlternatingTimeline() {
  const isEn = useLocale() === "en";
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));
  const sorted = [...TIMELINE_ACTS].sort((a, b) => mo(a.sy, a.sm) - mo(b.sy, b.sm));

  return (
    <div style={{ position: "relative" }}>
      {/* 중앙 수직선 */}
      <div style={{
        position: "absolute",
        left: "50%", transform: "translateX(-50%)",
        top: 0, bottom: 0, width: 2,
        background: "var(--neutral-alpha-weak)",
      }} />

      {sorted.map((a, idx) => (
        <AltItem
          key={`${a.c}-${a.sy}-${a.sm}-${idx}`}
          a={a} idx={idx}
          isLast={idx === sorted.length - 1}
          catMap={catMap}
          isEn={isEn}
        />
      ))}

      {/* 현재 배지 */}
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", gap: 6,
        marginTop: "1.5rem",
        fontSize: 12, color: "var(--neutral-on-background-weak)",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#E24B4A", animation: "tlpulse 2s infinite",
        }} />
        {isEn ? "In progress" : "현재 진행 중"}
      </div>
      <style>{`@keyframes tlpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}`}</style>
    </div>
  );
}

// ── 가로 타임라인 매트릭스 ────────────────────────────────────
function TimelineMatrix() {
  const isEn = useLocale() === "en";
  const [active, setActive] = useState<Act | null>(null);
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));
  const rowMap = Object.fromEntries(CATS.map(c => [c.id, TIMELINE_ACTS.filter(a => a.c === c.id)]));
  const nowOff = mo(2026, 4);
  const { ref, style } = useFadeIn(0);

  return (
    <div ref={ref} style={style}>
      <p style={{
        fontSize: 12, fontWeight: 500, fontFamily: "monospace",
        color: "var(--neutral-on-background-weak)",
        letterSpacing: "0.5px", marginBottom: 14, textTransform: "uppercase",
      }}>
        {isEn ? "Timeline Matrix" : "타임라인 매트릭스"}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {CATS.map(c => rowMap[c.id]?.length > 0 && (
          <span key={c.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--neutral-on-background-weak)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c.color, display: "inline-block" }} />
            {isEn ? c.labelEn : c.label}
          </span>
        ))}
      </div>

      <div style={{
        overflowX: "auto",
        overflowY: "hidden",   // ← 세로 스크롤 완전 제거
      }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ marginLeft: 108, position: "relative", height: 22, marginBottom: 4 }}>
            {YEARS.map(y => (
              <span key={y} style={{
                position: "absolute",
                left: `${((y - SY) * 12 / TM * 100).toFixed(1)}%`,
                transform: "translateX(-50%)",
                fontSize: 10, fontWeight: 500, color: "var(--neutral-on-background-weak)",
              }}>{y}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3,overflow: "hidden"}}>
            {CATS.map(c => {
              const acts = rowMap[c.id] ?? [];
              if (!acts.length) return null;
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 108, flexShrink: 0, fontSize: 11, fontWeight: 500, paddingRight: 10, textAlign: "right", color: c.light }}>
                    <span style={{ display: "inline-block", width: 8, height: 8, background: c.color, borderRadius: 2, marginRight: 4, verticalAlign: "middle" }} />
                    {isEn ? c.labelEn : c.label}
                  </div>
                  <div style={{ position: "relative", flex: 1, height: 26, minHeight:26,maxHeight:26,overflow:'hidden',background: "var(--neutral-alpha-weak)", borderRadius: 3 }}>
                    {YEARS.map(y => (
                      <div key={y} style={{ position: "absolute", left: `${((y - SY) * 12 / TM * 100).toFixed(1)}%`, top: 0, bottom: 0, width: 1, background: "var(--neutral-alpha-weak)", pointerEvents: "none" }} />
                    ))}
                    <div style={{ position: "absolute", left: pc(nowOff), top: -3, bottom: -3, width: 2, background: "#E24B4A", borderRadius: 1, zIndex: 4, pointerEvents: "none" }}>
                      <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#E24B4A", fontWeight: 500, whiteSpace: "nowrap" }}>{isEn ? "Now" : "현재"}</span>
                    </div>
                    {acts.map((a, i) => (
                      <div key={i} onClick={() => setActive(active === a ? null : a)} title={isEn ? a.en : a.t} style={{
                        position: "absolute", left: pc(mo(a.sy, a.sm)), width: sp(mo(a.sy, a.sm), mo(a.ey, a.em)),
                        top: 2, height: 22, background: c.color, borderRadius: 3, cursor: "pointer",
                        zIndex: acts.length - i, opacity: acts.length > 1 ? (1 - i * 0.2) : 1,
                        outlineWidth: active === a ? 2 : 0, outlineStyle: "solid", outlineColor: c.light, outlineOffset: 1,
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>

      {active && (() => {
        const c = catMap[active.c];
        return (
          <div style={{
            marginTop: 12,
            borderTopWidth: "0.5px", borderRightWidth: "0.5px",
            borderBottomWidth: "0.5px", borderLeftWidth: 3,
            borderStyle: "solid",
            borderTopColor: "var(--neutral-alpha-medium)",
            borderRightColor: "var(--neutral-alpha-medium)",
            borderBottomColor: "var(--neutral-alpha-medium)",
            borderLeftColor: c.color,
            borderRadius: "0 10px 10px 0",
            padding: "0.85rem 1rem",
            background: "var(--background-overlay)",
          }}>
            <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 20, background: `${c.color}22`, border: `1px solid ${c.color}55`, fontSize: 10, fontWeight: 500, color: c.light, marginBottom: 6 }}>{isEn ? c.labelEn : c.label}</span>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 2 }}>{isEn ? active.en : active.t}</div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--neutral-on-background-weak)", marginBottom: 7 }}>
              {active.sy}.{String(active.sm).padStart(2, "0")} — {active.ey}.{String(active.em).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 12, color: "var(--neutral-on-background-medium)", lineHeight: 1.65 }}>{isEn ? active.dEn : active.d}</div>
            {active.g && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                {(isEn ? active.gEn : active.g).map(tag => (
                  <span key={tag} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, border: `1px solid ${c.color}44`, color: c.light, background: `${c.color}15` }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default function Timeline() {
  const { ref: mRef, style: mStyle } = useFadeIn(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      <AlternatingTimeline />
      <div ref={mRef} style={mStyle}>
        <div style={{ borderTop: "0.5px solid var(--neutral-alpha-weak)", marginBottom: "2rem" }} />
        <TimelineMatrix />
      </div>
    </div>
  );
}
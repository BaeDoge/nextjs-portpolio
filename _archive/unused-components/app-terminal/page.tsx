// src/app/[locale]/terminal/page.tsx
"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// ─── Supabase 방명록 연결 ───────────────────────
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── 명령어 정의 ────────────────────────────────
const COMMANDS: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => `사용 가능한 명령어:

  whoami          나에 대한 소개
  ls projects     프로젝트 목록
  ls skills       기술 스택 목록
  cat awards.txt  수상 내역
  cat contact.txt 연락처 정보
  cat story.txt   나의 이야기
  github          GitHub 바로가기
  guestbook       방명록 보기
  sign [메시지]   방명록 작성 (예: sign 안녕하세요!)
  clear           화면 초기화
  ./easter_egg    ???

  팁: 탭키로 자동완성 지원예정`,

  whoami: () => `
  ██████╗  █████╗ ███████╗
  ██╔══██╗██╔══██╗██╔════╝
  ██████╔╝███████║█████╗
  ██╔══██╗██╔══██║██╔══╝
  ██████╔╝██║  ██║███████╗
  ╚═════╝ ╚═╝  ╚═╝╚══════╝
  
  ███████╗███████╗██╗   ██╗███╗   ██╗ ██████╗    ██╗  ██╗ ██████╗
  ██╔════╝██╔════╝██║   ██║████╗  ██║██╔════╝    ██║  ██║██╔═══██╗
  ███████╗█████╗  ██║   ██║██╔██╗ ██║██║  ███╗   ███████║██║   ██║
  ╚════██║██╔══╝  ██║   ██║██║╚██╗██║██║   ██║   ██╔══██║██║   ██║
  ███████║███████╗╚██████╔╝██║ ╚████║╚██████╔╝   ██║  ██║╚██████╔╝
  ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝    ╚═╝  ╚═╝ ╚═════╝
  

    이름    : 배승호 (Bae Seung-Ho)
    직함    : AI Platform Engineer
    현직    : KB국민은행 고객컨택혁신부 대리
    위치    : 서울, 대한민국
    철학    : "도전이 멈추면, 성장도 멈춘다."
    특기    : AI 서비스 개발 + Kubernetes 운영 + 공모전 우승
  
    -- 빠른 사실 --
    수상    : 11회 (KB, SK, 정부기관 주관)
    논문    : 5편 (한국통신학회, 임베디드공학회)
    자격증  : PCCP LV3 · PCCE Master · ADsP`,

  "ls projects": () => `drwxr-xr-x  프로젝트 디렉토리:

  ai-lms-platform/          [2025] AI 학습관리 플랫폼       KB국민은행
  ai-financial-assistant/   [2024] AI 금융비서 서비스        KB국민은행
  virtual-counselor-poc/    [2024] 가상 상담원 PoC          KB국민은행
  embedded-sw-contest/      [2021] 양치습관 분석 시스템      임베디드SW 경진대회 우수상
  blood-pressure-ppg/       [2022] PPG 혈압 추정 모델        ETRI 연구소
  aerial-segmentation/      [2022] 항공 영상 분할 모델       Qisens AI 인턴십
  adhd-prediction/          [2022] ADHD 예측 모델            MCL 연구실
  this-portfolio/           [2025] AI 챗봇 내장 포트폴리오  현재 보고 계신 이 사이트

  [자세히 보려면] → https://portpolio-bae-seungho.vercel.app/work`,

  "ls skills": () => `── AI & Machine Learning ──────────────────────────────────
  LLM, AI Agent, RAG, PyTorch, TensorFlow, Computer Vision
  YOLO, Segmentation, NLP, 생체신호처리(PPG/ECG), Crawl4AI

── Backend & Infrastructure ───────────────────────────────
  Python (Flask, FastAPI), Node.js, REST API 설계
  Kubernetes, AWS (EKS/EC2/S3/Lambda), Docker, CI/CD, HPA

── Frontend & Database ────────────────────────────────────
  React, Next.js, Tailwind CSS
  MySQL, Supabase (pgvector), 데이터 시각화

── 자격증 ──────────────────────────────────────────────────
  PCCP LV3  |  PCCE Master  |  ADsP (2025)
  은행실무종합능력평가 3년 연속 수료`,

  "cat awards.txt": () => `── 수상 내역 (최신순) ──────────────────────────────────────
  2025  업무자동화(RDA) 에이전트 개발 경진대회   우수상  KB국민은행
  2024  생성형 AI Agent 경진대회               장려상  KB국민은행
  2022  AI Speaker 데이터분석 경진대회          우수상  영남대학교
  2021  영남대학교 IoT 경진대회                최우수상 영남대학교
  2021  SK AI Challenge for Our Society       우수상  SK주식회사
  2021  경상북도 공공데이터 AI 공모전           우수상  포스텍
  2021  제19회 임베디드SW 경진대회             우수상  산업통상자원부
  2021  대한임베디드공학회 우수발표논문상                대한임베디드공학회
  2021  KB Future Finance AI Challenge        우수상  KB국민은행
  2021  해양경찰청 데이터 활용 공모전           장려상  해양경찰청
  2020  제9회 경찰청 인권영화제 소재 공모전     우수상  경찰청

  Total: 11개 수상 / 30+ 도전`,

  "cat contact.txt": () => `── 연락처 ─────────────────────────────────────────────────
  Email   : doge@kbfg.com
  GitHub  : https://github.com/Bae-SeungHo
  Portfolio: https://portpolio-bae-seungho.vercel.app

  ── 협업 가능한 것들 ──
  ✓ 사이드 프로젝트 협업
  ✓ AI/ML 관련 기술 자문
  ✓ 개발 멘토링 (영남대, 한양대 멘토 경험 있음)`,

  "cat story.txt": () => `── 나의 이야기 ───────────────────────────────────────────

  "도전이 멈추면, 성장도 멈춘다."

  대학교 1학년 때는 그냥 수업만 들었습니다.
  하지만 2021년, 뭔가 달라야겠다고 생각했습니다.

  그해 공모전에 30번 넘게 도전했습니다.
  처음 몇 번은 탈락했습니다. 계속했습니다.
  결국 10번 이상 수상했습니다.

  같은 시기에 ETRI에서 논문을 썼고,
  Qisens AI에서 실전 코드를 짰고,
  MCL 연구실에서 학술대회에 나갔습니다.

  그리고 졸업 전에 KB국민은행에 들어갔습니다.
  지금은 수백만 고객이 쓰는 AI 서비스를 만듭니다.

  도전이 멈추지 않는 한, 이 이야기는 계속됩니다.`,

  github: () => {
    if (typeof window !== "undefined") {
      window.open("https://github.com/Bae-SeungHo", "_blank");
    }
    return "GitHub 프로필 열기: https://github.com/Bae-SeungHo";
  },

  "./easter_egg": () => `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  Congratulations! 이스터에그를 찾으셨군요.

  이 포트폴리오를 끝까지 탐색해주셔서 감사합니다.
  저도 이렇게 끝까지 파고드는 사람을 좋아합니다 :)

  채용이나 협업 제안은 언제든지 환영합니다.
  doge@kbfg.com 으로 연락 주세요.

  "The best way to predict the future is to create it."
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

  guestbook: async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("message, nickname, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error || !data?.length) return "방명록이 비어있어요. sign [메시지] 로 첫 번째 방문자가 되어보세요!";

      const lines = data.map(r => {
        const d = new Date(r.created_at).toLocaleDateString("ko-KR");
        return `  [${d}] ${r.nickname || "익명"}: ${r.message}`;
      });
      return `── 방명록 (최근 10개) ─────────────────────────────────\n${lines.join("\n")}`;
    } catch {
      return "방명록 불러오기 실패. Supabase 연결을 확인해주세요.";
    }
  },
};

// sign 명령어는 별도 처리 (args 필요)
async function handleSign(message: string): Promise<string> {
  if (!message.trim()) return "사용법: sign [메시지]  예) sign 멋진 포트폴리오네요!";

  const nickname = "익명-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  const { error } = await supabase.from("guestbook").insert({
    message: message.trim().slice(0, 200),
    nickname,
  });

  if (error) return `방명록 저장 실패: ${error.message}`;
  return `✓ 방명록에 등록됐습니다! (닉네임: ${nickname})\n  다른 방문자들도 볼 수 있어요. 'guestbook' 으로 확인하세요.`;
}

// ─── 터미널 컴포넌트 ─────────────────────────────
interface Line {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: `  KB국민은행 AI Platform Engineer 배승호의 터미널
  ──────────────────────────────────────────────────
  환영합니다! 'help' 를 입력해서 사용 가능한 명령어를 확인하세요.
  ` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLine = (type: Line["type"], text: string) => {
    setLines(prev => [...prev, { type, text }]);
  };

  const runCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLine("input", `$ ${trimmed}`);
    setHistory(h => [trimmed, ...h].slice(0, 50));
    setHistIdx(-1);

    if (trimmed === "clear") {
      setLines([{ type: "system", text: "화면이 지워졌습니다. 'help' 로 명령어 확인." }]);
      return;
    }

    // sign 명령어
    if (trimmed.startsWith("sign ")) {
      setLoading(true);
      const msg = trimmed.slice(5);
      const result = await handleSign(msg);
      addLine("output", result);
      setLoading(false);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (!handler) {
      addLine("error", `command not found: ${trimmed}\n  'help' 로 사용 가능한 명령어를 확인하세요.`);
      return;
    }

    setLoading(true);
    const result = await handler([]);
    addLine("output", result);
    setLoading(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const match = cmds.find(c => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  const lineColor = (type: Line["type"]) => {
    if (type === "input") return "#5DCAA5";      // teal
    if (type === "error") return "#F09595";      // red
    if (type === "system") return "#AFA9EC";     // purple
    return "#D3D1C7";                            // default gray
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        padding: "1.5rem",
        cursor: "text",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* 터미널 바 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: "1rem", paddingBottom: "0.75rem",
        borderBottom: "0.5px solid #333",
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 12, fontSize: 12, color: "#666" }}>
          baeseungho@portfolio:~$
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#444" }}>
          <a href="/" style={{ color: "#5DCAA5", textDecoration: "none" }}>← 포트폴리오로 돌아가기</a>
        </span>
      </div>

      {/* 출력 영역 */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {lines.map((l, i) => (
          <pre key={i} style={{
            color: lineColor(l.type),
            fontSize: 13, lineHeight: 1.7,
            whiteSpace: "pre-wrap", wordBreak: "break-word",
            margin: 0, padding: "2px 0",
          }}>
            {l.text}
          </pre>
        ))}
        {loading && (
          <pre style={{ color: "#5DCAA5", fontSize: 13, margin: 0, padding: "2px 0",
            animation: "blink 1s infinite" }}>
            ▊ 처리 중...
          </pre>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력 영역 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "0.75rem",
        borderTop: "0.5px solid #222", paddingTop: "0.75rem" }}>
        <span style={{ color: "#5DCAA5", fontSize: 13, flexShrink: 0 }}>$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1, background: "transparent", border: "none",
            color: "#D3D1C7", fontSize: 13,
            fontFamily: "inherit", outline: "none",
            caretColor: "#5DCAA5",
          }}
          autoComplete="off"
          spellCheck={false}
          placeholder="명령어 입력 후 Enter... (help 로 시작)"
        />
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
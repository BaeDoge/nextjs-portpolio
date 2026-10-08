// src/components/MiniTerminal.tsx
"use client";
import { useState, useEffect, useRef } from "react";

const COMMANDS: Record<string, string> = {
  help: `사용 가능한 명령어:
  name       이름
  age        나이
  mbti       MBTI
  interest   관심사
  hobby      취미
  music      좋아하는 음악
  food       좋아하는 음식
  dream      목표
  left_right 좌우명
  fun        재미있는 사실
  contact    연락처
  guestbook   방명록 보기
  sign [메시지] 방명록 작성 (예: sign 안녕하세요!)
  clear      초기화`,

  whoami:  "KB 국민은행 개발자 배승호 입니다! ",
  name:    "배승호 (Bae Seung-Ho) 🇰🇷",
  age:     "만 27세 — 1998년생",
  mbti:    "INFP\n목표가 생기면 무엇이든지 이루는 타입이에요.\n평소에는 조용하지만 I들 사이에선 ENFP가 됩니다.",
  interest:"새로운 분야를 배우는것을 좋아합니다.\n최근 Native AI 와 웹 플랫폼 개발에 관심이 많아요.",
  hobby:   "일렉기타 연주와 클라이밍을 좋아해요. \n회사 밴드 동호회 회장을 맡고 있어요.",
  music:   "장르 가리지 않아요.\n코딩할 때는 Jazz, 집중 안 될 때는 아이유.",
  food:    "매운거와 오이 빼고는 다 먹습니다.\n신기하게 피클은 좋아합니다.",
  dream:   "내가 기여하는 AI 서비스를 수백만 명이 쓰는 것.\n은행의 챗봇을 개발하며 조금은 이룬것 같아요.",
  left_right: '좌우명:\n" 할수 있을때 하고 배울수 있을때 배우자. "\n',
  fun:     "재미있는 사실들:\n• 입행 4년차지만 아직도 부서 남자중에서 막내에요.\n• 사투리를 아직도 조금 씁니다.\n• 터미널은 그냥 멋있어서 넣었습니다.",
  contact: "• 이메일: doge@kbfg.com\n• GitHub: github.com/Bae-SeungHo\n• 포트폴리오: 지금 보고 계신 이 사이트",
  // name:    "배승호 (Bae Seung-Ho) 🇰🇷",
  // age:     "만 27세 — 1998년생",
  // mbti:    "INTJ\n계획 세우는 걸 좋아하고, 혼자 깊이 생각하는 타입이에요.\n근데 일 얘기 나오면 갑자기 ENTJ 됩니다.",
  // hobby:   "커피 마시기 ☕  |  산책 🚶  |  유튜브 보기 📺\n새로운 AI 툴 써보기 🤖  |  가끔 영화 보기 🎬",
  // music:   "장르 가리지 않아요.\n코딩할 때는 Lo-fi, 집중 안 될 때는 아이유.",
  // food:    "마라탕 🥵  |  삼겹살 🥩  |  카레 🍛\n매운 거 잘 못 먹는데 마라탕은 예외입니다.",
  // dream:   "내가 만든 AI 서비스를 수백만 명이 쓰는 것.\n사실 이미 조금 이루고 있는 중이에요.",
  // fun:     "재미있는 사실들:\n• 대학 4년 동안 공모전을 30번 넘게 도전했어요\n• 이 포트폴리오도 AI로 반쯤 만들었어요\n• 터미널이 그냥 멋있어서 넣었습니다",
  // contact: "이메일: doge@kbfg.com\nGitHub: github.com/Bae-SeungHo\n포트폴리오: 지금 보고 계신 이 사이트",
};

const BOOT_SEQUENCE = [
  { delay: 200,  text: "$ whoami" },
  { delay: 600,  text: "배승호 — AI Platform Engineer" },
  { delay: 1000, text: "" },
  { delay: 1100, text: "$ 'help' 로 더 알아보기" },
];

interface Line { type: "input" | "output" | "system"; text: string }

// src/components/MiniTerminal.tsx — 수정 부분만
// 출력 영역 div에 ref를 걸고, scrollIntoView 대신 scrollTop 사용

export default function MiniTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  // bottomRef 대신 scrollContainerRef로 컨테이너 자체를 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    BOOT_SEQUENCE.forEach(({ delay, text }) => {
      setTimeout(() => {
        if (!mounted) return;
        if (text) setLines(p => [...p, { type: text.startsWith("$") ? "input" : "output", text }]);
        if (delay === 1100) setBooted(true);
      }, delay);
    });
    return () => { mounted = false; };
  }, []);

  // ← 핵심 수정: scrollIntoView 대신 컨테이너 내부만 스크롤
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLine("input", `$ ${trimmed}`);
    setHistory(h => [trimmed, ...h].slice(0, 30));
    setHistIdx(-1);

    const lower = trimmed.toLowerCase();

    if (lower === "clear") {
      setLines([]);
      return;
    }

    // sign 명령어
    if (lower.startsWith("sign ")) {
      const message = trimmed.slice(5).trim();
      if (!message) {
        addLine("system", "사용법: sign [메시지]  예) sign 포트폴리오 잘 봤어요!");
        return;
      }
      addLine("output", "방명록 저장 중...");
      try {
        const res = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        const data = await res.json();
        if (res.ok) {
          addLine("output", `✓ 방명록에 등록됐습니다!\n  'guestbook' 명령어로 확인해보세요.`);
        } else {
          addLine("system", `오류: ${data.error}`);
        }
      } catch {
        addLine("system", "네트워크 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      }
      return;
    }

    // guestbook 명령어
    if (lower === "guestbook") {
      addLine("output", "방명록 불러오는 중...");
      try {
        const res = await fetch("/api/guestbook");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        const entries = data.entries as { message: string; nickname: string; created_at: string }[];
        if (!entries || entries.length === 0) {
          addLine("output", `방명록이 비어있어요.\n  'sign [메시지]' 명령어로 첫 번째 방문자가 되어보세요!`);
        } else {
          const lines = entries.slice(0, 10).map(e => {
            const d = new Date(e.created_at).toLocaleDateString("ko-KR");
            return `  [${d}] ${e.nickname}: ${e.message}`;
          });
          addLine("output", `── 방명록 (최근 ${entries.length}개) ─────────────────\n${lines.join("\n")}`);
        }
      } catch {
        addLine("system", "방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      }
      return;
    }

    // 기존 명령어
    const result = COMMANDS[lower];
    if (result) {
      addLine("output", result);
    } else {
      addLine("system", `command not found: ${trimmed}\n  'help'를 입력해보세요.`);
    }
  };

  // addLine 헬퍼 함수 추가 (setLines 쓸 때 클로저 문제 방지)
  const addLine = (type: Line["type"], text: string) => {
    setLines(prev => [...prev, { type, text }]);
  };

  
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
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
      const m = cmds.find(c => c.startsWith(input));
      if (m) setInput(m);
    }
  };

// MiniTerminal.tsx — return 부분 최외곽 div만 수정
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: "#0f0f0f",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        // ↓ 부모 높이를 100% 채움 — 절대 늘어나지 않음
        height: "100%",
        cursor: "text",
        fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
      }}
    >
      {/* 타이틀바 — flex-shrink:0 으로 높이 고정 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 12px",
        background: "#1a1a1a",
        borderBottom: "1px solid #222",
        flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#555" }}>seungho@portfolio:~</span>
      </div>

      {/* 출력 영역 — flex:1 로 남은 공간 차지, overflow:auto 로 내부 스크롤 */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minHeight: 0,          // ← flex 컨테이너에서 줄어들 수 있게
          maxHeight: "800px",    // ← 이 줄 추가 — 여기서 스크롤 고정
        }}
      >
        {lines.map((l, i) => (
          <pre key={i} style={{
            margin: 0, fontSize: 12, lineHeight: 1.75,
            whiteSpace: "pre-wrap", wordBreak: "break-word",
            flexShrink: 0,   // ← pre가 줄어들지 않게
            color: l.type === "input" ? "#5DCAA5"
              : l.type === "system" ? "#F09595"
              : "#C5C5C0",
          }}>{l.text}</pre>
        ))}
      </div>

      {/* 입력 — flex-shrink:0 으로 높이 고정 */}
      {booted && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px",
          borderTop: "1px solid #1e1e1e",
          flexShrink: 0,
        }}>
          <span style={{ color: "#5DCAA5", fontSize: 12, flexShrink: 0 }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck={false}
            placeholder="명령어 입력... (help)"
            style={{
              flex: 1, background: "transparent", border: "none",
              color: "#C5C5C0", fontSize: 12, fontFamily: "inherit",
              outline: "none", caretColor: "#5DCAA5",
            }}
          />
        </div>
      )}
    </div>
  );
}
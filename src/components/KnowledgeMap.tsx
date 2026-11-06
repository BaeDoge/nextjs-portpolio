"use client";

// "내 지식 지도": 챗봇이 검색하는 지식 베이스(프로필, 프로젝트, 블로그 글)를 점으로 보여줍니다.
// 챗봇에 질문하면 답변의 근거가 된 점들이 밝아져서, RAG가 어떻게 동작하는지 눈으로 볼 수 있습니다.
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

interface Point {
  id: number;
  x: number;
  y: number;
  c: "profile" | "project" | "blog" | "other";
  t: string;
}

const COLORS: Record<Point["c"], string> = {
  profile: "#7C9CFF",
  project: "#4FE3B5",
  blog: "#FFC857",
  other: "#9AA4B2",
};

const SAMPLE_KO = ["대표 프로젝트가 뭔가요?", "RAG는 어떻게 만들었나요?", "지금 무슨 일을 하고 있나요?", "수상 경력이 궁금해요"];
const SAMPLE_EN = ["What is your flagship project?", "How did you build the RAG pipeline?", "What are you working on now?", "Tell me about your awards"];

export default function KnowledgeMap() {
  const isEn = useLocale() === "en";
  const samples = isEn ? SAMPLE_EN : SAMPLE_KO;

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const highlightRef = useRef<{ ids: Set<number>; at: number } | null>(null);
  const hoverRef = useRef<number>(-1);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [total, setTotal] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number; text: string; c: Point["c"] } | null>(null);
  const [question, setQuestion] = useState("");
  const [sampleIdx, setSampleIdx] = useState(0);
  const [note, setNote] = useState("");

  // 화면에 보일 때 한 번만 불러옵니다.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStatus("loading");
        fetch("/api/kb-map")
          .then((r) => r.json())
          .then((data: { points?: Point[] }) => {
            const pts = data.points ?? [];
            pointsRef.current = pts;
            setTotal(pts.length);
            setStatus(pts.length > 0 ? "ready" : "unavailable");
          })
          .catch(() => setStatus("unavailable"));
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 챗봇이 답변 근거로 쓴 청크를 밝힙니다.
  useEffect(() => {
    const onSources = (e: Event) => {
      const { ids, degraded } = (e as CustomEvent<{ ids: number[]; degraded: boolean }>).detail;
      highlightRef.current = { ids: new Set(ids), at: performance.now() };
      setNote(
        degraded
          ? isEn ? "Answered from my profile (search offline)" : "검색을 쓰지 못해 프로필로 답했어요"
          : isEn ? `${ids.length} chunks used for this answer` : `이 답변에 ${ids.length}개 조각을 사용했어요`,
      );
    };
    window.addEventListener("portfolio:sources", onSources);
    return () => window.removeEventListener("portfolio:sources", onSources);
  }, [isEn]);

  // 입력창 예시 질문 순환
  useEffect(() => {
    const id = setInterval(() => setSampleIdx((i) => (i + 1) % samples.length), 3200);
    return () => clearInterval(id);
  }, [samples.length]);

  // 캔버스 그리기
  useEffect(() => {
    if (status !== "ready") return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const place = (p: Point, now: number, i: number) => {
      const { w, h } = sizeRef.current;
      const pad = 14;
      const drift = reduce ? 0 : 1.6;
      return {
        x: pad + ((p.x + 1) / 2) * (w - pad * 2) + Math.sin(now * 0.0007 + i) * drift,
        y: pad + ((p.y + 1) / 2) * (h - pad * 2 - 18) + Math.cos(now * 0.0006 + i * 1.3) * drift,
      };
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const pts = pointsRef.current;
      const hl = highlightRef.current;
      const age = hl ? (now - hl.at) / 1000 : 0;
      const active = hl && age < 9 ? hl : null;

      const positions = pts.map((p, i) => place(p, now, i));

      // 질문 지점(아래 중앙)에서 근거 조각으로 이어지는 선
      if (active) {
        const fade = Math.max(0, 1 - Math.max(0, age - 6) / 3);
        const ox = w / 2;
        const oy = h - 6;
        ctx.lineWidth = 1;
        pts.forEach((p, i) => {
          if (!active.ids.has(p.id)) return;
          ctx.strokeStyle = `rgba(255,255,255,${0.35 * fade})`;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(positions[i].x, positions[i].y);
          ctx.stroke();
        });
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(ox, oy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      pts.forEach((p, i) => {
        const { x, y } = positions[i];
        const isHot = active?.ids.has(p.id);
        const isHover = hoverRef.current === i;
        const dim = active && !isHot ? 0.25 : 0.8;
        ctx.globalAlpha = isHover ? 1 : dim;
        ctx.fillStyle = COLORS[p.c];
        ctx.beginPath();
        ctx.arc(x, y, isHot ? 4 : isHover ? 3.6 : 2.3, 0, Math.PI * 2);
        ctx.fill();
        if (isHot) {
          const pulse = ((now / 700 + i) % 1);
          ctx.globalAlpha = (1 - pulse) * 0.7;
          ctx.strokeStyle = COLORS[p.c];
          ctx.beginPath();
          ctx.arc(x, y, 4 + pulse * 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best = -1;
      let bestD = 14 * 14;
      const now = performance.now();
      pointsRef.current.forEach((p, i) => {
        const pos = place(p, now, i);
        const d = (pos.x - mx) ** 2 + (pos.y - my) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      });
      hoverRef.current = best;
      setTip(best >= 0 ? { x: mx, y: my, text: pointsRef.current[best].t, c: pointsRef.current[best].c } : null);
    };
    const onLeave = () => { hoverRef.current = -1; setTip(null); };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [status]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    // 챗봇 위젯이 아직 로드되기 전이면 마운트 직후에 이어서 처리하도록 보관
    (window as unknown as { __pendingAsk?: string }).__pendingAsk = text;
    window.dispatchEvent(new CustomEvent("portfolio:ask", { detail: { q: text } }));
    setQuestion("");
  };

  const legend: [Point["c"], string][] = [
    ["profile", isEn ? "Profile" : "프로필"],
    ["project", isEn ? "Projects" : "프로젝트"],
    ["blog", isEn ? "Posts" : "글"],
  ];

  return (
    <div
      ref={wrapRef}
      style={{
        border: "0.5px solid var(--neutral-alpha-medium)",
        borderRadius: 12,
        padding: "10px 12px 12px",
        background: "var(--background-secondary)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, color: "var(--neutral-on-background-weak)" }}>
          {isEn ? "MY KNOWLEDGE, MAPPED" : "내 지식 지도"}
        </span>
        <span style={{ display: "flex", gap: 8, fontSize: 10, color: "var(--neutral-on-background-weak)" }}>
          {legend.map(([c, label]) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <i style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS[c], display: "inline-block" }} />
              {label}
            </span>
          ))}
        </span>
      </div>

      {status === "ready" && (
        <div style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={
              isEn
                ? `Map of ${total} knowledge chunks the chatbot searches`
                : `챗봇이 검색하는 지식 조각 ${total}개의 지도`
            }
            style={{ width: "100%", height: 170, display: "block", cursor: "crosshair" }}
          />
          {tip && (
            <div
              style={{
                position: "absolute",
                left: Math.min(tip.x + 10, 140),
                top: Math.max(tip.y - 46, 0),
                maxWidth: 220,
                padding: "6px 8px",
                borderRadius: 8,
                fontSize: 11,
                lineHeight: 1.4,
                background: "var(--background-overlay, #111)",
                border: `0.5px solid ${COLORS[tip.c]}`,
                color: "var(--neutral-on-background-strong)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {tip.text}
            </div>
          )}
        </div>
      )}
      {status === "loading" && <div style={{ height: 170, display: "grid", placeItems: "center", fontSize: 11, color: "var(--neutral-on-background-weak)" }}>…</div>}

      <div style={{ fontSize: 10, minHeight: 14, color: "var(--neutral-on-background-weak)" }}>
        {note ||
          (status === "ready"
            ? isEn ? `${total} chunks indexed · ask below and watch which ones light up` : `조각 ${total}개 · 아래에서 질문하면 근거가 된 조각이 밝아져요`
            : isEn ? "Ask the AI about my work" : "AI에게 제 이력을 물어보세요")}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); ask(question); }}
        style={{ display: "flex", gap: 6 }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={200}
          aria-label={isEn ? "Ask the AI assistant" : "AI 어시스턴트에게 질문"}
          placeholder={samples[sampleIdx]}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "8px 10px",
            borderRadius: 8,
            fontSize: 12,
            border: "0.5px solid var(--neutral-alpha-medium)",
            background: "var(--background-overlay, transparent)",
            color: "var(--neutral-on-background-strong)",
          }}
        />
        <button
          type="submit"
          disabled={!question.trim()}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            border: "none",
            cursor: question.trim() ? "pointer" : "default",
            opacity: question.trim() ? 1 : 0.5,
            background: "var(--brand-solid-strong, #4f7cff)",
            color: "#fff",
          }}
        >
          {isEn ? "Ask" : "질문"}
        </button>
      </form>
    </div>
  );
}

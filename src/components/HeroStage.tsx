"use client";

// 메인 첫 화면의 인물 카드. 첫 진입 파티클 인트로와 3D 틸트만 유지합니다.
//  - 처음 열리면 사진이 점(파티클)으로 모여들며 완성되고, 자연스럽게 선명한 사진으로 바뀝니다.
//  - 마우스를 따라 사진이 기울고 빛이 번집니다 (3D 틸트).
//  - public/hero/loop.mp4 가 있으면 사진 대신 AI로 만든 루프 영상을 재생합니다 (docs/hero-video.md 참고).
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  videoSrc?: string;
  name: string;
  role: string;
}

type Mode = "intro" | "photo";

export default function HeroStage({ src, videoSrc, name, role }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>("photo");
  const [mode, setModeState] = useState<Mode>("photo");

  const setMode = (m: Mode) => {
    modeRef.current = m;
    setModeState(m);
  };

  // ── 3D 틸트 + 빛 번짐 ──────────────────────────────────────
  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        tilt.style.transform = `rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg)`;
        stage.style.setProperty("--mx", `${px * 100}%`);
        stage.style.setProperty("--my", `${py * 100}%`);
      });
    };
    const onLeave = () => {
      tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // ── 파티클 초상화 ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let disposed = false;
    let introTimer: ReturnType<typeof setTimeout> | undefined;
    let visible = true;

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const start = () => {
      if (disposed) return;
      const w = Math.round(stage.clientWidth);
      const h = Math.round(stage.clientHeight);
      if (w < 10 || h < 10) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 사진을 캔버스 크기에 맞춰(위쪽 기준 cover) 그린 뒤 색을 샘플링합니다.
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      octx.drawImage(img, (w - img.naturalWidth * s) / 2, 0, img.naturalWidth * s, img.naturalHeight * s);
      const pixels = octx.getImageData(0, 0, w, h).data;

      const step = w < 420 ? 5 : 4;
      const hx: number[] = [];
      const hy: number[] = [];
      const col: number[] = [];
      for (let y = 0; y < h - 1; y += step) {
        for (let x = 0; x < w - 1; x += step) {
          const i = (y * w + x) * 4;
          hx.push(x);
          hy.push(y);
          col.push(((255 << 24) | (pixels[i + 2] << 16) | (pixels[i + 1] << 8) | pixels[i]) >>> 0);
        }
      }
      const n = hx.length;
      const px = new Float32Array(n);
      const py = new Float32Array(n);
      const vx = new Float32Array(n);
      const vy = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        // 화면 가장자리 바깥에서 날아오며 시작
        const a = Math.random() * Math.PI * 2;
        const rad = Math.max(w, h) * (0.6 + Math.random() * 0.5);
        px[i] = w / 2 + Math.cos(a) * rad;
        py[i] = h / 2 + Math.sin(a) * rad;
      }

      const frame = new ImageData(w, h);
      const buf = new Uint32Array(frame.data.buffer);
      let t0 = performance.now();

      const loop = (now: number) => {
        if (disposed || modeRef.current === "photo") return;
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;

        const t = (now - t0) / 1000;
        buf.fill(0);
        for (let i = 0; i < n; i++) {
          let ax = (hx[i] - px[i]) * 0.07;
          let ay = (hy[i] - py[i]) * 0.07;
          // 숨 쉬듯 미세하게 일렁임
          ax += Math.sin(t * 1.6 + hx[i] * 0.04) * 0.04;
          ay += Math.cos(t * 1.4 + hy[i] * 0.04) * 0.04;
          vx[i] = (vx[i] + ax) * 0.84;
          vy[i] = (vy[i] + ay) * 0.84;
          px[i] += vx[i];
          py[i] += vy[i];
          const ix = px[i] | 0;
          const iy = py[i] | 0;
          if (ix >= 0 && iy >= 0 && ix < w - 1 && iy < h - 1) {
            const idx = iy * w + ix;
            buf[idx] = col[i];
            buf[idx + 1] = col[i];
            buf[idx + w] = col[i];
            buf[idx + w + 1] = col[i];
          }
        }
        ctx.putImageData(frame, 0, 0);
      };
      raf = requestAnimationFrame(loop);



      // 처음에는 파티클이 모여드는 연출 후 사진으로 전환
      if (!reduce) {
        t0 = performance.now();
        setMode("intro");
        introTimer = setTimeout(() => {
          if (modeRef.current === "intro") setMode("photo");
        }, 2600);
      }

    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (img.complete && img.naturalWidth) start();
    else img.onload = start;

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(introTimer);
      io.disconnect();
    };
  }, [src]);

  const showCanvas = mode === "intro";

  return (
    <div ref={stageRef} className="hero-stage">
      <div ref={tiltRef} className="hero-tilt">
        {/* 사진 / 영상 */}
        <img src={src} alt={name} className="hero-media" />
        {videoSrc && (
          <video
            className="hero-media"
            src={videoSrc}
            poster={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}

        {/* 파티클 캔버스 */}
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          style={{
            opacity: showCanvas ? 1 : 0,
            transition: showCanvas ? "opacity 0.2s ease" : "opacity 0.9s ease",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        <div className="hero-glare" aria-hidden="true" />
        <div className="hero-scan" aria-hidden="true" />

        {/* 이름 오버레이 */}
        <div className="hero-caption">
          <div style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>{name}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{role}</div>
        </div>
      </div>

    </div>
  );
}

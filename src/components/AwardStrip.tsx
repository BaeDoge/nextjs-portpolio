// src/components/AwardStrip.tsx
"use client";
import { useEffect, useRef } from "react";

interface StripItem {
  src: string;
  label: string;
}

interface AwardStripProps {
  title: string;
  items: StripItem[];
  speed?: number;      // px/frame, 기본 0.5
  imageRatio?: string; // CSS aspect-ratio, 기본 "3/4"
}

export default function AwardStrip({
  title,
  items,
  speed = 0.5,
  imageRatio = "3/4",
}: AwardStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // 무한 루프용 두 배 복사
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf: number;
    let paused = false;

    const tick = () => {
      if (!paused) {
        x -= speed;
        const half = track.scrollWidth / 2;
        if (Math.abs(x) >= half) x = 0;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // 호버 시 일시정지
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  return (
    <div style={{ width: "100%", marginTop: "3rem", paddingBottom: "2rem" }}>
      {/* 구분선 + 타이틀 */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: 14, marginBottom: 16,
      }}>
        <div style={{
          flex: 1, height: "0.5px",
          background: "var(--neutral-alpha-weak)",
        }} />
        <span style={{
          fontSize: 11,
          color: "var(--neutral-on-background-weak)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          {title}
        </span>
        <div style={{
          flex: 1, height: "0.5px",
          background: "var(--neutral-alpha-weak)",
        }} />
      </div>

      {/* 스크롤 트랙 */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 10,
            width: "max-content",
            willChange: "transform",
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 120,
                borderRadius: 8,
                overflow: "hidden",
                border: "0.5px solid var(--neutral-alpha-medium)",
                background: "var(--background-overlay)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
              onClick={() => window.open(item.src, "_blank")}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: imageRatio,
                  objectFit: "cover",
                  display: "block",
                }}
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const placeholder = el.nextSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              {/* 이미지 없을 때 플레이스홀더 */}
              <div style={{
                display: "none",
                width: "100%",
                aspectRatio: imageRatio,
                alignItems: "center",
                justifyContent: "center",
                background: "var(--neutral-alpha-weak)",
                fontSize: 20,
              }}>
                📄
              </div>
              <div style={{
                padding: "6px 8px",
                fontSize: 10,
                color: "var(--neutral-on-background-weak)",
                lineHeight: 1.4,
                textAlign: "center",
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
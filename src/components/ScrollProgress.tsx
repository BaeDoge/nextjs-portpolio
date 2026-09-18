"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${pct}%`,
        background: "var(--brand-solid-strong)",
        zIndex: 9999,
        transition: "width 0.05s linear",
        pointerEvents: "none",
      }}
    />
  );
}
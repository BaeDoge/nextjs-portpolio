// src/components/ScrollReveal.tsx
// page.tsx에서 "use client" 없이 서버 컴포넌트와 혼용 가능하도록
// 클라이언트 경계를 여기서만 선언
"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "fade";
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: Props) {
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

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible
        ? "translateY(0)"
        : direction === "up" ? "translateY(28px)" : "translateY(0)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
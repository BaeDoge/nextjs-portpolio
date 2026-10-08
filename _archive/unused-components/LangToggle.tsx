"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LangToggle() {
  const router = useRouter();
  const path = usePathname();
  const isKo = path.startsWith("/ko");

  const toggle = () => {
    const newPath = isKo ? path.replace("/ko", "/en") : path.replace("/en", "/ko");
    router.push(newPath);
  };

  return (
    <button onClick={toggle} style={{
      padding: "4px 12px", borderRadius: 20,
      border: "1px solid var(--neutral-alpha-medium)",
      background: "transparent", fontSize: 13,
      cursor: "pointer", color: "var(--neutral-on-background-strong)",
    }}>
      {isKo ? "🇺🇸 English" : "🇰🇷 한국어"}
    </button>
  );
}

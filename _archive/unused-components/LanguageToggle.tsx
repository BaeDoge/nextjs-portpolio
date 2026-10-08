"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname)
  const isKo = !pathname.startsWith("/en") || pathname.startsWith("/ko");

  const toggle = () => {
    if (isKo) {
      router.push(pathname.replace(/^\/ko/, "/en") || "/en" + pathname);
    } else {
      router.push(pathname.replace(/^\/en/, "/ko") || "/ko" + pathname);
    }
  };

  return (
    <button
      onClick={toggle}
      style={{
        padding: "4px 12px",
        borderRadius: 20,
        border: "0.5px solid var(--neutral-alpha-medium)",
        background: "transparent",
        fontSize: 12,
        cursor: "pointer",
        color: "var(--neutral-on-background-weak)",
        fontFamily: "inherit",
      }}
    >
      {isKo ? "EN" : "KO"}
    </button>
  );
}
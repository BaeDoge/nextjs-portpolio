"use client";

// src/components/LocaleSwitcher.tsx
// 예전 LanguageToggle.tsx / LangToggle.tsx는 [locale] 라우팅이 없던 시절
// 만들어진 죽은 스텁이라 _archive로 옮겼고, 이게 실제로 동작하는 대체품입니다.
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- next-intl의 타입이 동적 pathname과는 완벽히 안 맞을 수 있음
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-current={loc === locale}
          style={{
            fontSize: 12,
            fontWeight: loc === locale ? 600 : 400,
            padding: "4px 8px",
            borderRadius: 6,
            border: "none",
            background: loc === locale ? "var(--neutral-alpha-medium)" : "transparent",
            color:
              loc === locale
                ? "var(--neutral-on-background-strong)"
                : "var(--neutral-on-background-weak)",
            cursor: loc === locale ? "default" : "pointer",
          }}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

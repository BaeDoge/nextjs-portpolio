// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 앞으로 헤더/푸터 등에서 next/link 대신 이걸 써야
// 언어 전환 시 접두어(/en)가 자동으로 붙고 유지돼요.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

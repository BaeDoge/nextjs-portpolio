// src/proxy.ts
// Next 16부터 middleware.ts가 proxy.ts로 이름이 바뀌었어요. (기능은 동일)
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // api, _next, favicon 등 정적/내부 경로는 제외하고 나머지 페이지 경로만 처리
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

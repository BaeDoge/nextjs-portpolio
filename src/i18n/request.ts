// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // UI 크롬(네비, 버튼, 라벨) 문구만 여기서 관리.
    // 페이지 본문 콘텐츠(About/Work/Blog/Gallery)는
    // src/resources/content/*.ts 쪽 포맷을 따로 씁니다.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

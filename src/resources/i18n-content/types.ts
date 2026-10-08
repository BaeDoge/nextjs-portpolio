// src/resources/content/types.ts
//
// 페이지별 번역 포맷의 공통 타입.
// content.tsx의 실제 Once UI 타입(JSX 포함)과는 별개로,
// "번역만 하면 되는" 순수 텍스트 형태로 단순화했습니다.
// 나중에 [locale] 라우팅을 실제로 붙일 때, 이 값들을 content.tsx의
// Home/About/... 타입으로 조립하는 얇은 매핑 레이어만 추가하면 됩니다.

export type Locale = "ko" | "en";

// 언어별로 같은 모양(T)의 값을 갖는 딕셔너리
export type Dictionary<T> = Record<Locale, T>;

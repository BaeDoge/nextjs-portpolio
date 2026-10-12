// 페이지별 ko/en 텍스트에 공통으로 쓰는 타입.

export type Locale = "ko" | "en";

// 언어별로 같은 모양(T)의 값을 갖는 딕셔너리
export type Dictionary<T> = Record<Locale, T>;

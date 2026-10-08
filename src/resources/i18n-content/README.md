# 번역 포맷 (페이지별 ko/en 콘텐츠)

지난 번 대화에서 나온 질문에 대한 답: **맞습니다.** 영어 번역을 붙이려면
결국 페이지별로 콘텐츠가 두 벌(ko/en) 있어야 하고, URL도
`/about`(한국어) vs `/en/about`(영어)처럼 나뉘는 구조가 필요해요.
(`next-intl` 기준으로는 `src/app/[locale]/about/page.tsx` 형태.)

이 폴더의 라우팅은 이제 실제로 연결돼 있어요 (`next-intl` + `[locale]` 세그먼트).
`home.ts`는 홈페이지에 실제로 연결해서 `/`(한국어)와 `/en`(영어) 둘 다 이 텍스트를
그대로 보여줘요 — 나머지(`about.ts`, `work.ts`, `blog.ts`, `gallery.ts`)는
아직 채워지지 않았거나 실제 페이지 컴포넌트에 연결되지 않은 상태입니다.
채워 넣고 나서 `about/page.tsx`처럼 `getAboutText(locale)`를 불러다 쓰면 됩니다
(홈페이지의 `src/app/[locale]/page.tsx`가 참고할 실제 예시예요).

## 구조

```
src/resources/i18n-content/
├── types.ts     ← Dictionary<T> = { ko: T; en: T } 공통 타입
├── home.ts      ← ✅ 예시로 끝까지 채워둠 (이 형식 그대로 복사해서 쓰면 됨)
├── about.ts     ← 뼈대만 있음, 본문/경력/수상/논문은 TODO
├── work.ts      ← 완료 (원본이 이미 한/영 구분 없이 영어였음)
├── blog.ts      ← 완료
├── gallery.ts   ← 완료
└── index.ts     ← getHomeText(locale) 같은 헬퍼 re-export
```

## 채우는 방법

1. `home.ts`를 열어서 패턴 확인
   (`homeText.ko`, `homeText.en` 두 객체가 같은 모양).
2. `about.ts`를 열고, `src/resources/content.tsx`의 `about` 객체를
   보면서 `TODO`라고 써둔 자리를 채웁니다.
   - 줄바꿈이 필요하면 `string[]`로 (예: `home.ts`의 `headline` 참고),
     아니면 그냥 `string`.
   - `content.tsx`에는 이미 일부 항목(work experience의 achievements)에
     `<span style={{fontSize:"0.88em"}}>영어 요약</span>` 형태로 러프한
     영어가 섞여 있는 곳도 있어요 — 그걸 `en` 쪽에 그대로 옮기면 시작은
     수월할 거예요.
3. 다 채워졌다고 사이트에 바로 반영되진 않습니다 — 아래 "다음 단계"를
   진행해야 실제로 `/en/...` 라우팅이 살아납니다.

## MDX 콘텐츠 (블로그 포스트 / 프로젝트 상세)는 별도

`src/app/blog/posts/*.mdx`, `src/app/work/projects/*.mdx`는 이 포맷
대상이 아니에요. 이런 긴 글은 개별 파일을 통째로 나누는 방식을 권장합니다:

```
ai-agent-automation.mdx      →  ai-agent-automation.ko.mdx
                                 ai-agent-automation.en.mdx
```
그리고 로더 쪽에서 locale에 맞는 파일을 읽도록 한 줄만 바꾸면 됩니다.
전량 번역은 부담이 크니, 처음엔 대표 포스트 몇 개만 영어 버전을
만들고 나머지는 "이 글은 한국어로만 제공됩니다" 배너로 두는 것도
현실적인 선택이에요.

## 지금 상태 / 남은 일

이미 된 것:
- `next-intl` 설치, `src/i18n/routing.ts` · `navigation.ts` · `request.ts` · `src/proxy.ts` 구성 완료
- `src/app/*` → `src/app/[locale]/*` 이동 완료 (`api/`, `robots.ts`, `sitemap.ts`, `favicon.ico`는 그대로 루트에 유지)
- 헤더의 `LocaleSwitcher`(KO/EN 버튼)로 실제 언어 전환 가능
- 홈페이지(`/`, `/en`)만 `home.ts` 기준으로 완전히 번역돼서 보여요

아직 안 된 것 (직접 채워야 하는 부분):
1. `about.ts` / `work.ts` / `blog.ts` / `gallery.ts`의 `TODO` 채우기
2. 채운 다음, 각 `page.tsx`에서 `getAboutText(locale)`처럼 불러다가
   `home.ts`가 페이지에 연결된 방식(`src/app/[locale]/page.tsx` 참고)과
   똑같이 연결하기
3. Once UI의 `ToggleButton`/`SmartLink`/`Card`는 내부적으로 `next/link`를
   직접 써서 `/en` 접두어가 자동으로 안 붙어요 — 새로 페이지 내부 링크를
   추가할 때는 `Header.tsx`의 `withLocale()`이나 `Post.tsx`의 `useLocale()`
   패턴을 그대로 따라 하면 됩니다.

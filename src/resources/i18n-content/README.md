# i18n-content

페이지별 한국어/영어 텍스트를 `{ ko, en }` 형태로 모아둔 폴더입니다.

| 파일 | 상태 |
| --- | --- |
| `home.ts` | 홈 화면에서 사용 중 |
| `work.ts`, `blog.ts`, `gallery.ts` | 목록 페이지의 제목·설명 (페이지 연결은 `content.tsx` 기준) |
| `about.ts` | 미사용 (About은 `content.tsx` / `content.en.tsx` 사용) |
| `types.ts`, `index.ts` | 공통 타입과 로케일별 조회 헬퍼 |

## 다국어 구조

- 라우팅은 `next-intl`의 `[locale]` 세그먼트를 사용합니다. 한국어는 접두어 없이(`/about`), 영어는 `/en/about` 입니다.
- 블로그와 프로젝트 본문은 `.mdx` 파일 단위로 나뉩니다. 영어판은 같은 이름의 파일을 `en/` 폴더에 두며, 없으면 한국어 글이 표시됩니다.
  - `src/app/[locale]/blog/posts/en/*.mdx`
  - `src/app/[locale]/work/projects/en/*.mdx`
- 내부 링크는 `Header.tsx`의 `withLocale()` 또는 `useLocale()` 패턴을 따라 로케일 접두어를 붙입니다.

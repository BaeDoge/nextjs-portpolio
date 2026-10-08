# 미사용 코드 보관함

빌드에서 완전히 빠져있고 어디서도 import되지 않는 코드들을 삭제하지 않고
여기로만 옮겨뒀습니다. 필요하면 다시 꺼내 쓰시면 되고, 정말 필요 없다고
확인되면 이 폴더째로 지우면 됩니다.

| 파일 | 왜 옮겼나 |
|---|---|
| `MiniTerminal.tsx` | 메인 페이지 히어로 영역에서 `HighlightPanel.tsx`(GitHub 실시간 위젯)로 교체됨 |
| `app-terminal/page.tsx` (원래 `src/app/terminal/page.tsx`) | 미니터미널을 확장한 풀페이지 버전. `once-ui.config.ts`에서 이미 `"/terminal": false`로 라우트 자체가 막혀있던 죽은 페이지 |
| `LanguageToggle.tsx` | `/ko`, `/en` 경로로 이동을 시도하지만 실제 `[locale]` 라우팅이 없어 동작하지 않던 스텁. `Header.tsx`에서도 이미 주석 처리돼 호출되지 않고 있었음 |
| `LangToggle.tsx` | `LanguageToggle.tsx`와 완전히 같은 목적의 중복 스텁. 어디서도 import되지 않음 |
| `AnimatedSection.tsx` | 어디서도 import되지 않는 컴포넌트 |
| `ScrollReveal.tsx` | 어디서도 import되지 않는 컴포넌트 |

언어 전환 기능은 나중에 `next-intl` 기반으로 다시 만들 예정이라
`src/resources/content/README.md`에 이어지는 작업 계획을 정리해뒀습니다.

# 포트폴리오 변경 요약

적용: 저장소 루트에서 `bash apply.sh <이 폴더 경로>` (zip 풀기, 원본 PNG 삭제, `npm ci`, 타입 검사)

## 통일 / 수정
- 주소는 `https://nextjs-portpolio.vercel.app`, 이메일은 `qold0blop@gmail.com`으로 통일했습니다. 이메일은 `src/resources/contact.ts` 한 곳에서 관리합니다.
- `college-life` 부제를 "어떤 환경에서도 금방 적응하는 승호"로 바꾸고(한/영), 표의 `+5` 빈 행을 삭제했습니다. "졸업한 지 5년이 다 되어간다"는 3년이 넘었다로 고쳤습니다.
- `how-this-portfolio-works`의 Next.js 14는 16으로 고쳤습니다(한/영).
- 프로젝트 mdx의 `Lessson & Learned`, `Learened` 오타를 `Lesson & Learned`로 고쳤습니다.

## 번역
- 블로그 영어판 34개 전체를 한글판 기준으로 맞췄습니다: 기존 영어판 25개는 한글 원문으로 다시 번역해 교체했고(날짜·태그·헤딩·코드블록 구조 일치 확인), 9개는 새로 추가했습니다. 제목의 `[AI]` 같은 접두어는 영어판에서 뺐습니다.
- 프로젝트 영어판 9개 추가: `work/projects/en/`. Work 목록과 상세 페이지가 영어 모드에서 `en/` 파일을 읽도록 코드를 연결했습니다.

## 챗봇
- `/api/chat`: 단계별 오류 처리, system 역할 주입 차단, 입력 길이 제한, 호출 제한, Vercel용 모델 캐시 경로(/tmp)
- 위젯: 오류·시간 초과 안내 문구, SSE 청크 경계 처리, 접근성(aria-label, Esc 닫기, 포커스), 지연 로딩
- `/api/health`(`?deep=1` 포함), `/api/cron/keepalive` 확장: Supabase, 지식 베이스 검색, Groq 키 점검
- `kb/`: `migrate.sql`, `ingest.mjs`, `profile.ko.md`, `profile.en.md`. 기존 `portfolio_chunks` 테이블과 `match_chunks` 함수를 그대로 쓰고, 동기화용 컬럼(`source`, `locale`, `content_hash`)만 추가합니다. 예전 데이터는 `--replace-legacy`로 1회 교체하며, 백업 테이블을 먼저 만듭니다.
- Actions: `supabase-keepalive.yml`(실패 시 이슈 생성, 60일 비활성화 방지), `kb-sync.yml`(콘텐츠 변경 시와 주 1회 갱신, 수동 실행 때 `replace_legacy` 선택 가능)

## SEO / 접근성 / 성능
- canonical, hreflang, og:url, og:locale (모든 페이지와 글/프로젝트 상세)
- sitemap에 hreflang 추가, 정적 페이지 수정일은 최신 콘텐츠 날짜 사용
- Person JSON-LD 추가, 사이트 발행자 스키마를 KB국민은행에서 본인으로 변경
- 이미지 alt 개선, 챗 버튼 접근성
- `public/` 42MB에서 18MB로 축소: 2000px 상한, JPEG 재압축, 사진성 PNG 23개를 JPG로 변환(참조 모두 갱신, 깨진 참조 0), mp4 1.0MB에서 0.2MB로 재인코딩

## 수상 정보 통일
- SK AI Challenge와 해양경찰청 공모전을 모두 우수상으로 통일했습니다(프로젝트 글 한/영, college-life 표 한/영, 챗봇 프로필).

## 정리
- 주석 처리된 코드 제거(약 300줄), `ChatWidget` 하단의 옛 코드 블록, 임시 TODO 주석
- 의존성을 현재 잠금 버전으로 고정(`@once-ui-system/core`는 `latest`에서 1.8.4), 패키지 이름은 `seungho-portfolio`
- 템플릿 문구: 푸터 "Built with Once UI", `i18n-content/README.md`(대화 내용이 남아 있던 문서)와 파일 머리말을 설명문으로 교체, 뉴스레터 템플릿 폼(Mailchimp 자리표시 URL) 비활성화
- `BlogFooterWidget`의 연락 링크가 주석 처리되어 있어 복구했습니다.

## 화면에 보이는 문구가 바뀐 곳
- college-life 부제 / 졸업 연수 / 표(한·영)
- 챗봇 오류 안내 문구 (신규, 한/영). 환영 문구와 빠른 질문은 기존 그대로입니다.
- 푸터: "Build your portfolio with" → "Built with"
- 블로그 하단 "연락하기" 카드에 이메일 링크 복구

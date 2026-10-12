# 챗봇 지식 베이스

챗봇(`/api/chat`)이 검색하는 데이터(Supabase `portfolio_chunks` 테이블, `match_chunks` 함수)를 관리합니다.

| 파일 | 설명 |
| --- | --- |
| `migrate.sql` | 백업, 동기화용 컬럼(`source`, `locale`, `content_hash`) 추가, 확인용 조회 |
| `profile.ko.md`, `profile.en.md` | 이력·기술·수상 등 프로필 원문 (내용이 바뀌면 여기를 수정) |
| `ingest.mjs` | 프로필, 블로그, 프로젝트 글을 청크로 나눠 임베딩하고 Supabase에 반영 |

`category`는 `profile`, `blog`, `project` 중 하나로 저장됩니다.

## 최초 설정

1. Supabase SQL Editor에서 `migrate.sql`을 순서대로 실행하고, 확인용 조회 결과를 점검합니다 (임베딩 차원 384, `id` 기본값).
2. `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`를 설정합니다.
3. 적재를 실행합니다. 최초 1회는 예전 데이터를 지우는 `--replace-legacy`를 붙입니다.

```bash
node kb/ingest.mjs --dry                                   # 청크만 확인
node --env-file=.env.local kb/ingest.mjs --replace-legacy  # 최초 1회
node --env-file=.env.local kb/ingest.mjs                   # 이후
```

## 자동 갱신

`.github/workflows/kb-sync.yml`이 블로그, 프로젝트, `kb/` 변경 시와 매주 일요일에 `ingest.mjs`를 실행합니다.
저장소 Secrets에 `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`가 필요합니다.
Actions 탭에서 수동 실행할 때 `replace_legacy`를 선택하면 `--replace-legacy`로 실행됩니다.

## 상태 점검

`/api/health`는 Supabase, 지식 베이스 검색, Groq 키를 확인하고, `/api/health?deep=1`은 임베딩 모델 로드까지 확인합니다.
`CRON_SECRET`이 설정돼 있으면 `Authorization: Bearer <값>` 헤더가 필요합니다.

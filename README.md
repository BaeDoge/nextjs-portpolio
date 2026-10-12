# 배승호 포트폴리오

KB국민은행 AI Platform Engineer 배승호의 경력사항, 프로젝트, 기술 스택을 정리한 포트폴리오입니다.

- 사이트: https://nextjs-portpolio.vercel.app
- LinkedIn: https://www.linkedin.com/in/seung-ho-bae-7392b7282/

## 구성

| 메뉴 | 내용 |
| --- | --- |
| About | 경력, 학력, 기술 스택, 논문 |
| Work | 수행한 프로젝트와 역할 |
| Blog | 업무와 학습 중 정리한 기술 글 (한국어/영어) |
| Gallery | 수상 내역과 타임라인 |
| Chat | 이력과 프로젝트를 바탕으로 답하는 RAG 챗봇 |

## 기술 스택

- Next.js 16 (App Router), React 19, TypeScript
- Once UI, next-intl (ko / en)
- Groq (Llama 3.3 70B), Supabase (Postgres, pgvector)
- Vercel

## 실행

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

## 운영 메모

- 챗봇 지식 베이스는 `kb/`에서 관리합니다. 블로그, 프로젝트, `kb/profile.*.md`가 바뀌면 GitHub Actions(`kb-sync`)가 Supabase에 다시 반영합니다. 자세한 내용은 [kb/README.md](./kb/README.md)를 참고하세요.
- Supabase 무료 플랜의 일시정지를 막고 챗봇이 동작하는지 확인하기 위해, Vercel Cron(`/api/cron/keepalive`)과 GitHub Actions(`Keepalive`)가 매일 한 번 점검합니다. 상태는 `/api/health`에서 볼 수 있습니다.

## 라이선스

[Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) 템플릿을 기반으로 하며, CC BY-NC 4.0을 따릅니다. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

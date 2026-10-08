# Seung Ho Bae — Portfolio

KB국민은행에서 AI Platform Engineer로 일하고 있는 배승호의 개인 포트폴리오입니다.

정적인 자기소개 페이지보다는 실제로 동작하는 걸 보여주고 싶어서, 방문자가 저에 대해 직접 물어볼 수 있는 AI 챗봇을 붙였고 그동안 겪은 트러블슈팅이나 프로젝트 경험을 블로그로 정리해두었습니다.

## 사이트

[portpolio-bae-seungho.vercel.app](https://portpolio-bae-seungho.vercel.app)

## 구성

- **소개 / 경력** — 이력과 진행한 프로젝트
- **AI 챗봇** — 제 이력·프로젝트 내용을 기반으로 질문에 답하는 RAG 챗봇 (우측 하단 💬 버튼)
- **블로그** — 트러블슈팅, AI/GenAI, 인프라 관련 글 34편, 한/영 지원
- **갤러리** — 수상 내역, 타임라인

어떻게 만들었는지는 블로그에 따로 정리해두었습니다 → [이 포트폴리오를 어떻게 만들었나요?](https://portpolio-bae-seungho.vercel.app/blog/how-this-portfolio-works)

## 기술 스택

- **프레임워크**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: Once UI ([Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) 기반)
- **AI**: Groq API (Llama 3.3 70B), Supabase pgvector 기반 RAG
- **DB**: Supabase (Postgres)
- **다국어**: next-intl
- **배포**: Vercel

API 비용 없이 운영하는 게 목표라, LLM은 무료 티어인 Groq을, DB는 Supabase 무료 플랜을 쓰고 있습니다. 대신 Supabase는 7일간 쿼리가 없으면 잠들어서, Vercel Cron과 GitHub Actions로 매일 한 번씩 깨워주고 있습니다.

## 라이선스

[Magic Portfolio](https://github.com/once-ui-system/magic-portfolio)를 기반으로 시작해서 AI 챗봇, GitHub 연동, 블로그 자동화, 어드민 대시보드 등을 추가로 만들었습니다. CC BY-NC 4.0을 따릅니다 — 자세한 내용은 [LICENSE](./LICENSE) 참고해주세요.

## 연락처

- GitHub: [@BaeDoge](https://github.com/BaeDoge)
- 이메일이나 그 외 연락은 사이트 내 문의 폼을 이용해주세요.

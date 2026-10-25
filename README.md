# 배승호 | AI Platform Engineer

AI 기능을 실제 서비스에 연결하고 운영하는 엔지니어입니다. 금융 상담 서비스, 생성형 AI 챗봇, 데이터 처리 파이프라인과 클라우드 기반 애플리케이션 개발 경험을 정리한 개인 포트폴리오입니다.

- **Portfolio:** https://baeseungho.vercel.app/
- **GitHub:** https://github.com/BaeDoge
- **LinkedIn:** https://www.linkedin.com/in/seung-ho-bae-7392b7282/

## 주요 기능

| 영역 | 설명 |
| --- | --- |
| About | 경력, 학력, 기술 스택 및 연구 경험 |
| Work | 프로젝트별 목표, 담당 역할과 구현 내용 |
| Blog | 개발 과정에서 정리한 기술 문서 |
| Gallery | 수상 내역과 주요 이력 |
| Chat | 포트폴리오 정보를 검색해 답변하는 RAG 기반 챗봇 |

## 기술 구성

- **Frontend:** Next.js 16 App Router, React 19, TypeScript
- **UI / i18n:** Once UI, next-intl (한국어/영어)
- **RAG:** Groq API (Llama 3.3 70B), Supabase Postgres, pgvector
- **Deployment:** Vercel
- **Knowledge-base sync:** GitHub Actions

## RAG 챗봇 지식 베이스

챗봇이 참고하는 프로필과 프로젝트 지식은 `kb/`에서 관리합니다. 관련 콘텐츠가 변경되면 GitHub Actions의 `kb-sync` 워크플로를 통해 Supabase 지식 베이스를 갱신하도록 구성했습니다.

서비스 상태 확인용 `/api/health` 엔드포인트와 예약 실행 기반 keepalive 점검도 포함합니다.

## 로컬 실행

Node.js와 npm이 필요합니다.

```bash
npm install
```

환경 변수 예시 파일을 복사하고 필요한 값을 설정합니다.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

그다음 개발 서버를 실행합니다.

```bash
npm run dev
```

## 라이선스

이 프로젝트는 [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) 템플릿을 기반으로 합니다. 원본 템플릿 및 프로젝트의 라이선스 조건은 저장소의 `LICENSE` 파일을 확인하세요.

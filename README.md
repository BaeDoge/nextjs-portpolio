<div align="center">

# 👋 Seung Ho Bae — Portfolio

### AI Platform Engineer, building generative AI services at scale
### 대규모 사용자를 위한 생성형 AI 서비스를 만드는 AI Platform Engineer

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portpolio-bae-seungho.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey?style=for-the-badge)](./LICENSE)

<sub>🇰🇷 한국어 / 🇺🇸 English — this README is bilingual. / 이 문서는 한국어와 영어를 함께 사용합니다.</sub>

</div>

<br/>

<div align="center">
  <img src="public/images/og/home.jpg" alt="Portfolio preview" width="820"/>
  <br/>
  <sub>메인 페이지 미리보기 · Home page preview</sub>
</div>

<br/>

## 📑 Table of Contents · 목차

<details>
<summary>Click to expand · 펼쳐보기</summary>

- [Overview · 소개](#-overview--소개)
- [Features · 주요 기능](#-features--주요-기능)
- [Tech Stack · 기술 스택](#-tech-stack--기술-스택)
- [Getting Started · 시작하기](#-getting-started--시작하기)
- [Environment Variables · 환경 변수](#-environment-variables--환경-변수)
- [Project Structure · 프로젝트 구조](#-project-structure--프로젝트-구조)
- [Internationalization (i18n) · 다국어 지원](#-internationalization-i18n--다국어-지원)
- [Keeping Things Alive · 자동화 (Cron)](#-keeping-things-alive--자동화-cron)
- [Deployment · 배포](#-deployment--배포)
- [Credits & License · 크레딧과 라이선스](#-credits--license--크레딧과-라이선스)
- [Contact · 연락처](#-contact--연락처)

</details>

<br/>

## 🧭 Overview · 소개

A personal portfolio and technical blog, built to be more than a static page — it's a small
full-stack product with a live GitHub-driven hero panel, a RAG-powered AI chat assistant that
answers questions about my work, a bilingual (KO/EN) content system, and a self-sustaining
Supabase backend that never falls asleep.

정적인 자기소개 페이지가 아니라, 실제로 동작하는 작은 풀스택 프로덕트를 지향하며 만든
포트폴리오·기술 블로그입니다. GitHub 활동을 실시간으로 보여주는 히어로 패널, 제 이력을
바탕으로 답하는 RAG 기반 AI 챗봇, 한국어·영어 이중 언어 지원, 그리고 스스로 깨어있는
Supabase 백엔드까지 포함하고 있습니다.

> 💡 **Reusing this README?** Everything below the [Overview](#-overview--소개) section is
> written to be copy-paste-friendly for your next repo — swap the content, keep the shape.
> 이 README를 다른 레포에도 재사용하려면, [소개](#-overview--소개) 아래 섹션들의 뼈대는
> 그대로 두고 내용만 바꿔 넣으면 됩니다.

<br/>

## ✨ Features · 주요 기능

| | |
|---|---|
| 🤖 **AI Chat Assistant** | RAG-based chatbot (Groq + Supabase pgvector) that answers visitor questions in the visitor's language |
| 🌍 **Full i18n** | Every page, including the AI chatbot's responses, switches between Korean and English via `next-intl` |
| 📊 **Live GitHub Panel** | Hero section pulls real repository data from the GitHub API at request time — no static screenshots |
| ✍️ **34+ Blog Posts** | MDX-based blog covering troubleshooting, GenAI engineering, and dev tooling, tagged and filterable |
| 🖼️ **Gallery & Timeline** | Interactive vertical/matrix timeline and a photo gallery with awards & certificates |
| 🔐 **Admin Dashboard** | Session/visitor analytics dashboard, password-protected |
| ♻️ **Self-keeping-alive** | Vercel Cron + GitHub Actions ping Supabase daily so the free tier never sleeps |
| 🔍 **SEO-ready** | Dynamic OG image generation, structured data (Schema.org), sitemap & robots per locale |

<sub>
🇰🇷 AI 챗봇(RAG) · 완전한 한/영 다국어 지원 · 실시간 GitHub 연동 히어로 · 34편 이상의 기술 블로그 ·
인터랙티브 타임라인 & 갤러리 · 방문자 분석 어드민 대시보드 · Supabase 슬립 방지 자동화 · SEO 최적화
</sub>

<br/>

## 🛠 Tech Stack · 기술 스택

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![next-intl](https://img.shields.io/badge/next--intl-i18n-blue?style=flat-square)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI Kit | [Once UI](https://once-ui.com) (Magic Portfolio base) |
| Language | TypeScript, React 19 |
| Content | MDX (`gray-matter`, `next-mdx-remote`) |
| Database | Supabase (Postgres + pgvector) |
| LLM | Groq API |
| i18n | `next-intl` |
| Hosting | Vercel |
| Automation | Vercel Cron + GitHub Actions |

<br/>

## 🚀 Getting Started · 시작하기

**1. Clone the repository**
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
# then fill in the values — see the table below
```

**4. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**5. Edit your content**
```
src/resources/content.tsx       # Korean content (default)
src/resources/content.en.tsx    # English content overrides
src/resources/once-ui.config.ts # theme, fonts, layout
```

<br/>

## 🔑 Environment Variables · 환경 변수

| Variable | Required | Description |
|---|:---:|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key (client-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-only, **never expose client-side**) |
| `GROQ_API_KEY` | ✅ | For the RAG chat assistant |
| `PAGE_ACCESS_PASSWORD` | ✅ | Gate for `/admin` (visitor analytics dashboard) |
| `RESEND_API_KEY` | ⭕ | Contact form / newsletter email delivery |
| `CRON_SECRET` | ⭕ | Auto-provisioned by Vercel when you enable Cron Jobs — see below |

<br/>

## 🗂 Project Structure · 프로젝트 구조

<details>
<summary>Click to expand · 펼쳐보기</summary>

```
src/
├── app/
│   ├── [locale]/            # 로케일별 페이지 (ko 기본, en 접두어 /en)
│   │   ├── page.tsx          # Home
│   │   ├── about/            # About / CV
│   │   ├── work/             # Projects
│   │   ├── blog/             # MDX blog (+ /en 하위 폴더에 영어판)
│   │   ├── gallery/          # Photos, awards, certificates
│   │   └── admin/            # Visitor analytics (password protected)
│   └── api/                  # Route Handlers (chat, cron, pageview, …)
├── components/                # UI components
├── i18n/                      # next-intl routing / navigation config
├── resources/
│   ├── content.tsx            # 한국어 콘텐츠 (기본)
│   ├── content.en.tsx         # 영어 콘텐츠 오버라이드
│   ├── i18n-content/          # 페이지별 번역 포맷
│   └── once-ui.config.ts      # 테마, 폰트, 레이아웃 설정
└── utils/                      # MDX 로더, 날짜 포맷 등
```

</details>

<br/>

## 🌍 Internationalization (i18n) · 다국어 지원

Built with [`next-intl`](https://next-intl.dev). Korean is the default locale
(unprefixed URLs, e.g. `/about`); English lives under `/en` (e.g. `/en/about`).

한국어가 기본 로케일(URL 접두어 없음, 예: `/about`)이고, 영어는 `/en` 접두어를 씁니다
(예: `/en/about`).

- Structural page content → `src/resources/content.en.tsx`
- Long-form content (blog posts) → a parallel `en/` folder next to the Korean `.mdx` files,
  falling back to the Korean version automatically if no translation exists yet
- The AI chat assistant also detects the active locale and answers in that language

```
src/app/[locale]/blog/posts/
├── my-post.mdx           # 한국어 (기본)
└── en/
    └── my-post.mdx       # English (optional — falls back to Korean if missing)
```

<br/>

## ♻️ Keeping Things Alive · 자동화 (Cron)

Supabase's free tier pauses a project after 7 days without a query. This repo pings it
daily through **two independent mechanisms**, so the site's dynamic features (chat history,
page views, guestbook) never quietly break.

Supabase 무료 티어는 7일간 쿼리가 없으면 프로젝트가 일시정지됩니다. 이 레포는
**서로 독립적인 두 가지 방법**으로 매일 핑을 보내서, 앱이 죽어도 최소한 하나는
살아있도록 이중화했습니다.

### 1. Vercel Cron → in-app route

`vercel.json` schedules a daily hit to `/api/cron/keepalive`:

```jsonc
// vercel.json
{
  "crons": [{ "path": "/api/cron/keepalive", "schedule": "0 3 * * *" }]
}
```

**Setup:**
1. Push this repo to GitHub and [import it into Vercel](https://vercel.com/new).
2. In **Project Settings → Environment Variables**, add
   `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Deploy to production — Vercel reads `vercel.json` automatically and registers the
   schedule under **Project Settings → Cron Jobs**. No extra toggle needed.
4. Vercel auto-provisions a `CRON_SECRET` for the project once a cron is registered
   (visible under Environment Variables). The route already checks it:
   ```ts
   // src/app/api/cron/keepalive/route.ts
   if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
     return new Response("Unauthorized", { status: 401 });
   }
   ```
5. Verify: **Project → Cron Jobs → View Logs**, or trigger manually with
   `curl -H "Authorization: Bearer <CRON_SECRET>" https://<your-domain>/api/cron/keepalive`.

> ⚠️ On the Hobby plan, crons run **once a day**, within a loose time window (not exact
> to the minute) — that's fine here, we only need "at least once a day."
> Hobby 플랜은 하루 1회, 정확한 시각이 아닌 느슨한 시간대에 실행돼요 — "하루 최소 1회"면
> 충분하므로 문제 없습니다.

### 2. GitHub Actions → direct Supabase ping (backup, bypasses the app entirely)

```yaml
# .github/workflows/supabase-keepalive.yml
on:
  schedule:
    - cron: "0 15 * * *"   # UTC 15:00 = KST 00:00
  workflow_dispatch: {}
```

**Setup:**
1. In your GitHub repo: **Settings → Secrets and variables → Actions → New repository
   secret**. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (the **anon** key — never the
   service role key here, since it's a repo secret rather than a server-only variable).
2. That's it — GitHub Actions is enabled by default on your own repos. The workflow
   will run on schedule automatically once it's on the default branch.
3. Verify / test immediately: **Actions tab → Supabase Keepalive → Run workflow**
   (this works because of `workflow_dispatch: {}` in the file — you don't have to wait
   for the schedule to test it).

Because this workflow calls the Supabase REST API directly, it still pings Supabase
even if the Vercel deployment itself is broken or paused — genuine redundancy, not
just a duplicate.

<br/>

## 📦 Deployment · 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the [environment variables](#-environment-variables--환경-변수) above.
4. Deploy — cron jobs register automatically (see [above](#-keeping-things-alive--자동화-cron)).

<br/>

## 🙏 Credits & License · 크레딧과 라이선스

Built on top of [**Magic Portfolio**](https://github.com/once-ui-system/magic-portfolio) by
[Lorant One](https://www.linkedin.com/in/lorant-one/) ([Once UI](https://once-ui.com)), then
substantially extended with a custom RAG chat assistant, live GitHub integration, MDX blog
automation, an admin analytics dashboard, and full bilingual i18n.

Distributed under the **CC BY-NC 4.0** license — attribution required, commercial use not
permitted. See [`LICENSE`](./LICENSE).

<br/>

## 📮 Contact · 연락처

- Portfolio: [portpolio-bae-seungho.vercel.app](https://portpolio-bae-seungho.vercel.app)
- GitHub: [@BaeDoge](https://github.com/BaeDoge)
- Email: (see the contact form on the site, or reach out via LinkedIn)

<br/>

<div align="center">
<sub>⭐️ If this structure was useful as a template, a star is appreciated.</sub>
</div>

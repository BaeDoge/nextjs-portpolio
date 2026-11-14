# Seung Ho Bae — Personal Portfolio

Personal portfolio of **Seung Ho Bae**, an AI Platform Engineer at KB Kookmin Bank. The site presents my professional experience, selected engineering projects, technical writing, and independent side projects.

- **Live site:** https://baeseungho.vercel.app
- **GitHub:** https://github.com/BaeDoge
- **Primary focus:** AI services, backend engineering, cloud infrastructure, and product-minded development

## What you can explore

- **About:** Professional experience, education, technical skills, awards, and publications
- **Work:** Project write-ups covering production AI services and independent projects
- **Blog:** Technical notes and articles
- **Gallery:** Selected project and event highlights
- **AI assistant:** A portfolio Q&A interface grounded in profile and project information

## Selected side projects

| Project | Description |
| --- | --- |
| [BAND NIGHT](https://github.com/BaeDoge/nextjs-band-concert-webpage) | Mobile-first concert invitation and audience participation platform |
| [BUYMA Price Manager](https://github.com/BaeDoge/python-buyma-management) | Competitor price comparison and controlled price-update workflow |
| [Baejoon](https://github.com/BaeDoge/nextjs-tech-blog) | Technical learning blog for algorithms, troubleshooting, papers, and open source |
| [Team Calendar](https://github.com/BaeDoge/python-share-calender) | Shared team calendar, to-do, and work-document platform |
| [Music Library](https://github.com/BaeDoge/python-youtube-audio-library-crawler) | Music catalog and duration-based background-music mixer |
| [Knowledge Vault](https://github.com/BaeDoge/python-knowledge-store) | Searchable knowledge base using FastAPI and SQLite FTS5 |

## Technology

- **Frontend:** Next.js 16, React 19, TypeScript, Once UI
- **Internationalisation and content:** next-intl, Markdown, MDX
- **Portfolio assistant:** Hugging Face Transformers.js embeddings, Supabase vector search, Groq streaming responses
- **Deployment and integrations:** Vercel, Supabase, GitHub Actions

## Portfolio assistant

The chat assistant follows a retrieval-augmented generation flow:

1. Converts a question into an embedding using Xenova/paraphrase-multilingual-MiniLM-L12-v2.
2. Searches portfolio content through the Supabase match_chunks function.
3. Streams a response from the configured Groq model.
4. Falls back to the local profile documents in kb/ when embedding or retrieval is unavailable.

The assistant depends on external services and their credentials. Its responses are generated from the available portfolio knowledge base and should be treated as an aid for navigating the portfolio, not as a replacement for direct confirmation.

## Run locally

**Requirements:** Node.js 24.x and npm.

    git clone https://github.com/BaeDoge/nextjs-portpolio.git
    cd nextjs-portpolio
    npm ci

Create a local environment file:

    cp .env.example .env.local

On Windows Command Prompt:

    copy .env.example .env.local

Add the credentials required by the features you want to run, then start the development server:

    npm run dev

Open http://localhost:3000.

For a production build:

    npm run build
    npm start

## Environment variables

Copy .env.example and configure only the integrations you use.

| Variable | Purpose |
| --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Public Supabase client integrations |
| SUPABASE_SERVICE_ROLE_KEY | Server-side vector search and privileged database operations |
| GROQ_API_KEY | Portfolio chat completions |
| GROQ_MODEL | Optional Groq model override |
| PAGE_ACCESS_PASSWORD | Password for the portfolio admin page |
| RESEND_API_KEY | Contact and email delivery integrations |
| CRON_SECRET | Protects health and keepalive endpoints |
| GITHUB_TOKEN | Optional read-only GitHub API token |

Never commit .env.local or production credentials. In particular, keep SUPABASE_SERVICE_ROLE_KEY, GROQ_API_KEY, RESEND_API_KEY, and CRON_SECRET on the server.

## Adding a project

Project pages are written as MDX files:

- Korean: src/app/[locale]/work/projects/<slug>.mdx
- English: src/app/[locale]/work/projects/en/<slug>.mdx

Use the same filename in both locations so the locale switcher can find the translated page. Frontmatter supports title, publishedAt, summary, images, tag, and link. The Work page reads project entries from these files and sorts them by publication date.

## Repository structure

    src/
      app/[locale]/
        work/projects/       # Korean project pages and en/ translations
        blog/                # Portfolio articles
      components/            # Shared UI and portfolio components
      resources/             # Profile and site content
      utils/                 # RAG, GitHub, SEO, and helper logic
    kb/                      # Assistant reference documents
    scripts/                 # Maintenance and integration scripts

## AI-assisted development

I use AI tools as part of my development workflow, not as a substitute for engineering decisions. I define the problem, user flow, requirements, and acceptance criteria; use AI to explore implementation options, draft code, and investigate errors; then review, run, integrate, and revise the result myself. The side projects linked above reflect that process across web applications, automation, internal tools, and media workflows.

## Licence

See [LICENSE](LICENSE) for the repository's current licence and attribution conditions. The site is based on the Once UI / Magic Portfolio project; review the applicable licence before reusing or redistributing any part of the code.

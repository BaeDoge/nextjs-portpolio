import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Seung Ho",
  lastName: "Bae",
  name: `Seung Ho Bae`,
  role: "AI Platform Engineer",
  avatar: "/images/avatar.jpg",
  avatar_wide: "/images/avatar_wide.jpg",
  email: "j04sh926@gmail.com",
  location: "Asia/Seoul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Korean"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/BaeDoge",
    essential: false,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/seung-ho-bae-7392b7282/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/cl0ge/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Challenge-Oriented Developer,<br/>배승호 입니다.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AI & Cloud Backend Engineer</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          KB Kookmin Bank
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    {/* <Text as="span" size="xl" weight="strong">가득찬 호기심</Text>으로 새로운 결과를 만들어내는<br /><Text as="span" size="xl" weight="strong">이 개발자</Text>를 만나보세요.<br /><br />👇 */}
 
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "mailto:doge@kbfg.com?subject=포트폴리오 보고 연락드립니다.&body=내용",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (

      <>
        {/* <b>AI Platform Engineer입니다.</b>
        <br /><br /> */}
        KB국민은행에서 Python, Kubernetes, AWS를 활용해<br/>
        대고객 AI 서비스를 설계하고 운영하고 있습니다.<br/><br/>
        ML 기반 챗봇을 생성형 AI·RAG 아키텍처로 고도화하는 작업을<br/>
        프로덕션 환경에서 진행했고,<br/>
        조직 내 수기업무 효율화를 위한 새로운 워크플로우를 정의하고 개발하였습니다.
        <br /><br />
        개발자로서 코드를 짜는 것 이상으로,<br/>
        시스템이 사용자에게 닿는 순간을 중요하게 생각합니다.
        <br /><br />
        <span style={{ fontSize: "0.9em", color: "var(--neutral-on-background-weak)" }}>
          I'm an AI Platform Engineer at KB Kookmin Bank,<br/>
          building and operating AI services with Python, Kubernetes, and AWS.<br/>
          I focus on shipping systems that actually work in production.
        </span>
      </>

      // <>
      //   {/* ── 한국어 ── */}
      //   <strong>도전을 두려워하지 않는 AI Platform Engineer입니다.</strong>
      //   <br /><br />
      //   대학 시절 공모전 30회 이상 도전해 10회 이상 수상하고,
      //   ETRI·Qisens AI 인턴을 마치고, MCL 연구실에서 논문 5편을 발표했습니다.
      //   졸업 후에는 KB국민은행에서 수백만 고객이 이용하는 AI 서비스를
      //   Python · Kubernetes · AWS로 설계·개발·운영하고 있습니다.
      //   <br /><br />
      //   <em>"정확한 것보다 유의미한 것을 배포한다"</em>
      //   <br /><br />

      //   {/* ── 구분선 ── */}
      //   <span style={{ display: "block", borderTop: "0.5px solid var(--neutral-alpha-weak)", margin: "1rem 0", opacity: 0.4 }} />

      //   {/* ── English ── */}
      //   <span style={{ fontSize: "0.92em", color: "var(--neutral-on-background-weak)" }}>
      //     <strong>AI Platform Engineer who never stops challenging.</strong>
      //     <br /><br />
      //     During university, I entered 30+ competitions and won 10+, completed
      //     internships at ETRI and Qisens AI, and published 5 research papers.
      //     Now at KB Kookmin Bank, I design and operate AI services used by
      //     millions — with Python, Kubernetes, and AWS.
      //     <br /><br />
      //     <em>"Ship what is meaningful, not just what is accurate."</em>
      //   </span>
      // {/* AI Platform Engineer with 3+ years at KB Kookmin Bank, building
      // production AI services used by millions. I work across the full
      // stack — from training ML models and designing Python backends to
      // deploying containerized services on Kubernetes and AWS.
      // <br /><br />
      // Before industry, I won 11 AI & software competitions.
      // I believe the best engineers don't just
      // write code — they ship systems that earn trust. */}
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "KB국민은행 (KB Kookmin Bank)",
        timeframe: "2022.12 — Present",
        role: "AI Platform Engineer (대리, 고객컨택혁신부)",
        achievements: [
          <>
            <strong>[2026.06~현재]</strong> KB 화상상담시스템 개발·운영<br/>
            지점 방문 없이 전문 상담직원과 금융 상담 및 상품 가입이 가능한 비대면 채널.<br/>
            신탁상품 비대면 판매와 스타뱅킹 비대면 상품 가입에 필요한 실명확인 서비스를 운영하며,<br/>
            신분증 진위확인과 얼굴 대조를 결합한 인증 절차를 담당.
            <a href="https://www.bizwnews.com/news/articleView.html?idxno=134113" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--brand-on-background-medium)" }}>
              &nbsp;&nbsp;Link &rarr;
            </a>
          </>,
          <>
            <strong>[2026.03~현재]</strong> KB 대고객 챗봇 현대화<br/>
            기존의 Pattern-base ML 챗봇을 생성형 AI로 전환하며,<br/>
            RAG 구축에 필요한 약관·규정·상품설명서 파싱 및 지식베이스 구축.
            <a href="https://www.etnews.com/20260326000047" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--brand-on-background-medium)" }}>
              &nbsp;&nbsp;Link &rarr;
            </a>
          </>,
          <>
            <strong>[2025.06~2026.03]</strong> 직원 업무 효율화 플랫폼 개발<br/>
            다수 챗봇 통합 운영의 수기 업무와 중복 관리로 인한 비효율을 개선하는 AI 학습관리 플랫폼.<br/>
            그룹 내 자체개발 프로젝트로, DB 모델링, 웹 풀스택 개발, 클라우드 인프라 구축 등 개발 전반 담당.
            <a href="https://www.etnews.com/20250914000047" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--brand-on-background-medium)" }}>
              &nbsp;&nbsp;Link &rarr;
            </a>
          </>,
          <>
            <strong>[2022.12~2024.09]</strong> 금융AI센터 — 실사 아바타 기반 AI 금융비서 서비스 개발·운영<br/>
            EKS 시스템 관리, Lambda scheduling + HPA로 클라우드 비용 최적화.<br/>
            DevOps, CI/CD 파이프라인 구축.
            <a href="https://www.etnews.com/20240306000220" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--brand-on-background-medium)" }}>
              &nbsp;&nbsp;Link &rarr;
            </a>
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/news/genai.png",
            alt: "고객용 챗봇 생성형 AI 현대화",
            width: 4,
            height: 10,
          },
          {
            src: "/news/ai-lms.png",
            alt: "AI학습관리시스템 개발",
            width: 4,
            height: 10,
          },
          {
            src: "/news/ai-assistant.png",
            alt: "AI금융비서 서비스 개발",
            width: 4,
            height: 10,
          },
        ],
      },
      {
        company: "ETRI (한국전자통신연구원)",
        timeframe: "2022.07 — 2022.08",
        role: "Research Intern — Medical IT Convergence Lab",
        achievements: [
          <>
            PPG·ECG 생체신호 기반 혈압 추정 딥러닝 모델 개발.<br />
            Multi Camera Calibration · Multi Person Skeleton Detection 연구.
          </>,
          // <>
          //   Developed a <strong>deep learning-based blood pressure estimation model</strong>
          //   using PPG signal shape and time-domain attributes.
          //   Published as a paper in Korean Communications Society journal.
          // </>,
        ],
        images: [],
      },
      {
        company: "Qisens AI",
        timeframe: "2022.03 — 2022.06",
        role: "AI Engineer Intern (ICT 학부인턴십)",
        achievements: [
          <>
            항공 영상 객체 Segmentation 모델 개발 및 최적화.<br />
            그림자 제거 GAN 모델 적용으로 영상 전처리 성능 개선.
          </>,

          // <>
          //   Developed <strong>Semantic & Instance Segmentation models</strong> for aerial imagery
          //   — ship detection with bounding-box-to-coordinate projection using QGIS/GDAL.
          // </>,
          // <>
          //   Built full pipeline: data collection → labeling → model training → optimization
          //   for satellite/aerial image analysis.
          // </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "영남대학교 (Yeungnam University)",
        description: (
          <>
            정보통신공학과 학사 졸업 2017.03 – 2023.02 · 전공 GPA <strong>4.46 / 4.5</strong><br/>
            전체 GPA 4.2 / 4.5<br />
            전액장학금 (Full-ride scholarship)<br />
            MCL 학부연구원 · 한국통신학회·대한임베디드공학회 논문 5편 기여<br /><br />
            {/* <span style={{ fontSize: "0.9em", color: "var(--neutral-on-background-weak)" }}>
              B.S. in Information &amp; Communication Engineering. Top-ranked GPA with full scholarship.
              Undergraduate researcher at MCL. 5 academic papers.
            </span>
             */}
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "AI & Machine Learning",
        description: (
          <>
            LLM, Computer Vision, Native AI
            PyTorch & TensorFlow, NLP pipelines,
            RAG systems, AI agent development.
          </>
        ),
        images: [],
      },
      {
        title: "Backend & Full Stack",
        description: (
          <>
            Python (Flask, FastAPI), JavaScript / Next.js, React, HTMX,
            REST API design, MySQL · MongoDB, Shell scripting.
          </>
        ),
        images: [],
      },
      {
        title: "Cloud & Infrastructure",
        description: (
          <>
            Kubernetes (pod management, resource patching, service ops),
            AWS (EC2, S3, EKS), Docker, CI/CD pipelines, DevOps practices.
          </>
        ),
        images: [],
      },
    ],
  },
  awards: {
    display: true,
    title: "Awards", //TODO description 으로 변경
    items: [
      { title: "AI Agent 개발 경진대회", award: "장려상", year: "2024", org: "KB Kookmin Bank" },
      { title: "임베디드 SW 경진대회", award: "대표이사상", year: "2021", org: "교육부" },
      { title: "SK AI Challenge for Our Society", award: "우수상", year: "2021", org: "SK" },
      { title: "KB국민은행 AI Challenge", award: "우수상", year: "2021", org: "KB Kookmin Bank",},
      { title: "경상북도 공공데이터 AI 공모전", award: "우수상", year: "2021", org: "경상북도" },
      { title: "해양경찰 데이터 활용 공모전", award: "우수상", year: "2021", org: "해양경찰청" },
      { title: "영남대학교 IoT 경진대회", award: "최우수상", year: "2021", org: "영남대학교" },
      { title: "경찰청 인권영화제 공모전", award: "우수상", year: "2021", org: "경찰청" },
      { title: "AI Speaker 데이터분석 경진대회", award: "Creativity상", year: "2021", org: "산업통상자원부" },
      { title: "인공지능 학습용 데이터 활용 공모전", award: "입상", year: "2021", org: "과학기술정보통신부" },
      { title: "청소년 안전문화 콘텐츠 공모전", award: "우수상", year: "2021", org: "경상북도" },
    ],
  },

  publications: {
    display: false,
    title: "Study",
    items: [
      {
        title: "STM 이용 확대를 위한 신기술 활용 방안",
        venue: "한국지능정보시스템학회",
        year: "2023",
        description: "STM 활용 확대를 위한 신기술 적용 방안 제안",
      },
      {
        title: "PPG 기반 딥러닝 혈압 추정 연구",
        venue: "한국통신학회 (KCA)",
        year: "2022",
        description: "PPG 신호의 형태·Time-Domain 특징을 활용한 혈압 추정 딥러닝 모델",
      },
      {
        title: "비접촉 광학식 주행거리계를 이용한 배관 손상 위치 추정",
        venue: "한국통신학회 (KCA)",
        year: "2022",
        description: "광학 센서 기반 배관 내부 손상 탐지 알고리즘",
      },
      {
        title: "딥러닝 기반 양치질 습관 분석 시스템 (우수논문상)",
        venue: "대한임베디드공학회 추계학술대회",
        year: "2021",
        description: "비전 센서로 양치 방향·미흡 부위를 실시간 분석하는 시스템",
      },
      {
        title: "ADHD Prediction using VibraImage Technology",
        venue: "대한임베디드공학회",
        year: "2022",
        description: "영상 기반 안면 움직임으로 아동 ADHD 의심군을 분류하는 딥러닝 모델",
      },
      {
        title: "세그멘테이션 기반 항공사진 분석 모델 최적화",
        venue: "대한임베디드공학회",
        year: "2022",
        description: "항공 영상에서 도로·주차장 분할 세그멘테이션 모델 최적화 연구",
      },
    ],
  },
};
const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: `Blogs – ${person.name}`,
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,

  images: [
    // KB 활동
    { src: "/projects/kb-ai-challenge/activity-1.png", alt: "KB AI Challenge1", orientation: "horizontal" },
    { src: "/projects/kb-ai-challenge/activity-2.png", alt: "KB AI Challenge2", orientation: "horizontal" },
    // { src: "/projects/kb-lms/screenshot.png",           alt: "AI 학습관리 플랫폼", orientation: "horizontal" },
    // 공모전
    { src: "/projects/sk-ai-challenge/sk-challenge.png",   alt: "SK AI Challenge", orientation: "horizontal" },
    { src: "/projects/embedded-sw/activity.jpg",        alt: "임베디드SW 경진대회", orientation: "horizontal" },
    // 연구 / 인턴
    { src: "/projects/etri-intern/ppg-research.png",    alt: "ETRI PPG 혈압 연구", orientation: "horizontal" },
    { src: "/projects/etri-intern/activity.jpg",        alt: "ETRI 연구소 인턴십", orientation: "horizontal" },
    { src: "/projects/etri-intern/activity2.jpg",        alt: "ETRI 연구소 인턴십2", orientation: "horizontal" },
    { src: "/projects/dongrami/activity.jpg",        alt: "공모전 발표", orientation: "horizontal" },
    { src: "/projects/adhd-research/activity.jpg",        alt: "학회 발표", orientation: "vertical" },
    // 활동
    // { src: "/activities/academic-buddy.png",            alt: "Academic Buddy 멘토 활동", orientation: "horizontal" },
    // { src: "/activities/mentoring.jpg",                 alt: "취업 멘토링", orientation: "vertical" },
    // 스토리
    // { src: "/story/story-1.png",                        alt: "나의 이야기 1", orientation: "horizontal" },
    { src: "/story/story-2.jpg",                        alt: "대한임베디드공학회 ISET 2021 학회 포스터 발표", orientation: "vertical" },
    { src: "/story/story-3.png",                        alt: "임베디드 시스템 프로젝트 발표 (초음파 센서 기반 칫솔 사용 감지)", orientation: "horizontal" },
    { src: "/story/prj2.jpg",                        alt: "지하철 혼잡도 예측 프로젝트 발표", orientation: "horizontal" },
    { src: "/story/kb1.jpg",                        alt: "KB국민은행 제3회 A.I. Challenge 수상", orientation: "vertical" },
    { src: "/story/kb2.jpg",                        alt: "KB AI Challenge 결선 발표 무대 (팀 SteaM다리미)", orientation: "horizontal" },
    { src: "/story/kb3.jpg",                        alt: "KB AI Challenge 결선 발표 현장", orientation: "horizontal" },
    { src: "/story/its.jpg",                        alt: "영남대 MCL 연구실 동료들과 상장 수여식", orientation: "horizontal" },
  ]
};

export { person, social, newsletter, home, about, blog, work, gallery };

// src/resources/content.en.tsx
//
// 영어 버전 콘텐츠.
// 한국어 원본(content.tsx)을 spread로 가져온 뒤, 한국어가 들어있던 필드만 영어로 덮어씁니다.
// 구조(display 플래그, 이미지 경로 등)는 원본을 그대로 재사용하므로
// 원본에서 항목을 추가하면 영어판에도 자동 반영되고, 번역만 여기서 덧씌우면 됩니다.
import { Person, About, Home, Gallery } from "@/types";
import { person, about, home, gallery } from "./content";

export const personEn: Person = {
  ...person,
  role: "AI Platform Engineer",
};

export const homeEn: Home = {
  ...home,
  headline: (
    <>
      Challenge-Oriented Developer,
      <br />
      I&apos;m Seung Ho Bae.
    </>
  ),
};

export const aboutEn: About = {
  ...about,
  calendar: {
    ...about.calendar,
    link: "mailto:doge@kbfg.com?subject=Reaching out after seeing your portfolio&body=",
  },
  intro: {
    ...about.intro,
    description: (
      <>
        I design and operate customer-facing AI services at KB Kookmin Bank using
        Python, Kubernetes and AWS.
        <br />
        <br />
        In production, I modernised an ML-based chatbot into a generative AI and RAG
        architecture, and defined and built new workflows to streamline manual work
        across the organisation.
        <br />
        <br />
        Beyond writing code, I care most about the moment a system actually reaches
        its users.
      </>
    ),
  },
  work: {
    ...about.work,
    title: "Work Experience",
    experiences: [
      {
        company: "KB Kookmin Bank",
        timeframe: "Dec 2022 — Present",
        role: "AI Platform Engineer (Senior Associate, Customer Contact Innovation Dept.)",
        achievements: [
          <>
            <strong>[Jun 2026 — Present]</strong> KB Video Consultation System
            <br />
            A remote channel where customers consult a qualified specialist and
            subscribe to financial products without visiting a branch.
            <br />
            I operate the identity-verification service required for remote trust
            product sales and non-face-to-face Star Banking subscriptions, covering
            ID authenticity checks combined with real-time face matching.
            <a
              href="https://www.bizwnews.com/news/articleView.html?idxno=134113"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-on-background-medium)" }}
            >
              &nbsp;&nbsp;Link &rarr;
            </a>
          </>,
          <>
            <strong>[Mar 2026 — Present]</strong> Modernising KB&apos;s
            customer-facing chatbot
            <br />
            Migrating a pattern-based ML chatbot to generative AI, including parsing
            of terms, regulations and product documents to build the RAG knowledge
            base.
            <a
              href="https://www.etnews.com/20260326000047"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-on-background-medium)" }}
            >
              &nbsp;&nbsp;Link →
            </a>
          </>,
          <>
            <strong>[Jun 2025 — Mar 2026]</strong> Internal productivity platform
            <br />
            An AI learning-management platform that removed the manual work and
            duplicated effort of running multiple chatbots. An in-house project where
            I covered DB modelling, full-stack web development and cloud
            infrastructure.
          </>,
          <>
            <strong>[Dec 2022 — Sep 2024]</strong> Financial AI Center — photorealistic
            avatar-based AI financial assistant
            <br />
            EKS cluster management, cloud cost optimisation via Lambda scheduling and
            HPA, and DevOps / CI-CD pipeline construction.
          </>,
        ],
        images: (about.work.experiences?.[0] as any)?.images?.map((img: any, i: number) => ({
          ...img,
          alt: [
            "Generative AI modernisation of the customer chatbot",
            "AI learning management system development",
            "AI financial assistant service development",
          ][i] ?? img.alt,
        })),
      },
      {
        company: "ETRI (Electronics and Telecommunications Research Institute)",
        timeframe: (about.work.experiences?.[1] as any)?.timeframe ?? "",
        role: (about.work.experiences?.[1] as any)?.role ?? "Research Intern",
        achievements: [
          <>
            Developed a deep-learning model for blood pressure estimation from PPG and
            ECG biosignals.
            <br />
            Research on multi-camera calibration and multi-person skeleton detection.
          </>,
        ],
        images: (about.work.experiences?.[1] as any)?.images ?? [],
      },
      {
        company: (about.work.experiences?.[2] as any)?.company ?? "Qisens AI",
        timeframe: (about.work.experiences?.[2] as any)?.timeframe ?? "",
        role: "AI Engineer Intern (ICT Undergraduate Internship)",
        achievements: [
          <>
            Developed and optimised an object segmentation model for aerial imagery.
            <br />
            Improved preprocessing performance by applying a shadow-removal GAN model.
          </>,
        ],
        images: (about.work.experiences?.[2] as any)?.images ?? [],
      },
    ] as any,
  },
  studies: {
    ...about.studies,
    title: "Education",
    institutions: [
      {
        name: "Yeungnam University",
        description: (
          <>
            B.S. in Information &amp; Communication Engineering, Mar 2017 – Feb 2023
            <br />
            GPA 4.46 / 4.5 (Major) · 4.2 / 4.5 (Overall) — full-ride scholarship.
            <br />
            Undergraduate Researcher at Mobile Communication Lab (MCL), contributing to
            5 papers with KICS and IEIE.
          </>
        ),
      },
    ],
  },
  technical: {
    ...about.technical,
    title: "Technical Skills",
  },
  awards: {
    ...about.awards,
    title: "Awards",
    items: [
      { title: "AI Agent Development Competition", award: "Encouragement Award", year: "2024", org: "KB Kookmin Bank" },
      { title: "Embedded Software Competition", award: "CEO Award", year: "2021", org: "Ministry of Education" },
      { title: "SK AI Challenge for Our Society", award: "Excellence Award", year: "2021", org: "SK" },
      { title: "KB Kookmin Bank AI Challenge", award: "Excellence Award", year: "2021", org: "KB Kookmin Bank" },
      { title: "Gyeongsangbuk-do Public Data AI Competition", award: "Excellence Award", year: "2021", org: "Gyeongsangbuk-do" },
      { title: "Korea Coast Guard Data Utilisation Competition", award: "Excellence Award", year: "2021", org: "Korea Coast Guard" },
      { title: "Yeungnam University IoT Competition", award: "Grand Prize", year: "2021", org: "Yeungnam University" },
      { title: "National Police Agency Human Rights Film Competition", award: "Excellence Award", year: "2021", org: "National Police Agency" },
      { title: "AI Speaker Data Analysis Competition", award: "Creativity Award", year: "2021", org: "Ministry of Trade, Industry and Energy" },
      { title: "AI Training Data Utilisation Competition", award: "Finalist", year: "2021", org: "Ministry of Science and ICT" },
      { title: "Youth Safety Culture Content Competition", award: "Excellence Award", year: "2021", org: "Gyeongsangbuk-do" },
    ],
  } as any,
  publications: {
    ...about.publications,
    items: [
      { title: "New Technology Utilisation to Expand the Use of STM", venue: "Korea Intelligent Information Systems Society", year: "2023", description: "Proposal for applying new technologies to expand STM adoption." },
      { title: "Deep Learning-based Blood Pressure Estimation using PPG", venue: "KICS (Korea Institute of Communications and Information Sciences)", year: "2022", description: "A deep-learning model estimating blood pressure from PPG morphology and time-domain features." },
      { title: "Pipe Damage Localisation using a Non-contact Optical Odometer", venue: "KICS", year: "2022", description: "An optical-sensor-based algorithm for detecting damage inside pipes." },
      { title: "Brushing Habit Analysis System Based on Deep Learning (Best Paper Award)", venue: "IEIE Autumn Conference", year: "2021", description: "A system analysing brushing direction and missed areas in real time with a vision sensor." },
      { title: "ADHD Prediction using Vibration Motor Technology", venue: "IEIE", year: "2022", description: "A deep-learning model classifying suspected childhood ADHD from video-based facial movement." },
      { title: "Optimisation of Segmentation-based Aerial Photo Analysis Models", venue: "IEIE", year: "2022", description: "Optimisation research on segmenting roads and parking areas in aerial imagery." },
    ],
  } as any,
};

const GALLERY_ALT_EN: Record<string, string> = {
  "/projects/embedded-sw/activity.jpg": "Embedded Software Competition",
  "/projects/etri-intern/ppg-research.png": "ETRI PPG blood pressure research",
  "/projects/etri-intern/activity.jpg": "ETRI research internship",
  "/projects/etri-intern/activity2.jpg": "ETRI research internship (2)",
  "/projects/dongrami/activity.jpg": "Competition presentation",
  "/projects/adhd-research/activity.jpg": "Conference presentation",
  "/story/story-2.jpg": "Poster presentation at IEIE ISET 2021",
  "/story/story-3.png": "Embedded systems project presentation (ultrasonic toothbrush-use detection)",
  "/story/prj2.jpg": "Subway congestion prediction project presentation",
  "/story/kb1.jpg": "Award at the 3rd KB Kookmin Bank A.I. Challenge",
  "/story/kb2.jpg": "KB AI Challenge final stage presentation (Team SteaM다리미)",
  "/story/kb3.jpg": "KB AI Challenge finals venue",
  "/story/its.jpg": "Award ceremony with Yeungnam University MCL lab colleagues",
};

export const galleryEn: Gallery = {
  ...gallery,
  images: gallery.images.map((img) => ({
    ...img,
    alt: GALLERY_ALT_EN[img.src] ?? img.alt,
  })),
};

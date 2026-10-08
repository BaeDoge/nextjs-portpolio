import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import AwardStrip from "@/components/AwardStrip";
import { getLocale } from "next-intl/server";
// import Image from "next/image";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}



export default function Gallery() {
  return (
    // direction="column" 추가 — 세로 스택으로 변경
    <Flex maxWidth="l" direction="column" gap="0">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />

      {/* 수상 증서 스트립 */}
      <AwardStrip
        title="수상 내역"
        items={AWARD_ITEMS}
        speed={0.4}   // 조금 더 느리게
      />

      {/* 자격증·수료증 스트립 */}
      <AwardStrip
        title="자격증 및 수료증"
        items={CERT_ITEMS}
      />
    </Flex>
  );
}

// ── 데이터 정의 ────────────────────────────────
// const AWARD_ITEMS = [
//   { src: "/awards/kb-ai-challenge.jpg",   label: "KB Future Finance AI Challenge" },
//   { src: "/awards/sk-challenge.jpg",      label: "SK AI Challenge" },
//   { src: "/awards/embedded-sw.jpg",       label: "임베디드SW 경진대회 우수상" },
//   { src: "/awards/best-paper.jpg",        label: "우수논문발표상" },
//   { src: "/awards/pohang-technopark.jpg", label: "경북 공공데이터 AI 공모전" },
//   { src: "/awards/coast-guard.jpg",       label: "해양경찰청 데이터 공모전" },
//   { src: "/awards/iot-competition.jpg",   label: "IoT 경진대회 최우수상" },
//   { src: "/awards/ai-speaker.jpg",        label: "AI Speaker 경진대회" },
//   { src: "/awards/police-film.jpg",       label: "경찰청 인권영화제 공모전" },
//   { src: "/awards/ai-idea.jpg",           label: "인공지능 아이디어 공모전" },
//   { src: "/awards/slogan.jpg",            label: "표어 공모전 우수상" },
// ];
const AWARD_ITEMS = [
  { src: "/awards/ai-idea.jpg",           label: "인공지능 학습용 데이터 공모전" },
  { src: "/awards/ai-speaker.jpg",        label: "AI Speaker 데이터분석 경진대회" },
  { src: "/awards/best-paper.jpg",        label: "대한임베디드공학회 우수논문발표상" },
  { src: "/awards/coast-guard.jpg",       label: "해양경찰청 데이터 활용 공모전" },
  { src: "/awards/embedded-sw.jpg",       label: "임베디드SW 경진대회 우수상" },
  { src: "/awards/iot-competition.jpg",   label: "영남대 IoT 경진대회 최우수상" },
  { src: "/awards/kb-ai-challenge.jpg",   label: "KB Future Finance AI Challenge" },
  { src: "/awards/pohang-technopark.jpg", label: "경북 공공데이터 AI 공모전" },
  { src: "/awards/sk-challenge.jpg",      label: "SK AI Challenge for Our Society" },
  { src: "/awards/police-film.jpg",       label: "경찰청 인권영화제 공모전" },
  { src: "/awards/slogan.jpg",            label: "청소년 안전문화 콘텐츠 공모전" },
  // { src: "/certificates/ai-applications.jpg",    label: "AI 교육이수증" },
];
const CERT_ITEMS = [
  { src: "/certificates/ai-application.jpg",  label: "인공지능 응용 60H" },
  { src: "/certificates/ai-basic.jpg",         label: "인공지능 기본 60H" },
  { src: "/certificates/ai-employment.jpg",    label: "AI 취업교육" },
  // { src: "/certificates/ai-speaker.jpg",       label: "AI Speaker" },
  { src: "/certificates/qisens-intern.jpg",    label: "Qisens AI 인턴 수행확인서" },
  { src: "/certificates/etri-career.png",      label: "ETRI 연구 경력증명서" },
  // { src: "/certificates/info-processing.jpg",  label: "정보처리기능사" },
  { src: "/certificates/ai-cert.jpg",          label: "인공지능 자격증" },
  { src: "/certificates/transcript.jpg",       label: "성적증명서" },
  { src: "/certificates/work-record.png",      label: "근로내역증명서" },
  { src: "/certificates/mentoring.jpg",     label: "교내 학업멘토링 수료증" },
  { src: "/certificates/gyungsan01.jpg",    label: "경산청년정책단 1기" },
  { src: "/certificates/gyungsan02.jpg",    label: "경산청년정책단 2기" },
];
// ── 영어 라벨 ──────────────────────────────────────────────
const AWARD_ITEMS_EN = [
  { src: "/awards/ai-idea.jpg",           label: "AI Training Data Utilisation Competition" },
  { src: "/awards/ai-speaker.jpg",        label: "AI Speaker Data Analysis Competition" },
  { src: "/awards/best-paper.jpg",        label: "IEIE Best Paper Presentation Award" },
  { src: "/awards/coast-guard.jpg",       label: "Korea Coast Guard Data Utilisation Competition" },
  { src: "/awards/embedded-sw.jpg",       label: "Embedded Software Competition — Excellence Award" },
  { src: "/awards/iot-competition.jpg",   label: "Yeungnam University IoT Competition — Grand Prize" },
  { src: "/awards/kb-ai-challenge.jpg",   label: "KB Future Finance AI Challenge" },
  { src: "/awards/pohang-technopark.jpg", label: "Gyeongbuk Public Data AI Competition" },
  { src: "/awards/sk-challenge.jpg",      label: "SK AI Challenge for Our Society" },
  { src: "/awards/police-film.jpg",       label: "National Police Agency Human Rights Film Competition" },
  { src: "/awards/slogan.jpg",            label: "Youth Safety Culture Content Competition" },
];

const CERT_ITEMS_EN = [
  { src: "/certificates/ai-application.jpg",  label: "Applied AI (60H)" },
  { src: "/certificates/ai-basic.jpg",        label: "AI Fundamentals (60H)" },
  { src: "/certificates/ai-employment.jpg",   label: "AI Career Training" },
  { src: "/certificates/qisens-intern.jpg",   label: "Qisens AI Internship Certificate" },
  { src: "/certificates/etri-career.png",     label: "ETRI Research Experience Certificate" },
  { src: "/certificates/ai-cert.jpg",         label: "AI Certification" },
  { src: "/certificates/transcript.jpg",      label: "Academic Transcript" },
  { src: "/certificates/work-record.png",     label: "Employment Record Certificate" },
  { src: "/certificates/mentoring.jpg",       label: "Campus Academic Mentoring Certificate" },
  { src: "/certificates/gyungsan01.jpg",      label: "Gyeongsan Youth Policy Group, 1st Cohort" },
  { src: "/certificates/gyungsan02.jpg",      label: "Gyeongsan Youth Policy Group, 2nd Cohort" },
];

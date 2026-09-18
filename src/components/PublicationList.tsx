// src/components/PublicationList.tsx
"use client";
import { useState } from "react";

interface Publication {
  title: string;
  titleEn?: string;
  venue: string;
  year: string;
  authors: string;
  abstract: string;
  keywords?: string[];
  award?: string;
  // public/paper/ 폴더 이미지 경로
  paperImages?: string[];
}

const PUBLICATIONS: Publication[] = [
  {
    title: "STM 이용 확대를 위한 신기술 활용 방안",
    titleEn: "New Technology Utilization to Expand the Use of STM",
    venue: "한국지능정보시스템학회",
    year: "2023",
    authors: "배승호, KB국민은행",
    abstract: "연령별 맞춤형 메인 페이지 구성과 챗봇 내재화를 통해 접근성을 높이고, 시선 추적 기술 기반의 숄더서핑 방지 및 안면 유사도 보조 시스템을 도입하여 보안 불안감을 해소함으로써 이용 만족도를 향상",
    keywords: ["Vision", "STM", "Peeker Detection"],
    paperImages: [],
  },
  {
    title: "PPG의 형태 및 Time-Domain Attributes를 활용한 딥러닝 기반 혈압 추정 연구",
    titleEn: "Deep learning-based blood pressure estimation using Morphology of PPG signal",
    venue: "한국통신학회",
    year: "2022",
    authors: "배승호, 김민성, 이현정, 김규형 (영남대, ETRI)",
    abstract: "PPG 신호의 형태와 시간 영역 특성을 활용한 3-Branch CNN-LSTM 모델. MIMIC-III 기반 MAE 8.924 mmHg 달성. 단일 Branch 대비 약 12% 성능 향상.",
    keywords: ["PPG", "CNN-LSTM", "혈압 추정", "MIMIC-III"],
    paperImages: ["/paper/ppg_1.jpg", "/paper/ppg_2.jpg","/paper/ppg_3.jpg"],
  },
  {
    title: "딥러닝 기반 양치질 습관 분석 시스템 개발",
    titleEn: "Brushing Habit Analysis System Based on Deep-Learning",
    venue: "대한임베디드공학회",
    year: "2021",
    authors: "배승호, 임창한, 이찬호, 지준영, 박용완 (영남대)",
    abstract: "임베디드 보드 카메라로 양치 영상을 수집하고 LSTM으로 양치 방향 분류. MediaPipe 기반 36개 Landmark 활용. 클라우드 웹 서비스로 미흡 부위 시각화.",
    keywords: ["LSTM", "MediaPipe", "양치 습관", "임베디드"],
    award: "우수논문발표상",
    paperImages: ["/paper/brushing_1.jpg", "/paper/brushing_2.jpg"],
  },
  {
    title: "세그멘테이션 기반 항공사진 분석 모델의 최적화 연구",
    titleEn: "Optimization of Aerial Photographic Analysis Model Based on Segmentation",
    venue: "대한임베디드공학회",
    year: "2022",
    authors: "배승호, 박용완 (영남대)",
    abstract: "Deeplab v3+ 기반 항공사진 Semantic Segmentation. Scribble Weakly-Supervised + Shadow Removal + 데이터 증강으로 Accuracy 72% → 97%, mIoU 61% → 93% 달성.",
    keywords: ["Deeplab v3+", "Shadow Removal", "Weakly-Supervised", "드론"],
    paperImages: ["/paper/aerial_1.jpg","/paper/aerial_2.jpg","/paper/aerial_3.jpg","/paper/aerial_4.jpg"],
  },
  {
    title: "영상처리 기반 Eye-Features Extraction의 성능 향상 연구",
    titleEn: "Eye-Features Extraction Performance Improvement Techniques",
    venue: "대한임베디드공학회",
    year: "2022",
    authors: "배승호, 김민수, 정승필, 박용완 (영남대, 영남대 의료원)",
    abstract: "CNN + Dlib facial landmark 결합 Blink Detection과 Adaptive Thresholding Eye Tracking 제안. 뜬눈 98%, 감은눈 94% 분류 성능 달성.",
    keywords: ["Eye Tracking", "Blink Detection", "CNN", "Adaptive Thresholding"],
    paperImages: ["/paper/eye_1.jpg","/paper/eye_2.jpg"],
  },
  {
    title: "딥러닝 기반 환자 모니터링 시스템",
    titleEn: "Deep Learning-Based Patient Monitoring System",
    venue: "영남대학교 학부 논문",
    year: "2022",
    authors: "배승호, 임창한, 박용완 (영남대)",
    abstract: "낙상·제스처·배회 감지 AI 시스템. Raspberry PI + 서버 TCP 멀티프로세스. 낙상 90%, 제스처 96% 인식률. 간호사 호출·사진 촬영 제스처 포함.",
    keywords: ["환자 모니터링", "낙상 감지", "MediaPipe", "TCP 통신"],
    paperImages: ["/paper/patients_1.jpg","/paper/patients_2.jpg","/paper/patients_3.jpg","/paper/patients_4.jpg","/paper/patients_5.jpg","/paper/patients_6.jpg"],
  },
  {
    title: "비접촉 광학식 주행거리계를 이용한 배관 내부 손상 위치 추정",
    titleEn: "Damage Position Estimation in Pipeline Using Non-Contact Optical Odometer",
    venue: "한국통신학회 동계종합학술발표회",
    year: "2021",
    authors: "이빈, 배승호, 임창한, 박용완 (영남대)",
    abstract: "접촉식 주행거리계의 한계를 보완하는 비접촉 광학식 주행거리계 제안. 텔레센트릭 렌즈 + Optical flow로 배관 내부 손상 위치 추정.",
    keywords: ["광학식 주행거리계", "배관 손상", "Optical flow"],
    paperImages: ["/paper/pipe_1.jpg","/paper/pipe_2.jpg"],
  },
];

// 라이트박스 컴포넌트
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw", maxHeight: "90vh",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 16,
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: -40, right: 0,
            background: "transparent", border: "none",
            color: "#fff", fontSize: 24, cursor: "pointer",
          }}
        >✕</button>

        {/* 이미지 */}
        <img
          src={images[idx]}
          alt={`논문 ${idx + 1}`}
          style={{
            maxWidth: "85vw", maxHeight: "80vh",
            objectFit: "contain", borderRadius: 8,
          }}
        />

        {/* 페이지 표시 + 이동 */}
        {images.length > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              style={{
                padding: "6px 16px", borderRadius: 20,
                background: idx === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff", cursor: idx === 0 ? "default" : "pointer",
                fontSize: 13,
              }}
            >← 이전</button>

            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              {idx + 1} / {images.length}
            </span>

            <button
              onClick={() => setIdx(Math.min(images.length - 1, idx + 1))}
              disabled={idx === images.length - 1}
              style={{
                padding: "6px 16px", borderRadius: 20,
                background: idx === images.length - 1 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff", cursor: idx === images.length - 1 ? "default" : "pointer",
                fontSize: 13,
              }}
            >다음 →</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PublicationList() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);

  return (
    <>
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PUBLICATIONS.map((pub, i) => (
          <div
            key={i}
            style={{
              borderRadius: 12,
              border: expanded === i
                ? "1px solid var(--neutral-alpha-strong)"
                : "0.5px solid var(--neutral-alpha-medium)",
              overflow: "hidden",
              background: "var(--background-overlay)",
              transition: "border-color 0.15s",
            }}
          >
            {/* 헤더 — 클릭해서 펼치기 */}
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                width: "100%", textAlign: "left",
                padding: "0.9rem 1rem",
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                {/* 뱃지 행 */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 10, fontFamily: "monospace",
                    color: "var(--neutral-on-background-weak)",
                  }}>
                    {pub.venue} · {pub.year}
                  </span>
                  {pub.award && (
                    <span style={{
                      fontSize: 10, padding: "1px 8px", borderRadius: 20,
                      background: "#FAEEDA", color: "#854F0B",
                      border: "1px solid #EF9F2733", fontWeight: 500,
                    }}>
                      🏆 {pub.award}
                    </span>
                  )}
                  {pub.paperImages && pub.paperImages.length > 0 && (
                    <span style={{
                      fontSize: 10, padding: "1px 8px", borderRadius: 20,
                      background: "#E6F1FB", color: "#185FA5",
                      border: "1px solid #378ADD33",
                    }}>
                      📄 논문 이미지 {pub.paperImages.length}페이지
                    </span>
                  )}
                </div>

                {/* 제목 */}
                <div style={{
                  fontSize: 13, fontWeight: 500,
                  color: "var(--neutral-on-background-strong)",
                  lineHeight: 1.45,
                }}>
                  {pub.title}
                </div>
                {pub.titleEn && (
                  <div style={{
                    fontSize: 11, color: "var(--neutral-on-background-weak)",
                    fontStyle: "italic", marginTop: 3,
                  }}>
                    {pub.titleEn}
                  </div>
                )}
              </div>
              <span style={{
                fontSize: 11, color: "var(--neutral-on-background-weak)",
                flexShrink: 0, marginTop: 2, transition: "transform 0.2s",
                display: "inline-block",
                transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)",
              }}>▼</span>
            </button>

            {/* 펼쳐진 내용 */}
            {expanded === i && (
              <div style={{
                padding: "0 1rem 1rem",
                borderTop: "0.5px solid var(--neutral-alpha-weak)",
              }}>
                {/* 저자 */}
                <div style={{
                  fontSize: 11, color: "var(--neutral-on-background-weak)",
                  marginTop: 10, marginBottom: 10,
                }}>
                  저자: {pub.authors}
                </div>

                {/* 논문 이미지 썸네일 */}
                {pub.paperImages && pub.paperImages.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{
                      fontSize: 11, color: "var(--neutral-on-background-weak)",
                      marginBottom: 6,
                    }}>
                      논문 원문 (클릭하면 크게 보여요)
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {pub.paperImages.map((src, pi) => (
                        <div
                          key={pi}
                          onClick={() => setLightbox({ images: pub.paperImages!, idx: pi })}
                          style={{
                            width: 80, height: 110,
                            borderRadius: 6,
                            overflow: "hidden",
                            border: "1px solid var(--neutral-alpha-medium)",
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "transform 0.15s, box-shadow 0.15s",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          <img
                            src={src}
                            alt={`논문 ${pi + 1}페이지`}
                            style={{
                              width: "100%", height: "100%",
                              objectFit: "cover", objectPosition: "top",
                              display: "block",
                            }}
                            onError={e => {
                              (e.target as HTMLImageElement).parentElement!.style.display = "none";
                            }}
                          />
                        </div>
                      ))}
                      {/* 전체 보기 버튼 */}
                      <button
                        onClick={() => setLightbox({ images: pub.paperImages!, idx: 0 })}
                        style={{
                          width: 80, height: 110,
                          borderRadius: 6,
                          border: "1px dashed var(--neutral-alpha-medium)",
                          background: "var(--neutral-alpha-weak)",
                          cursor: "pointer", fontSize: 11,
                          color: "var(--neutral-on-background-weak)",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center", gap: 4,
                        }}
                      >
                        <span style={{ fontSize: 18 }}>🔍</span>
                        전체 보기
                      </button>
                    </div>
                  </div>
                )}

                {/* 요약 */}
                <div style={{
                  fontSize: 12,
                  color: "var(--neutral-on-background-medium)",
                  lineHeight: 1.8,
                  marginBottom: 10,
                  padding: "10px 12px",
                  background: "var(--neutral-alpha-weak)",
                  borderRadius: 8,
                }}>
                  {pub.abstract}
                </div>

                {/* 키워드 */}
                {pub.keywords && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {pub.keywords.map(k => (
                      <span key={k} style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 20,
                        border: "0.5px solid var(--neutral-alpha-medium)",
                        color: "var(--neutral-on-background-weak)",
                      }}>{k}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
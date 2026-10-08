// ┌─────────────────────────────────────────────────────────────┐
// │  포트폴리오 위젯 모음                                         │
// │  원하는 컴포넌트를 page.tsx에 import해서 사용                  │
// └─────────────────────────────────────────────────────────────┘
"use client";
import { useState, useEffect , useRef } from "react";
import { useLocale } from "next-intl";



// ══════════════════════════════════════════════════════════════
// 1. 실시간 방문자 카운터 (Supabase 연동)
// 사용: <VisitorCounter />
// ══════════════════════════════════════════════════════════════
export function VisitorCounter() {

  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pageview").then(r => r.json()).then(d => setTotal(d.total));
  }, []);

  if (total === null) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--neutral-on-background-weak)" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D9E75", animation: "tlpulse 2s infinite" }} />
      지금까지 {total.toLocaleString()}명이 방문했어요.
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function VisitorCounter() {
//   const [unique, setUnique] = useState<number | null>(null);

//   useEffect(() => {
//     fetch("/api/pageview?type=unique")
//       .then(r => r.json())
//       .then(d => setUnique(d.count));
//   }, []);

//   if (unique === null) return null;

//   return (
//     <div style={{
//       display: "flex", alignItems: "center", gap: 6,
//       fontSize: 12, color: "var(--neutral-on-background-weak)",
//     }}>
//       <div style={{
//         width: 6, height: 6, borderRadius: "50%",
//         background: "#1D9E75",
//         animation: "tlpulse 2s infinite",
//       }} />
//       지금까지 {unique.toLocaleString()}명이 다녀갔어요
//     </div>
//   );
// }
  // const [count, setCount] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchCount = async () => {
  //     // const { data } = await supabase
  //     //   .from("total_views")
  //     //   .select("total");

  //     // setCount(data?.[0]?.count ?? 0);
  //     setCount(1247); // 임시값 필요 없으면 제거
  //   };

  //   fetchCount();
  // }, []);

  // return (
  //   <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"var(--neutral-on-background-weak)" }}>
  //     <div style={{ width:6, height:6, borderRadius:"50%", background:"#1D9E75", animation:"tlpulse 2s infinite" }} />
  //     {count !== null ? `지금까지 ${count.toLocaleString()}명이 방문했어요` : "..."}
  //     <style>{`@keyframes tlpulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
  //   </div>
  // );

// ══════════════════════════════════════════════════════════════
// 2. 현재 상태 배지 (프리랜서 가능 여부 등)
// 사용: <StatusBadge />
// 내용은 STATUS 객체만 수정하면 됨
// ══════════════════════════════════════════════════════════════
const STATUS = {
  available: false,           // ← true/false만 바꾸면 됨
  label: "사이드 프로젝트 협업 가능",
  labelOff: "현재 바쁨",
};

export function StatusBadge() {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:6,
      padding:"4px 12px", borderRadius:20, fontSize:12,
      border: STATUS.available
        ? "1px solid #1D9E7566"
        : "1px solid var(--neutral-alpha-medium)",
      color: STATUS.available ? "#1D9E75" : "var(--neutral-on-background-weak)",
      background: STATUS.available ? "#1D9E7511" : "transparent",
    }}>
      <div style={{
        width:6, height:6, borderRadius:"50%",
        background: STATUS.available ? "#1D9E75" : "var(--neutral-alpha-strong)",
        animation: STATUS.available ? "tlpulse 2s infinite" : "none",
      }} />
      {STATUS.available ? STATUS.label : STATUS.labelOff}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 3. 기술 스택 인터랙티브 그리드
// 사용: <SkillGrid />
// SKILL_DATA에 항목 추가/수정
// ══════════════════════════════════════════════════════════════
const SKILL_DATA = [
  { name:"Python",     level:100, cat:"Languages",  color:"#378ADD" },
  { name:"C++",        level:65, cat:"Languages",  color:"#4ed441" },
  { name:"JavaScript", level:60, cat:"Languages",  color:"#eeb13f" },
  { name:"Kubernetes", level:80, cat:"Infra",        color:"#326CE5" },
  { name:"AWS",        level:75, cat:"Infra",        color:"#EF9F27" },
  { name:"Docker",     level:70, cat:"Infra",        color:"#2496ED" },
  { name:"LLM",    level:80, cat:"AI/ML",        color:"#EE4C2C" },
  { name:"Hugging face",  level:75, cat:"AI/ML",        color:"#1D9E75" },
  { name:"Vision",  level:70, cat:"AI/ML",        color:"#42b6ec" },
  { name:"HTMX",      level:65, cat:"Frontend",     color:"#61DAFB" },
  { name:"Next.js",    level:60, cat:"Frontend",     color:"#7F77DD" },
  { name:"Flask",      level:82, cat:"Backend",      color:"#888780" },
  { name:"FastAPI",      level:82, cat:"Backend",      color:"#3549f5" },
  { name:"MySQL",      level:78, cat:"Database",     color:"#D85A30" },
  { name:"MongoDB",      level:60, cat:"Database",     color:"#e5a691" },
  { name:"Redis",      level:60, cat:"Database",     color:"#28dd79" },
  { name:"SQLite",      level:80, cat:"Database",     color:"#51a7f8" },
  { name:"Gitlab",      level:80, cat:"CI/CD",     color:"#51a7f8" },
  { name:"Confluence",      level:90, cat:"CI/CD",     color:"#83e749" },
  { name:"Jenkins",      level:55, cat:"CI/CD",     color:"#fd70be" },
  { name:"ArgoCD",      level:80, cat:"CI/CD",     color:"#f1ef6e" },
];

export function SkillGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const cats = [...new Set(SKILL_DATA.map(s => s.cat))];
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? SKILL_DATA.filter(s => s.cat === filter) : SKILL_DATA;

  return (
    <div>
      {/* 카테고리 필터 */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
        <button onClick={() => setFilter(null)} style={{
          padding:"3px 10px", borderRadius:20, fontSize:11, cursor:"pointer",
          background: !filter ? "var(--neutral-alpha-medium)" : "transparent",
          border:"0.5px solid var(--neutral-alpha-medium)",
          color:"var(--neutral-on-background-medium)",
        }}>전체</button>
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding:"3px 10px", borderRadius:20, fontSize:11, cursor:"pointer",
            background: filter===cat ? "var(--neutral-alpha-medium)" : "transparent",
            border:"0.5px solid var(--neutral-alpha-medium)",
            color:"var(--neutral-on-background-medium)",
          }}>{cat}</button>
        ))}
      </div>
      {/* 스킬 카드 */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:8 }}>
        {visible.map(s => (
          <div
            key={s.name}
            onMouseEnter={() => setHovered(s.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding:"10px 12px", borderRadius:10,
              border: hovered===s.name ? `1px solid ${s.color}66` : "0.5px solid var(--neutral-alpha-medium)",
              background: hovered===s.name ? `${s.color}0d` : "var(--background-overlay)",
              transition:"border-color .15s, background .15s",
              cursor:"default",
            }}
          >
            <div style={{ fontSize:13, fontWeight:500, color:"var(--neutral-on-background-strong)", marginBottom:6 }}>
              {s.name}
            </div>
            <div style={{ height:4, background:"var(--neutral-alpha-weak)", borderRadius:2 }}>
              <div style={{
                height:"100%", borderRadius:2, background:s.color,
                width: hovered===s.name ? `${s.level}%` : "0%",
                transition:"width .4s ease",
              }} />
            </div>
            <div style={{ fontSize:10, color:"var(--neutral-on-background-weak)", marginTop:4 }}>
              {s.cat}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 4. 현재 듣고 있는 음악 / 읽고 있는 책 (수동 업데이트)
// 사용: <NowWidget />
// ══════════════════════════════════════════════════════════════
const NOW_DATA = {
  music: {
    active: true,          // ← 듣는 음악이 있을 때 true로
    track: "That's Life",
    artist: "Frank Sinatra",
    url: "https://youtu.be/TnlPtaPxXfc?si=q-2eGLXlAE7K5bD6",
  },
  reading: {
    active: true,
    title: "Certified Kubernetes Administrator (CKA) Exam Guide",
    author: "Melony Qin 외",
    url: "https://product.kyobobook.co.kr/detail/S000202227502",
  },
  watching: {
    active: false,
    title: "",
    platform: "",
    url: "",
  },
  studying: {
    active: true,
    title: "기술 블로그 개발",
    platform: "AWS",
    url: "",
  }
};

export function NowWidget() {
  const items = [
    NOW_DATA.music.active && { emoji:"🎵", label:"듣는 중", text:`${NOW_DATA.music.track} — ${NOW_DATA.music.artist}`, url:NOW_DATA.music.url },
    NOW_DATA.reading.active && { emoji:"📚", label:"읽는 중", text:`${NOW_DATA.reading.title} (${NOW_DATA.reading.author})`, url:NOW_DATA.reading.url },
    NOW_DATA.watching.active && { emoji:"📺", label:"보는 중", text:`${NOW_DATA.watching.title} (${NOW_DATA.watching.platform})`, url:NOW_DATA.watching.url },
    NOW_DATA.studying.active && { emoji:"💻", label:"하는 중", text:`${NOW_DATA.studying.title} (${NOW_DATA.studying.platform})`, url:NOW_DATA.studying.url },
  ].filter(Boolean) as { emoji:string; label:string; text:string; url:string }[];

  if (!items.length) return null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <p style={{ fontSize:11, color:"var(--neutral-on-background-weak)", textTransform:"uppercase", letterSpacing:".5px", margin:0 }}>
        요즘
      </p>
      {items.map((item, i) => (
        <div key={i} style={{
          display:"flex", alignItems:"center", gap:8,
          fontSize:12, color:"var(--neutral-on-background-medium)",
        }}>
          <span style={{ fontSize:14 }}>{item.emoji}</span>
          <span style={{ color:"var(--neutral-on-background-weak)" }}>{item.label}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 5. GitHub 기여 히트맵 (간단 버전 — 이미지 기반)
// 사용: <GitHubCard username="Bae-SeungHo" />
// ══════════════════════════════════════════════════════════════
export function GitHubCard({ username }: { username: string }) {
  return (
    <div style={{
      padding:"1rem 1.25rem",
      border:"0.5px solid var(--neutral-alpha-medium)",
      borderRadius:12, background:"var(--background-overlay)",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div style={{ width:32, height:32, borderRadius:"50%", overflow:"hidden" }}>
          <img
            src={`https://avatars.githubusercontent.com/${username}`}
            alt={username} width={32} height={32}
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:500, color:"var(--neutral-on-background-strong)" }}>{username}</div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:11, color:"var(--neutral-on-background-weak)" }}>
            github.com/{username}
          </a>
        </div>
      </div>
      {/* GitHub README Stats 이미지 (자동 업데이트) */}
      <img
        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&bg_color=00000000&title_color=7F77DD&text_color=888780&icon_color=1D9E75`}
        alt="GitHub stats"
        style={{ width:"100%", height:"auto" }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 6. 프로젝트 임팩트 숫자 카운터
// 사용: <ImpactStats />
// STATS 배열 수정으로 값 변경
// ══════════════════════════════════════════════════════════════
const STATS_KO = [
  { value: 4,   suffix: "년+", label: "현업 경험" },
  { value: 5,   suffix: "편",  label: "논문 기여" },
  { value: 10,  suffix: "회+", label: "공모전 수상" },
  { value: 0,   suffix: "$",   label: "이 사이트 운영 비용" },
];

const STATS_EN = [
  { value: 4,   suffix: "yrs+",  label: "Industry experience" },
  { value: 5,   suffix: "",      label: "Published papers" },
  { value: 10,  suffix: "+",     label: "Competition awards" },
  { value: 0,   suffix: "$",     label: "Cost to run this site" },
];

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);
  return val;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(value, active);
  return (
    <div ref={ref} style={{
      background:"var(--background-secondary)", borderRadius:12,
      padding:"1rem", textAlign:"center",
    }}>
      <div style={{ fontSize:28, fontWeight:500, color:"var(--neutral-on-background-strong)" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize:12, color:"var(--neutral-on-background-weak)", marginTop:4 }}>
        {label}
      </div>
    </div>
  );
}

export function ImpactStats() {
  const locale = useLocale();
  const STATS = locale === "en" ? STATS_EN : STATS_KO;
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10 }}>
      {STATS.map((s, i) => <StatCard key={i} {...s} />)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 7. 최근 Tistory 블로그 포스트 자동 표시
// 사용: <RecentBlogPosts feedUrl="https://your-blog.tistory.com/rss" />
// ══════════════════════════════════════════════════════════════
export function RecentBlogPosts({ feedUrl }: { feedUrl?: string }) {
  // TODO: RSS 파싱은 서버 컴포넌트에서 처리하거나 API Route 사용
  // 임시 더미 데이터 (실제 포스트로 교체)
  const posts = [
    { title:"Groq API로 무료 RAG 챗봇 만들기", date:"2025.04.10", url:"#" },
    { title:"Kubernetes HPA로 클라우드 비용 줄이기", date:"2025.04.07", url:"#" },
    { title:"이 포트폴리오를 어떻게 만들었나요?", date:"2025.04.05", url:"#" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {posts.map((p, i) => (
        <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"8px 0", borderBottom:"0.5px solid var(--neutral-alpha-weak)",
          textDecoration:"none", gap:8,
        }}>
          <span style={{ fontSize:13, color:"var(--neutral-on-background-strong)" }}>{p.title}</span>
          <span style={{ fontSize:11, color:"var(--neutral-on-background-weak)", flexShrink:0 }}>{p.date}</span>
        </a>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 8. Spotify 현재 재생 (Spotify API 연동 시 활성화)
// 사용: <SpotifyNowPlaying />
// .env.local에 SPOTIFY_* 키 필요
// ══════════════════════════════════════════════════════════════
export function SpotifyNowPlaying() {
  // TODO: /api/spotify/now-playing API Route 구현 후 활성화
  // const [track, setTrack] = useState(null);
  // useEffect(() => { fetch('/api/spotify/now-playing').then(r=>r.json()).then(setTrack) }, []);

  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10, padding:"8px 12px",
      border:"0.5px solid var(--neutral-alpha-medium)", borderRadius:10,
      background:"var(--background-overlay)",
    }}>
      <span style={{ fontSize:14 }}>🎵</span>
      <div>
        <div style={{ fontSize:11, color:"var(--neutral-on-background-weak)" }}>Spotify 연동 예정</div>
        <div style={{ fontSize:12, color:"var(--neutral-on-background-medium)" }}>
          {/* {track ? `${track.name} — ${track.artist}` : "오프라인"} */}
          아직 설정 전
        </div>
      </div>
    </div>
  );
}
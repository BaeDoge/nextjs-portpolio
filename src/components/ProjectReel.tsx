// 첫 화면 아래에 프로젝트 대표 이미지가 천천히 흐르는 띠. 마우스를 올리면 멈추고, 누르면 프로젝트로 이동합니다.
// 모션 줄이기 설정이면 흐르지 않고 가로로 직접 스크롤합니다.
import { getLocale } from "next-intl/server";
import { getPostsByLocale } from "@/utils/utils";

export default async function ProjectReel() {
  const locale = await getLocale();
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";

  const projects = getPostsByLocale(["src", "app", "[locale]", "work", "projects"], locale)
    .filter((p) => /\.(jpe?g|png|webp)$/i.test(p.metadata.images?.[0] ?? ""))
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime());

  if (projects.length < 3) return null;

  const renderCards = (hidden: boolean) =>
    projects.map((p) => (
      <a
        key={`${hidden ? "b" : "a"}-${p.slug}`}
        href={`${prefix}/work/${p.slug}`}
        className="reel-card"
        tabIndex={hidden ? -1 : undefined}
        aria-hidden={hidden || undefined}
      >
        <img src={p.metadata.images[0]} alt={hidden ? "" : p.metadata.title} loading="lazy" width={320} height={180} />
        <span className="reel-tag">{p.metadata.tag}</span>
        <span className="reel-title">{p.metadata.title}</span>
      </a>
    ));

  return (
    <section aria-label={isEn ? "Projects at a glance" : "프로젝트 한눈에 보기"} style={{ width: "100%" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, color: "var(--neutral-on-background-weak)", marginBottom: 12 }}>
        {isEn ? "PROJECTS AT A GLANCE" : "프로젝트 한눈에 보기"}
      </div>
      <div className="reel">
        <div className="reel-track">
          {renderCards(false)}
          {renderCards(true)}
        </div>
      </div>
    </section>
  );
}

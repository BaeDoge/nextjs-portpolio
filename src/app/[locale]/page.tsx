import { Fragment } from "react";
import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { getHomeText } from "@/resources/i18n-content";
import { getLocale } from "next-intl/server";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import Timeline from "@/components/Timeline";
import CasualIntroSection from "@/components/CasualIntroSection";
import ContactChallenge from "@/components/ContactChallenge";
import HighlightPanel from "@/components/HighlightPanel";
import { TypewriterRole } from "@/components/TypewriterRole";
import {
  VisitorCounter,
  StatusBadge,
  ImpactStats,
  SkillGrid,
  NowWidget,
} from "@/components/portfolio-widgets";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = getHomeText(locale as "ko" | "en");
  return Meta.generate({
    title: t.title,
    description: t.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const locale = await getLocale();
  const t = getHomeText(locale as "ko" | "en");
  const isEn = locale === "en";

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={t.title}
        description={t.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar_wide}`,
        }}
      />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          RevealFx 원래 방식 그대로 유지
      ══════════════════════════════════════════ */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured?.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">
                  {t.featured.role} · {t.featured.company}
                </Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="8">
            <Heading wrap="balance" variant="display-strong-l">
              {t.headline.map((line: string, i: number) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </Heading>
          </RevealFx>

          {/* 타이핑 효과 — Heading 바로 아래 */}
          <RevealFx translateY="8" delay={0.15} fillWidth horizontal="center" paddingBottom="16">
            <div style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              fontWeight: 500,
              height: 32,  // 높이 고정으로 레이아웃 안 흔들리게
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <TypewriterRole />
            </div>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t.subline}
            </Text>
          </RevealFx>

          {/* ↓ id="about" 제거 — 이게 마운트 시 스크롤 유발 */}
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar?.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* ══════════════════════════════════════════
          SECTION 2 — 프로필 이미지 + 미니 터미널
          Once UI Column/Row 대신 CSS grid 직접 사용
          (Once UI Row는 flex-wrap 없이 강제 가로라
           모바일에서 터지고, Column은 강제 세로라 안됨)
      ══════════════════════════════════════════ */}
        <RevealFx translateY="16" delay={0.5} fillWidth>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
                alignItems: "stretch",
                width: "100%",
                // ↓ 고정 높이 지정 — 터미널이 길어져도 이 높이 유지
                height: 800,
                maxHeight: 800,       // ← 추가
                overflow: "hidden",
              }}
            >
              {/* 프로필 이미지 */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  // height를 부모(480px)에 맞춤
                  height: "100%",
                  maxHeight:800,
                  background: "var(--neutral-alpha-weak)",
                }}
              >
                {person.avatar ? (
                  <img
                    src={person.avatar_wide}
                    alt={person.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", flexDirection: "column", gap: 12,
                    }}
                  >
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: "var(--neutral-alpha-medium)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, color: "var(--neutral-on-background-weak)",
                    }}>
                      {person.firstName?.[0]}{person.lastName?.[0]}
                    </div>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      /images/avatar_wide.jpg 추가 필요
                    </Text>
                  </div>
                )}
                {/* 이름 오버레이 */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "3rem 1.25rem 1.25rem",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}>
                  <div style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>{person.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{person.role}</div>
                </div>
              </div>

              {/* GitHub 실시간 활동 + 실적 하이라이트 — height 100% 로 부모 800px에 맞춤 */}
              <div style={{
                height: "100%",
                maxHeight: 800,
                overflow: "hidden"
              }}>
                <HighlightPanel />
              </div>
            </div>
          </div>
        </RevealFx>

      {/* ══════════════════════════════════════════
          SECTION 3 — 캐주얼 카드 (가로 그리드)
          CasualIntroSection 내부도 CSS grid 사용해야 함
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" delay={0.1} fillWidth>
        <div style={{ width: "100%" }}>
          <CasualIntroSection />
        </div>
      </RevealFx>


      {/* ══════════════════════════════════════════
          SECTION 4 — 임팩트 숫자
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        <div style={{ width: "100%" }}>
          <ImpactStats />
        </div>
      </RevealFx>

      {/* ══════════════════════════════════════════
          SECTION 9 — 주요 프로젝트
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        <Projects range={[1, 2]} />
      </RevealFx>



      {/* ══════════════════════════════════════════
          SECTION 6 — 타임라인 (중앙 정렬)
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        {/* 중앙 정렬을 위해 maxWidth + 자동 마진 사용 */}
        <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
          <Column gap="l" paddingY="xl">
            {/* 타이틀도 중앙 */}
            <div style={{ textAlign: "center" }}>
              <Heading as="h2" variant="display-strong-s">
                {isEn ? "My Timeline" : "배승호의 타임라인"}
              </Heading>
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
              >
                {isEn ? "— 2017 to present —" : "— 2017년부터 현재까지 —"}
              </Text>
            </div>
            <Timeline />
          </Column>
        </div>
      </RevealFx>

      {/* ══════════════════════════════════════════
          SECTION 7 — 기술 스택
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        <div style={{ width: "100%" }}>
          <Column gap="l">
            <Column gap="xs">
              <Heading as="h2" variant="display-strong-s">
                {isEn ? "Tech Stack" : "기술 스택"}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {/* 전체 스택 List-up */}
              </Text>
            </Column>
            <SkillGrid />
          </Column>
        </div>
      </RevealFx>


      {/* ══════════════════════════════════════════
          SECTION 8 — 상태 + 요즘 위젯
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        <Column gap="m" fillWidth>
          {/* <StatusBadge /> */}
          {/* <NowWidget /> */}
        </Column>
      </RevealFx>

      {/* ══════════════════════════════════════════
          SECTION 5 — 최근 블로그 포스트
      ══════════════════════════════════════════ */}
      {routes["/blog"] && (
        <RevealFx translateY="16" fillWidth>
          <Column fillWidth gap="24" marginBottom="l">
            <Row fillWidth paddingRight="64">
              <Line maxWidth={48} />
            </Row>
            <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
              <Row flex={1} paddingLeft="l" paddingTop="24">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  {isEn ? "Recent Posts" : "최근 블로그 글"}
                </Heading>
              </Row>
              <Row flex={3} paddingX="20">
                <Posts range={[1, 2]} columns="2" />
              </Row>
            </Row>
            <Row fillWidth paddingLeft="64" horizontal="end">
              <Line maxWidth={48} />
            </Row>
          </Column>
        </RevealFx>
      )}


      {/* ══════════════════════════════════════════
          SECTION 10 — 연락하기 (중앙 정렬)
      ══════════════════════════════════════════ */}
      <RevealFx translateY="16" fillWidth>
        {/* 중앙 정렬 */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Column gap="m" style={{ width: "100%", maxWidth: 520 }}>
            <Column gap="xs">
              <Heading as="h2" variant="display-strong-s">
                {isEn ? "Say hello." : "안녕하세요."}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {/* 저에게 메시지를 남겨주세요! */}
              </Text>
            </Column>
            <ContactChallenge />
          </Column>
        </div>
      </RevealFx>

      <VisitorCounter />
    </Column>
  );
}
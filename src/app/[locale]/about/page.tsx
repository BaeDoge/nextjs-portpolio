import { getLocale } from "next-intl/server";
import { getContent } from "@/resources/getContent";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  Flex,
  Badge,
} from "@once-ui-system/core";
import { baseURL, about as aboutKo, person as personKo, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import BadgeGrid from "@/components/BadgeGrid";

import PublicationList from "@/components/PublicationList";
// const AWARD_IMAGES: Record<string, string> = {
//   "KB국민은행 AI Challenge": "/awards/kb-ai-challenge.jpg",
//   "SK AI Challenge":         "/awards/sk-challenge.jpg",
//   "제19회 임베디드SW 경진대회": "/awards/embedded-sw.jpg",
//   "대한임베디드공학회 우수논문발표상": "/awards/best-paper.jpg",
//   "경북 공공데이터 AI 공모전": "/awards/pohang-technopark.jpg",
//   "해양경찰 데이터 활용 공모전": "/awards/coast-guard.jpg",
//   "인공지능 아이디어 공모전": "/awards/ai-idea.jpg",
//   "영남대 IoT 경진대회": "/awards/iot-competition.jpg",
//   "AI Speaker 데이터분석 경진대회": "/awards/ai-speaker.jpg",
// };



const about = aboutKo;
const person = personKo;

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default async function About() {
  const locale = await getLocale();
  const isEn = locale === "en";
  const c = getContent(locale);
  const about = c.about;
  const person = c.person;
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Send an Email</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                      .filter((item) => item.essential)
                      .map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
            <Row paddingTop="12" horizontal="center" fitWidth>
              <Button
                href={isEn ? "/resume.en.pdf" : "/resume.pdf"}
                prefixIcon="document"
                label={isEn ? "Download Resume" : "이력서 다운로드"}
                size="s"
                weight="default"
                variant="primary"
                download
              />
            </Row>
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>

              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text as="ul" gap="12" variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text as="ul" gap="12" variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
          <Column gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-s">Paper & Research</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {isEn
                ? "Papers published during my lab research and professional career."
                : "연구실 및 회사 생활 중 발표한 논문들입니다."}
            </Text>
            <PublicationList />
          </Column>
          {about.awards?.display && (
            <Column gap="l" paddingY="xl">
              <Heading as="h2" variant="display-strong-s">
                {about.awards.title}
              </Heading>
              <Column gap="m">
                {about.awards.items.map((item, i) => {
                  // const imgSrc = AWARD_IMAGES[item.title];
                  return (
                  <Flex
                    key={i}
                    // justifyContent="space-between"
                    // alignItems="center"
                    paddingY="s"
                    borderBottom="neutral-alpha-weak"
                  >
                    <Column gap="xs">
                      <div key={i}>
                        {/* {imgSrc && <img src={imgSrc} alt={item.title} />} */}
                        <Text variant="body-strong-m">{item.title}     </Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">
                              {item.org} · {item.year}
                        </Text>
                      </div>
                    </Column>
                      <Badge style={{ marginLeft: 'auto' }}>{item.award}</Badge>
                  </Flex>
                );})}
              </Column>
            </Column>
          )}

          {about.publications?.display && (
            <Column gap="l" paddingY="xl">
              <Heading as="h2" variant="display-strong-s">
                {about.publications.title}
              </Heading>
              <Column gap="m">
                {about.publications.items.map((pub, i) => (
                  <Column
                    key={i}
                    gap="xs"
                    padding="m"
                    border="neutral-alpha-weak"
                    radius="l"
                  >
                    <Flex gap="m">
                      <Text variant="body-strong-m">{pub.title}</Text>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {pub.year}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak">
                      {pub.venue}
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {pub.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </Column>
          )}
          <Column gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-s">{isEn ? "Technical Skills in Detail" : "기술 스택 상세"}</Heading>
            <Column gap="s">
              {[
                { area: isEn ? "Languages" : "언어", items: ["Python ★★★", "JavaScript ★★", "C/C++ ★★", "Kotlin ★"] },
                { area: "AI/ML", items: ["PyTorch", "TensorFlow", "LLM", "Hugging Face", "OpenCV", "RAG"] },
                { area: isEn ? "Backend" : "백엔드", items: ["Flask", "FastAPI", "REST API", "MySQL"] },
                { area: isEn ? "Infrastructure" : "인프라", items: ["Kubernetes", "AWS (EKS/EC2/S3/Lambda)", "Docker", "Jenkins"] },
                { area: isEn ? "Frontend" : "프론트", items: ["Bootstrap", "HTMX","Next.js","Tailwind CSS"] },
                // { area: "자격증", items: ["PCCP LV3", "PCCE Master", "ADsP"] },
              ].map((row) => (
                <Flex key={row.area} gap="m" paddingY="s"
                  borderBottom="neutral-alpha-weak">
                  <Text variant="body-strong-s" style={{ minWidth: 80 }} onBackground="neutral-weak">
                    {row.area}
                  </Text>
                  <Flex gap="s">
                    {row.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Column>
          </Column>

          {/* // 자격증 섹션 */}
          <Column gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-s">Certifications</Heading>
            <BadgeGrid />
          </Column>
          {/* {about.awards?.display && (
            <Column gap="l" paddingY="xl">
              <Heading as="h2" variant="display-strong-s">
                {about.awards.title}
              </Heading>
              <Column gap="m">
                {about.awards.items.map((item, i) => (
                  <Flex
                    key={i}
                    justifyContent="space-between"
                    alignItems="center"
                    paddingY="s"
                    borderBottom="neutral-alpha-weak"
                  >
                    <Column gap="xs">
                      <Text variant="body-strong-m">{item.title}</Text>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {item.org} · {item.year}
                      </Text>
                    </Column>
                    <Badge size="s">{item.award}</Badge>
                  </Flex>
                ))}
              </Column>
            </Column>
          )}

          {about.publications?.display && (
            <Column gap="l" paddingY="xl">
              <Heading as="h2" variant="display-strong-s">
                {about.publications.title}
              </Heading>
              <Column gap="m">
                {about.publications.items.map((pub, i) => (
                  <Column
                    key={i}
                    gap="xs"
                    padding="m"
                    border="neutral-alpha-weak"
                    radius="l"
                  >
                    <Flex justifyContent="space-between" alignItems="flex-start" gap="m">
                      <Text variant="body-strong-m">{pub.title}</Text>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {pub.year}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak">
                      {pub.venue}
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {pub.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </Column>
          )} */}

        </Column>
      </Row>
    </Column>
  );
}

// const awards = [
//   // 🏆 기업/기관 주최 (가장 권위 있는 것 위로)
//   { title: "KB국민은행 AI Challenge", award: "우수상", year: "2021", org: "KB Kookmin Bank" },
//   { title: "SK AI Challenge for Our Society", award: "우수상", year: "2021", org: "SK Telecom" },
//   { title: "AI Agent 개발 경진대회", award: "장려상", year: "2024", org: "-" },
//   { title: "임베디드 SW 경진대회", award: "아크데이타 대표이사상", year: "2021", org: "교육부 / 임베디드공학회" },

//   // 📊 데이터 & AI 공모전
//   { title: "경상북도 공공데이터 활용 AI 공모전", award: "우수상", year: "2021", org: "경상북도" },
//   { title: "해양경찰 데이터 활용 아이디어 공모전", award: "우수상", year: "2021", org: "해양경찰청" },
//   { title: "인공지능 학습용 데이터 활용 아이디어 공모전", award: "입상", year: "2021", org: "NIA" },
//   { title: "AI Speaker 활용 데이터분석 경진대회", award: "Creativity 상", year: "2021", org: "-" },

//   // 🎓 교내 & 기타
//   { title: "영남대학교 IoT 경진대회", award: "최우수상", year: "2021", org: "영남대학교" },
//   { title: "경찰청 인권영화제 공모전 (제9회)", award: "우수상", year: "2021", org: "경찰청" },
//   { title: "청소년 안전문화 콘텐츠 공모전", award: "우수상", year: "2021", org: "-" },
// ];

// // 논문 (학술지 먼저, 학술대회 다음)
// const publications = [
//   {
//     title: "PPG의 형태 및 Time-Domain Attributes를 활용한 딥러닝 기반 혈압 추정 연구",
//     venue: "한국통신학회 (KCA)", year: "2022",
//   },
//   {
//     title: "비접촉 광학식 주행거리계를 이용한 배관 내부 손상 위치 추정",
//     venue: "한국통신학회 (KCA)", year: "2022",
//   },
//   {
//     title: "딥러닝 기반 양치질 습관 분석 시스템 개발 (우수논문상)",
//     venue: "대한임베디드공학회 추계학술대회", year: "2021",
//   },
//   {
//     title: "ADHD Prediction using VibraImage Technology",
//     venue: "대한임베디드공학회", year: "2022",
//   },
//   {
//     title: "세그멘테이션 기반 항공사진 분석 모델의 최적화 연구",
//     venue: "대한임베디드공학회", year: "2022",
//   },
// ];
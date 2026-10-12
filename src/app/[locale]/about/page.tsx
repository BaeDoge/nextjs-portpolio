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

const about = aboutKo;
const person = personKo;

import { withAlternates } from "@/utils/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return withAlternates(
    Meta.generate({
      title: about.title,
      description: about.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
      path: about.path,
    }),
    about.path,
    locale,
  );
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
                  return (
                  <Flex
                    key={i}
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
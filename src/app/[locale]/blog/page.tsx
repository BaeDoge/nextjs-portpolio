import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { BlogFooterWidget } from "@/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPostsByLocale } from "@/utils/utils";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default async function Blog() {
  const locale = await getLocale();
  const allPosts = getPostsByLocale(["src", "app", "[locale]", "blog", "posts"], locale)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
    // Post 카드에 필요한 필드만 클라이언트로 넘김 (본문 content는 제외 — 페이로드 절약)
    .slice(1) // 맨 위 featured 1건은 아래서 <Posts range={[1,1]} /> 로 별도 표시
    .map(({ slug, metadata }) => ({ slug, metadata }));

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <BlogFooterWidget />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {locale === "en" ? "All posts" : "전체 글"}
        </Heading>
        <BlogTagFilter posts={allPosts} />
      </Column>
    </Column>
  );
}

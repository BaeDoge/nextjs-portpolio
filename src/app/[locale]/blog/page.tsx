import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { BlogFooterWidget } from "@/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPostsByLocale } from "@/utils/utils";
import { getLocale } from "next-intl/server";

import { PAGE_DESCRIPTIONS, withAlternates } from "@/utils/seo";

const PINNED_POST_SLUGS = ["how-this-portfolio-works", "college-life"];

export async function generateMetadata() {
  const locale = await getLocale();
  return withAlternates(
    Meta.generate({
      title: blog.title,
      description: PAGE_DESCRIPTIONS.blog[locale === "en" ? "en" : "ko"],
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: blog.path,
    }),
    blog.path,
    locale,
  );
}

export default async function Blog() {
  const locale = await getLocale();
  const posts = getPostsByLocale(["src", "app", "[locale]", "blog", "posts"], locale);
  // 현재 언어에 실제 존재하는 글만 고정합니다. 번역이 없는 글 때문에 일반 글이 누락되지 않도록 합니다.
  const pinnedPostSlugs = PINNED_POST_SLUGS.filter((slug) =>
    posts.some((post) => post.slug === slug),
  );
  const allPosts = posts
    .filter((post) => !pinnedPostSlugs.includes(post.slug))
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
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
        {pinnedPostSlugs.length > 0 && (
          <Posts range={[1, pinnedPostSlugs.length]} pinnedSlugs={pinnedPostSlugs} thumbnail />
        )}
        <BlogFooterWidget />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {locale === "en" ? "All posts" : "전체 글"}
        </Heading>
        <BlogTagFilter posts={allPosts} />
      </Column>
    </Column>
  );
}

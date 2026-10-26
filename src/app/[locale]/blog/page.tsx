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
  const allPosts = getPostsByLocale(["src", "app", "[locale]", "blog", "posts"], locale)
    .sort((a, b) => {
      const aPinnedIndex = PINNED_POST_SLUGS.indexOf(a.slug);
      const bPinnedIndex = PINNED_POST_SLUGS.indexOf(b.slug);

      if (aPinnedIndex !== -1 || bPinnedIndex !== -1) {
        if (aPinnedIndex === -1) return 1;
        if (bPinnedIndex === -1) return -1;
        return aPinnedIndex - bPinnedIndex;
      }

      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    })
    // 카드에 필요한 메타데이터만 클라이언트로 전달
    .slice(PINNED_POST_SLUGS.length)
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
        <Posts range={[1, 2]} pinnedSlugs={PINNED_POST_SLUGS} thumbnail />
        <BlogFooterWidget />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {locale === "en" ? "All posts" : "전체 글"}
        </Heading>
        <BlogTagFilter posts={allPosts} />
      </Column>
    </Column>
  );
}

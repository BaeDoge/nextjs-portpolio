import { getPostsByLocale } from "@/utils/utils";
import { getLocale } from "next-intl/server";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  pinnedSlugs?: string[];
}

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  pinnedSlugs = [],
  direction,
}: PostsProps) {
  const locale = await getLocale();
  let allBlogs = getPostsByLocale(["src", "app", "[locale]", "blog", "posts"], locale);
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    const aPinnedIndex = pinnedSlugs.indexOf(a.slug);
    const bPinnedIndex = pinnedSlugs.indexOf(b.slug);

    if (aPinnedIndex !== -1 || bPinnedIndex !== -1) {
      if (aPinnedIndex === -1) return 1;
      if (bPinnedIndex === -1) return -1;
      return aPinnedIndex - bPinnedIndex;
    }

    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}

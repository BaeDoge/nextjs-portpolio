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
}

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  const locale = await getLocale();
  let allBlogs = getPostsByLocale(["src", "app", "[locale]", "blog", "posts"], locale);
  // console.log("exclude:", exclude);
  // console.log("exclude isArray:", Array.isArray(exclude));
  // console.log(
  //   getPosts(["src", "app", "[locale]", "blog", "posts"]).map(post => ({
  //     slug: post?.slug,
  //     metadata: post?.metadata,
  //   }))
  // );
  // console.log("allBlogs:", allBlogs);
  // Exclude by slug (exact match)
  // allBlogs = allBlogs.filter(
  //   (post): post is NonNullable<typeof post> =>
  //     !!post && typeof post.slug === "string"
  // );
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
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

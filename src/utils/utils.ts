import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || "",
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    
    return {
      metadata,
      slug,
      content,
    };
  });
}

type PostCollection = "blog" | "work";

// Explicit content roots let Turbopack trace only the MDX directories.
const POST_DIRECTORIES: Record<PostCollection, string> = {
  blog: path.join(process.cwd(), "src", "app", "[locale]", "blog", "posts"),
  work: path.join(process.cwd(), "src", "app", "[locale]", "work", "projects"),
};

export function getPosts(collection: PostCollection) {
  return getMDXData(POST_DIRECTORIES[collection]);
}

/**
 * 로케일에 맞는 글 목록을 돌려줍니다.
 *  - ko: 기본 디렉터리의 글을 그대로 사용
 *  - en: en/ 에 같은 slug의 글이 있으면 그것으로 대체,
 *        없으면 한국어 글을 그대로 보여줍니다(번역 누락 시 빈 목록 방지).
 */
export function getPostsByLocale(collection: PostCollection, locale: string) {
  const koPosts = getPosts(collection);
  if (locale !== "en") return koPosts;

  const enDir = path.join(POST_DIRECTORIES[collection], "en");
  if (!fs.existsSync(enDir)) return koPosts;

  const enPosts = getMDXData(enDir);
  const enBySlug = new Map(enPosts.map((p) => [p.slug, p]));

  return koPosts.map((p) => enBySlug.get(p.slug) ?? p);
}

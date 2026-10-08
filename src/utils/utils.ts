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

// const postsCache = new Map<string, any[]>();
export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

/**
 * 로케일에 맞는 글 목록을 돌려줍니다.
 *  - ko: <dir>/ 의 글을 그대로 사용
 *  - en: <dir>/en/ 에 같은 slug의 글이 있으면 그것으로 대체,
 *        없으면 한국어 글을 그대로 보여줍니다(번역 누락 시 빈 목록 방지).
 */
export function getPostsByLocale(customPath: string[], locale: string) {
  const koPosts = getPosts(customPath);
  if (locale !== "en") return koPosts;

  const enDir = path.join(process.cwd(), ...customPath, "en");
  if (!fs.existsSync(enDir)) return koPosts;

  const enPosts = getMDXData(enDir);
  const enBySlug = new Map(enPosts.map((p) => [p.slug, p]));

  return koPosts.map((p) => enBySlug.get(p.slug) ?? p);
}

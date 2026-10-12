import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { routing } from "@/i18n/routing";

// "as-needed" 프리픽스 규칙과 동일하게: ko는 접두어 없이, en은 /en 접두어로 URL 생성
function localeUrl(path: string, locale: string) {
  return locale === routing.defaultLocale ? `${baseURL}${path}` : `${baseURL}/${locale}${path}`;
}

// 각 URL에 hreflang 대체 주소를 함께 선언합니다.
function withLocaleVariants(path: string, lastModified: string) {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localeUrl(path, l)]));
  return routing.locales.map((locale) => ({
    url: localeUrl(path, locale),
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap() {
  const posts = getPosts(["src", "app", "[locale]", "blog", "posts"]);
  const projects = getPosts(["src", "app", "[locale]", "work", "projects"]);

  // 정적 페이지의 수정일은 "오늘"이 아니라 가장 최근 콘텐츠 날짜를 사용합니다.
  const latest = [...posts, ...projects]
    .map((p) => p.metadata.publishedAt)
    .filter(Boolean)
    .sort()
    .pop() as string;

  const blogs = posts.flatMap((post) =>
    withLocaleVariants(`/blog/${post.slug}`, post.metadata.publishedAt),
  );
  const works = projects.flatMap((post) =>
    withLocaleVariants(`/work/${post.slug}`, post.metadata.publishedAt),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );
  const routes = activeRoutes.flatMap((route) =>
    withLocaleVariants(route !== "/" ? route : "", latest),
  );

  return [...routes, ...blogs, ...works];
}

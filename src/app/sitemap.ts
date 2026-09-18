import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { routing } from "@/i18n/routing";

// "as-needed" 프리픽스 규칙과 동일하게: ko는 접두어 없이, en은 /en 접두어로 URL 생성
function withLocaleVariants(path: string): { url: string }[] {
  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? `${baseURL}${path}` : `${baseURL}/${locale}${path}`,
  }));
}

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "[locale]", "blog", "posts"]).flatMap((post) =>
    withLocaleVariants(`/blog/${post.slug}`).map((entry) => ({
      ...entry,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = getPosts(["src", "app", "[locale]", "work", "projects"]).flatMap((post) =>
    withLocaleVariants(`/work/${post.slug}`).map((entry) => ({
      ...entry,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.flatMap((route) =>
    withLocaleVariants(route !== "/" ? route : "").map((entry) => ({
      ...entry,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}

// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transformers.js v4는 서버 런타임에서 직접 로드합니다.
  serverExternalPackages: ["@huggingface/transformers"],

  outputFileTracingIncludes: {
    // 임베딩/DB가 실패했을 때 프로필 내용으로 답변을 이어갈 수 있도록 포함합니다.
    "/api/chat": ["./kb/profile.ko.md", "./kb/profile.en.md"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // 외부 이미지 허용 도메인 (GitHub avatar, README 통계 위젯 등)
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github-readme-stats.vercel.app" },
      { protocol: "https", hostname: "streak-stats.demolab.com" },
    ],
  },

  async headers() {
    return [
      {
        // 이미지·폰트 정적 파일 1년 캐시
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|avif|svg|woff2|woff|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // MDX/JS 번들 캐시
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);

// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 네이티브 모듈(onnxruntime-node, sharp)은 번들링하지 않고 런타임에 그대로 불러옵니다.
  serverExternalPackages: ["@xenova/transformers", "onnxruntime-node", "sharp"],

  outputFileTracingIncludes: {
    // 임베딩/DB가 실패했을 때 챗봇이 프로필 내용으로 대신 답하려면 이 파일이 함수에 포함돼야 합니다.
    "/api/chat": ["./kb/profile.ko.md", "./kb/profile.en.md"],
  },
  outputFileTracingExcludes: {
    // Vercel(linux)에서 쓰지 않는 플랫폼용 바이너리를 빼서 함수 크기를 줄입니다.
    "/api/**": [
      "node_modules/onnxruntime-node/bin/napi-v3/darwin/**",
      "node_modules/onnxruntime-node/bin/napi-v3/win32/**",
    ],
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

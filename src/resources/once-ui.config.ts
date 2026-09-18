import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://portpolio-bae-seungho.vercel.app";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
  "/admin": true,
  
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutesConfig = {
  "/admin": true,
};

// Import and set font for each variant
//
// Geist는 latin subset만 있어서 한글이 전부 시스템 기본 폰트로 떨어집니다.
// 그래서 한글은 Pretendard 계열의 웹폰트인 IBM Plex Sans KR을 쓰고,
// 영문/숫자는 Geist를 우선 적용합니다. (fallback 배열 순서로 자동 처리)
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { IBM_Plex_Sans_KR } from "next/font/google";

const korean = IBM_Plex_Sans_KR({
  variable: "--font-korean",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  fallback: ["var(--font-korean)", "system-ui", "sans-serif"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  fallback: ["var(--font-korean)", "system-ui", "sans-serif"],
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  fallback: ["var(--font-korean)", "system-ui", "sans-serif"],
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  fallback: ["var(--font-korean)", "monospace"],
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// 한글 폰트는 fallback 체인으로만 쓰이지만, CSS 변수(--font-korean)가
// <html>에 실려야 동작하므로 layout.tsx에서 className으로 붙여줍니다.
export { korean };

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate | mint | rose | dusk | custom
  brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "red", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative | sharp
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: true,
    opacity: 50,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data
const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "KB Kookmin Bank",
  description: home.description,
  email: "doge@kbfg.com",
};

// social links
const sameAs: SameAsConfig = {
  threads: "https://www.threads.com/@cloge",
  linkedin: "https://www.linkedin.com/in/seung-ho-bae-7392b7282/",
  discord: "https://discord.gg/fXsxyCzJ",
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};

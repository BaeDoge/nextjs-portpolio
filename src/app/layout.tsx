// src/app/layout.tsx
// [locale] 세그먼트 쪽 layout.tsx가 실질적인 루트 레이아웃(html/body)을 갖고 있어서
// 여기는 통과만 시켜주는 pass-through 레이아웃입니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

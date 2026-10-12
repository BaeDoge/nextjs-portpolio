"use client";

import dynamic from "next/dynamic";

// 챗봇은 첫 화면 렌더링에 필요하지 않아 별도 번들로 늦게 불러옵니다.
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLazy() {
  return <ChatWidget />;
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { CONTACT_EMAIL } from "@/resources/contact";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const QUICK_KO = [
  "어떤 기술 스택을 쓰나요?",
  "현재 어디서 일하나요?",
  "대표 프로젝트가 뭔가요?",
  "연락 방법은요?",
];

const QUICK_EN = [
  "What tech stack do you use?",
  "Where are you working now?",
  "What are your key projects?",
  "How can I get in touch?",
];

export default function ChatWidget() {
  const isEn = useLocale() === "en";
  const QUICK = isEn ? QUICK_EN : QUICK_KO;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: isEn
        ? "Hi! I'm an AI agent that knows about Seung Ho \u{1F60A}\nAsk me anything!"
        : "안녕하세요! 저는 승호에 대한 AI 에이전트예요 \u{1F60A}\n궁금한 것을 물어보세요!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fallback = isEn
    ? `Sorry, I couldn't load an answer right now. Please try again in a moment, or email ${CONTACT_EMAIL}.`
    : `지금은 답변을 불러오지 못했어요. 잠시 후 다시 시도하시거나 ${CONTACT_EMAIL} 으로 문의해 주세요.`;
  const rateLimited = isEn
    ? "Too many questions in a short time. Please try again in a minute."
    : "짧은 시간에 질문이 많았어요. 1분 뒤에 다시 시도해 주세요.";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const setLastAssistant = (content: string) =>
    setMsgs((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    const newMsgs: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...newMsgs, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs, locale: isEn ? "en" : "ko" }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setLastAssistant(res.status === 429 ? rateLimited : fallback);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";
      let failed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE 이벤트는 빈 줄로 구분되며, 한 이벤트가 청크 경계에서 잘릴 수 있어 버퍼링합니다.
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.error) failed = true;
            if (payload.text) {
              full += payload.text;
              setLastAssistant(full);
            }
          } catch {
            // 형식이 맞지 않는 이벤트는 건너뜁니다.
          }
        }
      }

      if (!full) setLastAssistant(fallback);
      else if (failed) setLastAssistant(`${full}\n\n${fallback}`);
    } catch {
      setLastAssistant(fallback);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const title = isEn ? "AI Assistant" : "AI 어시스턴트";

  return (
    <>
      {/* Floating Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="chat-widget-button"
        aria-label={
          open
            ? isEn ? "Close chat assistant" : "챗봇 닫기"
            : isEn ? "Open chat assistant" : "챗봇 열기"
        }
        aria-expanded={open}
        aria-controls="chat-widget-panel"
      >
        <span aria-hidden="true">{open ? "✕" : "💬"}</span>
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          id="chat-widget-panel"
          className="chat-widget-panel"
          role="dialog"
          aria-label={title}
          onKeyDown={(e) => e.key === "Escape" && close()}
        >
          {/* Header */}
          <div className="chat-widget-header">
            <div>
              <div style={{ fontWeight: 600 }}>AI Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {isEn ? "Ask me anything about Seung Ho" : "승호에 대해 무엇이든 물어보세요"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="chat-widget-messages"
            role="log"
            aria-live="polite"
            aria-label={isEn ? "Conversation" : "대화 내용"}
          >
            {msgs.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.content || (loading && i === msgs.length - 1 ? "..." : "")}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          {msgs.length <= 1 && (
            <div className="quick-buttons">
              {QUICK.map((q) => (
                <button type="button" key={q} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-widget-input">
            <input
              ref={inputRef}
              value={input}
              maxLength={500}
              aria-label={isEn ? "Your question" : "질문 입력"}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) send();
              }}
              placeholder={isEn ? "Type your question..." : "질문을 입력하세요..."}
            />
            <button type="button" onClick={() => send()} disabled={loading || !input.trim()}>
              {isEn ? "Send" : "전송"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

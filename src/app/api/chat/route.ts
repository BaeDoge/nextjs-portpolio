// src/app/api/chat/route.ts
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@xenova/transformers";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 임베딩 모델 싱글턴 (Vercel 함수 재사용)
let embedder: any = null;
async function getEmbedder() {
  if (!embedder) {
    const { pipeline } = await import("@xenova/transformers");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
    );
  }
  return embedder;
}

async function embed(text: string): Promise<number[]> {
  const model = await getEmbedder();
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

export async function POST(req: Request) {
  const { messages, locale } = await req.json();
  const isEn = locale === "en";
  const lastQuestion = messages[messages.length - 1]?.content || "";

  // 1. 질문을 임베딩으로 변환
  const queryEmbedding = await embed(lastQuestion);

  // 2. Supabase에서 관련 청크 검색
  const { data: chunks } = await supabase.rpc("match_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: 0.4,
    match_count: 4,
  });

  // 3. 검색된 컨텍스트 조합
  const context = chunks?.map((c: any) => c.content).join("\n\n") || "";

  const systemPrompt = isEn
    ? `You are the AI assistant for Seung Ho Bae's portfolio.
Answer the question using the [Reference] below.
If the answer isn't in the reference, say "Please reach out directly at doge@kbfg.com".
Keep answers short — 2 to 4 sentences.
IMPORTANT: Always answer in English, even if the reference material or the question is written in Korean.

[Reference]
${context}`
    : `당신은 배승호의 포트폴리오 AI 어시스턴트입니다.
아래 [참고 정보]를 바탕으로 질문에 답하세요.
정보에 없는 내용은 "이메일(doge@kbfg.com)로 직접 문의해 주세요"라고 답하세요.
답변은 2~4문장으로 간결하게.
중요: 반드시 한국어로 답하세요.

[참고 정보]
${context}`;

  // 4. Groq으로 스트리밍 답변 생성
  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6),
    ],
    stream: true,
    temperature: 0.2,
    max_tokens: 400,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}

// import Groq from "groq-sdk";

// const SYSTEM_PROMPT = `
// 너는 배승호의 포트폴리오를 설명하는 AI 어시스턴트야.

// - 친절하고 간결하게 답변해
// - 없는 정보는 추측하지 마
// - 개발자 관점에서 설명해
// - 한국어로 답변해

// 필요한 경우 프로젝트, 기술 스택, 경력 등을 설명해줘.
// `;

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const stream = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       { role: "system", content: SYSTEM_PROMPT },
//       ...messages.slice(-6), // 최근 6개 메시지만 유지
//     ],
//     stream: true,
//     temperature: 0.3,
//     max_tokens: 400,
//   });

//   const encoder = new TextEncoder();
//   const readable = new ReadableStream({
//     async start(controller) {
//       for await (const chunk of stream) {
//         const text = chunk.choices[0]?.delta?.content || "";
//         if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
//       }
//       controller.enqueue(encoder.encode("data: [DONE]\n\n"));
//       controller.close();
//     },
//   });

//   return new Response(readable, {
//     headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
//   });
// }
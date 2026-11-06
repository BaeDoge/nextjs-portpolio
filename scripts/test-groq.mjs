import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

if (!apiKey) {
  console.error("GROQ_API_KEY가 .env에 설정되어 있지 않습니다.");
  process.exit(1);
}

try {
  const client = new Groq({ apiKey, timeout: 20_000, maxRetries: 0 });
  const result = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: "한국어로 'Groq 연결 정상'이라고만 답해 주세요." }],
    max_completion_tokens: 120,
    reasoning_effort: "low",
    include_reasoning: false,
  });
  console.log("Groq API 연결 성공");
  console.log("모델:", model);
  console.log("응답:", result.choices[0]?.message?.content ?? "(빈 응답)");
} catch (error) {
  console.error("Groq API 연결 실패");
  console.error("HTTP 상태:", error?.status ?? "확인 불가");
  console.error("오류:", error?.message ?? String(error));
  process.exitCode = 1;
}

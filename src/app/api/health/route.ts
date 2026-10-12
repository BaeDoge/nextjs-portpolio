// src/app/api/health/route.ts
// 챗봇 의존성(Supabase, 지식 베이스, Groq)을 점검합니다.
//  - /api/health            : 가벼운 점검
//  - /api/health?deep=1     : 임베딩 모델 로드까지 점검
// CRON_SECRET이 설정돼 있으면 `Authorization: Bearer <secret>` 또는 `?key=<secret>` 이 필요합니다.
import { runHealthChecks } from "@/utils/health";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const bearer = req.headers.get("authorization") === `Bearer ${secret}`;
    const queryKey = url.searchParams.get("key") === secret;
    if (!bearer && !queryKey) return new Response("Unauthorized", { status: 401 });
  }

  const result = await runHealthChecks(url.searchParams.get("deep") === "1");
  return Response.json(result, { status: result.ok ? 200 : 503 });
}

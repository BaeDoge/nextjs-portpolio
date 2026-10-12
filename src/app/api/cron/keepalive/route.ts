// src/app/api/cron/keepalive/route.ts
// Vercel Cron(vercel.json)이 하루 1회 호출합니다.
// Supabase가 7일 무쿼리로 일시정지되지 않게 하고, 지식 베이스 검색과 Groq 키도 함께 점검합니다.
// 호출 인증: Vercel 프로젝트에 CRON_SECRET 환경변수를 설정하면
// Vercel이 크론 호출 시 `Authorization: Bearer $CRON_SECRET` 헤더를 자동으로 붙입니다.
import { runHealthChecks } from "@/utils/health";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await runHealthChecks(false);
  if (!result.ok) console.error("[keepalive] 점검 실패:", JSON.stringify(result.checks));
  return Response.json(result, { status: result.ok ? 200 : 500 });
}

// src/app/api/cron/keepalive/route.ts
// Vercel Cron(vercel.json)이 하루 1회 호출 → Supabase에 가벼운 쿼리를 날려서
// 7일 무쿼리 슬립 조건에 걸리지 않게 함.
// 호출 인증: Vercel 프로젝트에 CRON_SECRET 환경변수를 설정해두면,
// Vercel이 크론 호출 시 자동으로 `Authorization: Bearer $CRON_SECRET` 헤더를 붙여줌.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  // CRON_SECRET이 설정돼 있다면 반드시 검증 (외부에서 아무나 두들기지 못하게)
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // 굳이 방문자 수 등 값을 가져올 필요 없이, 존재만 확인하는 최소 쿼리
    const { error } = await supabase.from("page_views").select("id").limit(1);

    if (error) {
      console.error("[keepalive] supabase query failed:", error.message);
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true, ts: new Date().toISOString() });
  } catch (err) {
    console.error("[keepalive] unexpected error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}

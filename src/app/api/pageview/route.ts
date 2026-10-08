import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { path } = await req.json();
  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";

  // 봇 필터링
  if (/bot|crawler|spider|headless/i.test(userAgent)) {
    return Response.json({ ok: false });
  }

  // IP 해시 (개인정보 보호 — 원본 IP 저장 안 함)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // 날짜 + IP 해시 → 같은 날 같은 사람은 1번만 카운트
  const today = new Date().toISOString().slice(0, 10);
  const ipHash = createHash("sha256")
    .update(ip + today + "salt_seungho_portfolio")
    .digest("hex")
    .slice(0, 16);

  await supabase.from("page_views").insert({
    path,
    user_agent: userAgent,
    referrer,
    ip_hash: ipHash,
  });

  return Response.json({ ok: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "total";

  if (type === "unique") {
    const { data } = await supabase
      .from("unique_visitors")
      .select("unique_count")
      .single();
    return Response.json({ count: data?.unique_count ?? 0 });
  }

  const { data } = await supabase
    .from("total_views")
    .select("total")
    .single();
  return Response.json({ total: data?.total ?? 0 });
}
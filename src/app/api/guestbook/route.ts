// src/app/api/guestbook/route.ts
import { createClient } from "@supabase/supabase-js";

// 서버에서만 실행 — service role key 안전하게 사용 가능
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET — 방명록 목록
export async function GET() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("message, nickname, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ entries: data });
}

// POST — 방명록 작성
export async function POST(req: Request) {
  const { message, nickname } = await req.json();

  if (!message || message.trim().length === 0) {
    return Response.json({ error: "메시지를 입력해주세요." }, { status: 400 });
  }
  if (message.length > 200) {
    return Response.json({ error: "200자 이하로 입력해주세요." }, { status: 400 });
  }

  const { error } = await supabase.from("guestbook").insert({
    message: message.trim().slice(0, 200),
    nickname: nickname || "익명-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true });
}
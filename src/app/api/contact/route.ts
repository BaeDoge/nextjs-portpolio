// src/app/api/contact/route.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { visitorType, interest, message, email } = body;

  // 1. Supabase 저장
  const { error } = await supabase.from("visitor_messages").insert({
    visitor_type: visitorType,
    interest,
    message: message?.trim() || null,
    email: email?.trim() || null,
  });

  if (error) {
    console.error("Supabase error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }

  // 2. Resend로 이메일 발송 (RESEND_API_KEY 있을 때만)
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (RESEND_KEY) {
    const typeLabel: Record<string, string> = {
      recruiter: "채용 담당자",
      curious: "방문자",
      collaborator: "협업 제안",
    };

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["doge@kbfg.com"],
        subject: `[포트폴리오] ${typeLabel[visitorType] ?? "방문자"} 메시지`,
        text: `방문자 유형: ${typeLabel[visitorType] ?? visitorType}
관심 분야: ${interest || "-"}
메시지: ${message || "(없음)"}
회신 이메일: ${email || "(없음)"}`,
      }),
    });
  }

  return Response.json({ success: true });
}
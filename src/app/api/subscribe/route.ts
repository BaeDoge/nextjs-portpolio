import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes("@"))
    return Response.json({ error: "invalid email" }, { status: 400 });

  await supabase.from("subscribers").upsert({ email }, { onConflict: "email" });
  return Response.json({ success: true });
}
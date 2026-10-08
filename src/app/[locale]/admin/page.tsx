// 간단한 비밀번호 보호 관리자 페이지
// 접근: /admin?key=YOUR_ADMIN_KEY

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";



const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminPage() {
  // 월간 통계
  const { data: monthly } = await supabase
    .from("monthly_views")
    .select("*")
    .limit(50);

  // 총 방문자
  const { data: total } = await supabase
    .from("total_views")
    .select("total")
    .single();

  // 최근 방문
  const { data: recent } = await supabase
    .from("page_views")
    .select("path, visited_at, referrer")
    .order("visited_at", { ascending: false })
    .limit(20);

  // 인기 페이지 (최근 30일)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: popular } = await supabase
    .from("page_views")
    .select("path")
    .gte("visited_at", thirtyDaysAgo);

  // 페이지별 집계
  const pageCount: Record<string, number> = {};
  popular?.forEach(r => { pageCount[r.path] = (pageCount[r.path] || 0) + 1; });
  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // 방문자 메시지
  const { data: messages } = await supabase
    .from("visitor_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: "2rem" }}>
        📊 포트폴리오 관리자
      </h1>

      {/* 요약 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: "2rem" }}>
        {[
          { label: "총 페이지뷰", value: total?.total?.toLocaleString() ?? "0" },
          { label: "이번 달", value: monthly?.filter(m => m.month === new Date().toISOString().slice(0, 7) + "-01T00:00:00+00:00").reduce((s, r) => s + Number(r.view_count), 0).toLocaleString() },
          { label: "방문자 메시지", value: messages?.length ?? 0 },
        ].map((card, i) => (
          <div key={i} style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem", border: "0.5px solid #333" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#fff" }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 인기 페이지 */}
      <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "0.5px solid #333" }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: "1rem" }}>인기 페이지 (최근 30일)</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#888", fontSize: 12 }}>
              <th style={{ textAlign: "left", padding: "6px 0" }}>페이지</th>
              <th style={{ textAlign: "right", padding: "6px 0" }}>방문 수</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map(([path, count], i) => (
              <tr key={i} style={{ borderTop: "0.5px solid #333", color: "#ccc", fontSize: 13 }}>
                <td style={{ padding: "8px 0" }}>{path}</td>
                <td style={{ textAlign: "right", padding: "8px 0", color: "#fff", fontWeight: 500 }}>{count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 월간 트렌드 */}
      <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "0.5px solid #333" }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: "1rem" }}>월간 통계</h2>
        {/* 월별 그룹핑 */}
        {(
          Object.entries(
            (monthly ?? []).reduce((acc, row) => {
              const month = new Date(row.month).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
              });
              acc[month] = (acc[month] || 0) + Number(row.view_count);
              return acc;
            }, {} as Record<string, number>)
          ) as [string, number][]
        ).map(([month, count], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? "0.5px solid #333" : "none", color: "#ccc", fontSize: 13 }}>
            <span>{month}</span>
            <span style={{ color: "#fff", fontWeight: 500 }}>{count.toLocaleString()} 뷰</span>
          </div>
        ))}
      </div>

      {/* 방문자 메시지 */}
      <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "0.5px solid #333" }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: "1rem" }}>방문자 메시지</h2>
        {messages?.map((msg, i) => (
          <div key={i} style={{ padding: "10px 0", borderTop: i > 0 ? "0.5px solid #333" : "none" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 11, color: "#666" }}>
              <span>{msg.visitor_type}</span>
              <span>·</span>
              <span>{msg.interest}</span>
              <span>·</span>
              <span>{new Date(msg.created_at).toLocaleString("ko-KR")}</span>
            </div>
            <div style={{ fontSize: 13, color: "#ccc" }}>{msg.message || "(메시지 없음)"}</div>
            {msg.email && <div style={{ fontSize: 12, color: "#5DCAA5", marginTop: 2 }}>{msg.email}</div>}
          </div>
        ))}
      </div>

      {/* 최근 방문 로그 */}
      <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "1.25rem", border: "0.5px solid #333" }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: "1rem" }}>최근 방문 로그</h2>
        {recent?.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: i > 0 ? "0.5px solid #333" : "none", fontSize: 12, color: "#888" }}>
            <span style={{ color: "#ccc" }}>{row.path}</span>
            <span>{new Date(row.visited_at).toLocaleString("ko-KR")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
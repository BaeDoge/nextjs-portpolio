// src/app/api/kb-map/route.ts
// 메인 화면의 "지식 지도"가 쓰는 좌표 데이터. DB를 쓸 수 없으면 빈 목록을 돌려주고 화면은 지도를 숨깁니다.
import { getKbMap } from "@/utils/kbmap";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  try {
    const points = await getKbMap();
    return Response.json(
      { points, total: points.length },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    console.error("[kb-map] 실패:", error);
    return Response.json(
      { points: [], total: 0, error: "unavailable" },
      { headers: { "Cache-Control": "public, s-maxage=60" } },
    );
  }
}

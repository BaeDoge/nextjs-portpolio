// 지식 베이스(portfolio_chunks)의 임베딩을 2차원 좌표로 만들어 "지식 지도"에 씁니다 (서버 전용).
import { getSupabase } from "@/utils/rag";
import { pca2 } from "@/utils/pca";

export interface KbPoint {
  id: number;
  x: number;
  y: number;
  c: "profile" | "project" | "blog" | "other";
  t: string; // 툴팁에 보일 앞부분
}

const TTL_MS = 60 * 60 * 1000;
let cache: { at: number; points: KbPoint[] } | null = null;

function category(raw: unknown): KbPoint["c"] {
  const v = String(raw ?? "").toLowerCase();
  if (v === "profile" || v === "blog" || v === "project") return v;
  return "other";
}

// 공개 사이트의 kb/ingest.mjs가 생성한 소스만 지도에 노출합니다.
// 이전 적재 데이터나 출처가 불명확한 청크는 API 응답에서 제외합니다.
function isPublishedSource(source: unknown, rawCategory: unknown): boolean {
  if (typeof source !== "string") return false;
  const c = category(rawCategory);
  if (c === "profile") return source === "profile:ko" || source === "profile:en";
  if (c === "blog") return /^blog:[^:]+:(ko|en)$/.test(source);
  if (c === "project") return /^work:[^:]+:(ko|en)$/.test(source);
  return false;
}

export async function getKbMap(): Promise<KbPoint[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.points;

  const { data, error } = await getSupabase()
    .from("portfolio_chunks")
    .select("id, source, category, content, embedding")
    // 최초 동기화 전의 legacy 청크(content_hash 없음)는 지도 API에 포함하지 않습니다.
    .not("content_hash", "is", null)
    .limit(2000);
  if (error) throw new Error(`지식 지도 조회 실패: ${error.message}`);

  // pgvector는 문자열("[0.1,0.2,...]")로 돌아옵니다.
  const rows = (data ?? [])
    .filter((r) => isPublishedSource(r.source, r.category))
    .map((r) => ({
      id: r.id as number,
      category: r.category,
      content: String(r.content ?? ""),
      vec: (typeof r.embedding === "string" ? JSON.parse(r.embedding) : r.embedding) as number[] | null,
    }))
    .filter((r) => Array.isArray(r.vec) && r.vec.length > 2);

  const coords = pca2(rows.map((r) => r.vec as number[]));
  const points = rows.map((r, i) => ({
    id: r.id,
    x: Number(coords[i][0].toFixed(4)),
    y: Number(coords[i][1].toFixed(4)),
    c: category(r.category),
    t: r.content.replace(/\s+/g, " ").slice(0, 110),
  }));

  cache = { at: Date.now(), points };
  return points;
}

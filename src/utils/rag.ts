// RAG 챗봇이 공통으로 쓰는 클라이언트와 헬퍼 (서버 전용)
import Groq from "groq-sdk";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const EMBEDDING_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
export const EMBEDDING_DIM = 384;
export const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// Supabase의 match_chunks(query_embedding, match_threshold, match_count) 함수를 사용합니다.
// (portfolio_chunks 테이블: id, content, embedding, category, created_at, source, locale, content_hash)
const MATCH_RPC = "match_chunks";

let supabaseClient: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
    supabaseClient = createClient(url, key, { auth: { persistSession: false } });
  }
  return supabaseClient;
}

let groqClient: Groq | null = null;
export function getGroq(): Groq {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY가 설정되지 않았습니다.");
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

// 임베딩 모델은 인스턴스당 한 번만 로드합니다.
// Vercel 서버리스는 /tmp 외에는 쓰기가 막혀 있어서 모델 캐시 경로를 /tmp로 지정합니다.
let embedderPromise: Promise<any> | null = null;
async function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = (async () => {
      const { pipeline, env } = await import("@xenova/transformers");
      env.allowLocalModels = false;
      env.cacheDir = "/tmp/transformers-cache";
      return pipeline("feature-extraction", EMBEDDING_MODEL);
    })().catch((error) => {
      embedderPromise = null; // 실패한 로드를 캐시하지 않음
      throw error;
    });
  }
  return embedderPromise;
}

export async function embed(text: string): Promise<number[]> {
  const model = await getEmbedder();
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

export interface Chunk {
  id?: number;
  content: string;
  category?: string;
  similarity?: number;
}

export async function retrieve(
  embedding: number[],
  { threshold = 0.4, count = 4 }: { threshold?: number; count?: number } = {},
): Promise<Chunk[]> {
  const supabase = getSupabase();
  const args = { query_embedding: embedding, match_threshold: threshold, match_count: count };

  const { data, error } = await supabase.rpc(MATCH_RPC, args);
  if (error) throw new Error(`지식 베이스 검색 실패: ${error.message}`);
  return (data ?? []) as Chunk[];
}

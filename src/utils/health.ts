// 챗봇이 의존하는 외부 서비스를 하나씩 확인합니다 (서버 전용).
import { EMBEDDING_DIM, embed, getGroq, getSupabase, retrieve } from "@/utils/rag";

export interface CheckResult {
  ok: boolean;
  ms: number;
  detail?: string;
}

async function timed(fn: () => Promise<string | void>): Promise<CheckResult> {
  const start = Date.now();
  try {
    const detail = await fn();
    return { ok: true, ms: Date.now() - start, ...(detail ? { detail } : {}) };
  } catch (error) {
    return {
      ok: false,
      ms: Date.now() - start,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * deep=true 이면 임베딩 모델까지 실제로 로드해 봅니다 (콜드스타트 때 느릴 수 있음).
 */
export async function runHealthChecks(deep = false) {
  const checks: Record<string, CheckResult> = {};

  checks.supabase = await timed(async () => {
    const { error } = await getSupabase().from("page_views").select("id").limit(1);
    if (error) throw new Error(error.message);
  });

  checks.knowledgeBase = await timed(async () => {
    const probe = new Array(EMBEDDING_DIM).fill(0);
    probe[0] = 1;
    const rows = await retrieve(probe, { threshold: -1, count: 1 });
    if (rows.length === 0) throw new Error("지식 베이스가 비어 있습니다.");
  });

  checks.groq = await timed(async () => {
    await getGroq().models.list();
  });

  if (deep) {
    checks.embedding = await timed(async () => {
      const vector = await embed("health check");
      if (vector.length !== EMBEDDING_DIM) {
        throw new Error(`임베딩 차원이 ${vector.length}입니다 (기대값 ${EMBEDDING_DIM}).`);
      }
    });
  }

  const ok = Object.values(checks).every((check) => check.ok);
  return { ok, checks, ts: new Date().toISOString() };
}

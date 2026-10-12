// kb/ingest.mjs
// 챗봇 지식 베이스(Supabase portfolio_chunks)를 사이트 콘텐츠로 다시 채웁니다.
//
//   node --env-file=.env.local kb/ingest.mjs                    # 실제 적재
//   node --env-file=.env.local kb/ingest.mjs --replace-legacy   # 최초 1회: 예전 데이터(content_hash 없음)도 삭제
//   node kb/ingest.mjs --dry                                    # 청크만 만들어 확인 (DB/모델 접근 없음)
//
// 필요한 환경변수: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// 먼저 kb/migrate.sql 을 실행해야 합니다. 변경된 청크만 임베딩하고,
// 더 이상 없는 청크는 삭제합니다 (내용 해시 기준).
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");
const REPLACE_LEGACY = process.argv.includes("--replace-legacy");
const TABLE = "portfolio_chunks";
const MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
const MAX_CHARS = 900;
const BATCH = 50;

// ── 1. 소스 수집 ─────────────────────────────────────────────

function mdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(dir, f));
}

function collectSources() {
  const sources = [];

  for (const locale of ["ko", "en"]) {
    const file = path.join(ROOT, "kb", `profile.${locale}.md`);
    if (fs.existsSync(file)) {
      sources.push({ source: `profile:${locale}`, locale, category: "profile", title: "Profile", body: fs.readFileSync(file, "utf8") });
    }
  }

  const base = path.join(ROOT, "src", "app", "[locale]");
  for (const kind of ["blog/posts", "work/projects"]) {
    for (const locale of ["ko", "en"]) {
      const dir = path.join(base, kind, ...(locale === "en" ? ["en"] : []));
      for (const file of mdxFiles(dir)) {
        const { data, content } = matter(fs.readFileSync(file, "utf8"));
        const slug = path.basename(file, ".mdx");
        sources.push({
          source: `${kind.split("/")[0]}:${slug}:${locale}`,
          locale,
          category: kind.startsWith("blog") ? "blog" : "project",
          title: data.title || slug,
          body: content,
        });
      }
    }
  }
  return sources;
}

// ── 2. MDX → 평문 ────────────────────────────────────────────

function mdxToText(src) {
  let t = src;
  t = t.replace(/```[\s\S]*?```/g, " "); // 코드 블록은 검색 품질을 떨어뜨려 제외
  // <Feedback title="" description="" />
  t = t.replace(/<Feedback[\s\S]*?\/>/g, (m) => {
    const title = /title="([^"]*)"/.exec(m)?.[1];
    const desc = /description="([^"]*)"/.exec(m)?.[1];
    return [title, desc].filter(Boolean).join(": ") + "\n";
  });
  // <Table data={{ rows: [[...], ...] }} />
  t = t.replace(/<Table[\s\S]*?\/>/g, (m) => {
    const rows = m.split("rows:")[1] ?? "";
    return (
      [...rows.matchAll(/\[((?:\s*"[^"]*"\s*,?)+)\]/g)]
        .map((r) => [...r[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]).join(" | "))
        .join("\n") + "\n"
    );
  });
  // AccordionGroup
  t = t.replace(/<AccordionGroup[\s\S]*?\/>\s*$/gm, (m) => {
    const titles = [...m.matchAll(/title:\s*"([^"]*)"/g)].map((x) => x[1]);
    const texts = [...m.matchAll(/<Text[^>]*>([\s\S]*?)<\/Text>/g)].map((x) => x[1].trim());
    return titles.map((ti, i) => `${ti}: ${texts[i] ?? ""}`).join("\n") + "\n";
  });
  t = t.replace(/<\/?[A-Z][A-Za-z]*(?:\s[^<>]*?)?\/?>/g, " "); // 남은 JSX 태그
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ""); // 이미지
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"); // 링크
  t = t.replace(/\n{3,}/g, "\n\n");
  return t.trim();
}

// ── 3. 청킹 ──────────────────────────────────────────────────

function chunkSource({ title, body }) {
  const text = body.includes("<") || body.includes("```") ? mdxToText(body) : body;
  const sections = text.split(/\n(?=#{1,2}\s)/);
  const chunks = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = /^#{1,2}\s/.test(lines[0]) ? lines.shift().replace(/^#+\s*/, "") : "";
    const paragraphs = lines.join("\n").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    let buf = "";
    const flush = () => {
      if (buf.trim()) chunks.push(`[${title}${heading ? ` / ${heading}` : ""}]\n${buf.trim()}`);
      buf = "";
    };
    for (const p of paragraphs) {
      if (buf && buf.length + p.length > MAX_CHARS) flush();
      buf += (buf ? "\n\n" : "") + p;
    }
    flush();
  }
  return chunks;
}

const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");

function buildChunks() {
  const out = [];
  for (const s of collectSources()) {
    for (const content of chunkSource(s)) {
      out.push({ content_hash: sha1(`${s.locale}|${s.source}|${content}`), source: s.source, locale: s.locale, category: s.category, content });
    }
  }
  return out;
}

// ── 4. 실행 ──────────────────────────────────────────────────

async function main() {
  const chunks = buildChunks();
  const bySource = new Set(chunks.map((c) => c.source));
  console.log(`청크 ${chunks.length}개 (소스 ${bySource.size}개)`);

  if (DRY) {
    const sample = chunks[Math.floor(chunks.length / 2)];
    console.log("\n--- 샘플 청크 ---\n" + sample?.content);
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 필요합니다.");

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // 이미 적재된 해시를 모두 가져옵니다 (PostgREST 기본 1,000행 제한 때문에 나눠서 조회).
  const existingHashes = new Set();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("content_hash")
      .not("content_hash", "is", null)
      .range(from, from + 999);
    if (error) throw new Error(`기존 청크 조회 실패: ${error.message} (kb/migrate.sql 을 실행했는지 확인하세요)`);
    data.forEach((r) => existingHashes.add(r.content_hash));
    if (data.length < 1000) break;
  }

  const fresh = chunks.filter((c) => !existingHashes.has(c.content_hash));
  console.log(`새로 임베딩할 청크 ${fresh.length}개, 유지 ${chunks.length - fresh.length}개`);

  if (fresh.length) {
    const { pipeline } = await import("@xenova/transformers");
    const embedder = await pipeline("feature-extraction", MODEL);

    for (let i = 0; i < fresh.length; i += BATCH) {
      const rows = [];
      for (const c of fresh.slice(i, i + BATCH)) {
        const out = await embedder(c.content, { pooling: "mean", normalize: true });
        rows.push({ ...c, embedding: Array.from(out.data), created_at: new Date().toISOString() });
      }
      const { error } = await supabase.from(TABLE).upsert(rows, { onConflict: "content_hash" });
      if (error) throw new Error(`적재 실패: ${error.message}`);
      console.log(`  ${Math.min(i + BATCH, fresh.length)} / ${fresh.length}`);
    }
  }

  // 새 데이터 적재가 끝난 뒤에만 삭제합니다 (실패해도 지식 베이스가 비지 않도록).
  const keep = new Set(chunks.map((c) => c.content_hash));
  const stale = [...existingHashes].filter((h) => !keep.has(h));
  for (let i = 0; i < stale.length; i += BATCH) {
    const { error } = await supabase.from(TABLE).delete().in("content_hash", stale.slice(i, i + BATCH));
    if (error) throw new Error(`삭제 실패: ${error.message}`);
  }
  console.log(`삭제한 오래된 청크 ${stale.length}개`);

  if (REPLACE_LEGACY) {
    const { count, error } = await supabase
      .from(TABLE)
      .delete({ count: "exact" })
      .is("content_hash", null);
    if (error) throw new Error(`예전 데이터 삭제 실패: ${error.message}`);
    console.log(`예전 데이터(content_hash 없음) ${count ?? 0}개 삭제`);
  } else {
    const { count } = await supabase.from(TABLE).select("id", { count: "exact", head: true }).is("content_hash", null);
    if (count) console.log(`참고: content_hash 가 없는 예전 데이터가 ${count}개 남아 있습니다. 필요하면 --replace-legacy 로 삭제하세요.`);
  }
  console.log("완료.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

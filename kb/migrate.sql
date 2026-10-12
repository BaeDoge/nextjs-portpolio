-- 챗봇 지식 베이스 마이그레이션 (Supabase SQL Editor에서 순서대로 실행)
-- 대상: 기존 portfolio_chunks(id, content, embedding, category, created_at) 테이블과 match_chunks 함수
-- match_chunks 함수는 그대로 사용하므로 수정하지 않습니다.

-- 1) 기존 데이터 백업 (되돌릴 수 있도록 먼저 실행)
create table if not exists portfolio_chunks_backup as
  select * from portfolio_chunks;

-- 2) 동기화용 컬럼과 유니크 인덱스 추가
alter table portfolio_chunks add column if not exists source       text;
alter table portfolio_chunks add column if not exists locale       text;
alter table portfolio_chunks add column if not exists content_hash text;

create unique index if not exists portfolio_chunks_content_hash_key
  on portfolio_chunks (content_hash);

-- 3) 확인용 조회 (결과를 확인한 뒤 다음으로 진행)
-- 3-1) 임베딩 차원: 384 여야 합니다 (Xenova/paraphrase-multilingual-MiniLM-L12-v2)
select vector_dims(embedding) as dims, count(*) from portfolio_chunks group by 1;

-- 3-2) id 컬럼에 기본값이 있어야 새 행을 넣을 수 있습니다. column_default 가 비어 있으면 4)를 실행하세요.
select column_default, is_identity
from information_schema.columns
where table_name = 'portfolio_chunks' and column_name = 'id';

-- 3-3) 기존 카테고리 분포 (참고용)
select category, count(*) from portfolio_chunks group by 1 order by 2 desc;

-- 4) (3-2에서 column_default 가 비어 있을 때만 실행)
-- create sequence if not exists portfolio_chunks_id_seq owned by portfolio_chunks.id;
-- select setval('portfolio_chunks_id_seq', coalesce((select max(id) from portfolio_chunks), 0) + 1, false);
-- alter table portfolio_chunks alter column id set default nextval('portfolio_chunks_id_seq');

-- 5) 최초 1회 적재 후 이전 데이터 삭제가 필요하면 ingest.mjs 를 --replace-legacy 로 실행합니다.
--    (content_hash 가 비어 있는 기존 행만 삭제됩니다.)
--
-- 롤백: truncate portfolio_chunks; insert into portfolio_chunks select * from portfolio_chunks_backup;
--      (backup 에는 새 컬럼이 없으므로 컬럼 목록을 맞춰 insert 하세요)

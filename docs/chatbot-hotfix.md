# 챗봇 핫픽스 적용 안내

- 임베딩 런타임을 `@huggingface/transformers@4.3.2`로 교체
- 로컬 Windows와 Vercel의 모델 캐시 경로 분리
- Groq 모델을 `openai/gpt-oss-120b`로 변경
- `max_completion_tokens`와 낮은 reasoning effort 적용
- Groq API 단독 점검 스크립트 추가
- 떠다니는 기술 라벨과 파티클 모드 버튼 제거
- 첫 진입 파티클 인트로와 3D 틸트 유지

## Windows CMD
기존 `.env`는 보존하고 `GROQ_MODEL=openai/gpt-oss-120b`로 설정합니다. Node 24.x 사용을 권장합니다.

```cmd
rmdir /s /q node_modules
rmdir /s /q .next
npm install
npm run test:groq
npm run dev
```

이번 커밋에서는 npm registry에 접근할 수 없어 `package-lock.json`을 갱신하지 못했습니다. 첫 설치는 `npm ci`가 아닌 `npm install`로 진행한 뒤, 생성된 lock 파일을 다음 커밋에 포함해야 합니다.

임베딩 모델 ID는 기존 `Xenova/paraphrase-multilingual-MiniLM-L12-v2` 그대로 유지합니다. Supabase 데이터를 삭제하거나 재적재하지 말고, 우선 Groq 단독 테스트와 RAG 질의를 확인하세요.

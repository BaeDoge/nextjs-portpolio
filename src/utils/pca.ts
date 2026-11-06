// 벡터 목록을 2차원으로 줄이는 PCA (거듭제곱법). 지식 지도 좌표를 만드는 데 씁니다.
export function pca2(vectors: number[][]): [number, number][] {
  const n = vectors.length;
  if (n === 0) return [];
  const d = vectors[0].length;

  // 평균을 빼서 중심화
  const mean = new Array<number>(d).fill(0);
  for (const v of vectors) for (let j = 0; j < d; j++) mean[j] += v[j] / n;
  const X = vectors.map((v) => v.map((x, j) => x - mean[j]));

  const comps: number[][] = [];
  for (let c = 0; c < 2; c++) {
    // 결정적인 초기값(항상 같은 지도가 나오도록)
    let w = Array.from({ length: d }, (_, j) => Math.sin(j * 12.9898 + c * 78.233));
    for (let iter = 0; iter < 60; iter++) {
      const xw = X.map((row) => row.reduce((s, x, j) => s + x * w[j], 0));
      const next = new Array<number>(d).fill(0);
      for (let i = 0; i < n; i++) for (let j = 0; j < d; j++) next[j] += X[i][j] * xw[i];
      // 이미 찾은 성분 방향을 제거(직교화)
      for (const prev of comps) {
        const dot = next.reduce((s, x, j) => s + x * prev[j], 0);
        for (let j = 0; j < d; j++) next[j] -= dot * prev[j];
      }
      const norm = Math.hypot(...next) || 1;
      w = next.map((x) => x / norm);
    }
    comps.push(w);
  }

  const raw = X.map((row) => [
    row.reduce((s, x, j) => s + x * comps[0][j], 0),
    row.reduce((s, x, j) => s + x * comps[1][j], 0),
  ]);

  // 극단값에 휘둘리지 않도록 2~98 백분위로 [-1, 1] 범위에 맞춤
  const scale = (axis: 0 | 1) => {
    const sorted = raw.map((p) => p[axis]).sort((a, b) => a - b);
    const lo = sorted[Math.floor(n * 0.02)];
    const hi = sorted[Math.min(n - 1, Math.floor(n * 0.98))];
    const span = hi - lo || 1;
    return (v: number) => Math.max(-1, Math.min(1, ((v - lo) / span) * 2 - 1));
  };
  const sx = scale(0);
  const sy = scale(1);
  return raw.map((p) => [sx(p[0]), sy(p[1])] as [number, number]);
}

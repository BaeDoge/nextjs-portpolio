// 1. TechStack — 기술 스택 뱃지 모음
export function TechStack({ items }: { items: string[] }) {
  const COLORS: Record<string, { bg: string; text: string }> = {
    Python:     { bg: "#3776AB22", text: "#3776AB" },
    Kubernetes: { bg: "#326CE522", text: "#326CE5" },
    AWS:        { bg: "#FF990022", text: "#CC7700" },
    React:      { bg: "#61DAFB22", text: "#0A7A9B" },
    FastAPI:    { bg: "#00928622", text: "#006B62" },
    MySQL:      { bg: "#4479A122", text: "#2D5F87" },
    Docker:     { bg: "#2496ED22", text: "#1A6FA8" },
    TensorFlow: { bg: "#FF6F0022", text: "#CC4F00" },
    PyTorch:    { bg: "#EE4C2C22", text: "#AA2A0A" },
    LSTM:       { bg: "#7F77DD22", text: "#534AB7" },
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "12px 0" }}>
      {items.map(item => {
        const color = COLORS[item] ?? { bg: "var(--neutral-alpha-weak)", text: "var(--neutral-on-background-medium)" };
        return (
          <span key={item} style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            background: color.bg, color: color.text,
            border: `1px solid ${color.text}33`,
          }}>{item}</span>
        );
      })}
    </div>
  );
}

// 2. MetricRow — 주요 수치 강조
export function MetricRow({ items }: { items: { value: string; label: string; color?: string }[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap: 12, margin: "16px 0",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          textAlign: "center", padding: "16px 12px",
          background: "var(--neutral-alpha-weak)",
          borderRadius: 10,
          borderTop: `3px solid ${item.color ?? "var(--brand-solid-strong)"}`,
        }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: item.color ?? "var(--neutral-on-background-strong)" }}>
            {item.value}
          </div>
          <div style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", marginTop: 4 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. CalloutBox — 중요 메모/인사이트 박스
export function CalloutBox({
  type = "info",
  children
}: {
  type?: "info" | "warning" | "success" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info:    { border: "#378ADD", bg: "#E6F1FB", icon: "💡" },
    warning: { border: "#EF9F27", bg: "#FAEEDA", icon: "⚠️" },
    success: { border: "#1D9E75", bg: "#E1F5EE", icon: "✅" },
    tip:     { border: "#7F77DD", bg: "#EEEDFE", icon: "🎯" },
  }[type];

  return (
    <div style={{
      margin: "16px 0", padding: "12px 16px",
      background: styles.bg, borderRadius: "0 10px 10px 0",
      borderLeft: `4px solid ${styles.border}`,
      fontSize: 13, lineHeight: 1.7,
    }}>
      <span style={{ marginRight: 8 }}>{styles.icon}</span>
      {children}
    </div>
  );
}

// 4. ImageGrid — 이미지 그리드 (스크린샷 여러 개)
export function ImageGrid({ images }: { images: { src: string; caption?: string }[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(images.length, 3)}, 1fr)`,
      gap: 10, margin: "16px 0",
    }}>
      {images.map((img, i) => (
        <div key={i} style={{ borderRadius: 8, overflow: "hidden",
          border: "0.5px solid var(--neutral-alpha-medium)" }}>
          <img src={img.src} alt={img.caption ?? `이미지 ${i + 1}`}
            style={{ width: "100%", display: "block", objectFit: "cover" }} />
          {img.caption && (
            <div style={{ padding: "6px 8px", fontSize: 11,
              color: "var(--neutral-on-background-weak)", textAlign: "center" }}>
              {img.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
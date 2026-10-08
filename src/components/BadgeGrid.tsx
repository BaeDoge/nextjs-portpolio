// src/components/BadgeGrid.tsx
export default function BadgeGrid() {
    const badges = [
      {
        label: "PCCP LV3",
        sub: "Programmers Certified",
        color: "#3366FF",
        bg: "#EEF2FF",
        fg: "#1A3399",
        year: "2024",
      },
      {
        label: "PCCE Master",
        sub: "Programmers Essential",
        color: "#3366FF",
        bg: "#EEF2FF",
        fg: "#1A3399",
        year: "2024",
      },
      {
        label: "ADsP",
        sub: "데이터분석준전문가",
        color: "#0066CC",
        bg: "#E6F0FF",
        fg: "#003D7A",
        year: "2025",
      },
      {
        label: "은행실무종합능력",
        sub: "2023·2024·2025 수료",
        color: "#D4AF37",
        bg: "#FFF8E1",
        fg: "#7A6000",
        year: "3년 연속",
      },
      {
        label: "금융 직무자격 4종",
        sub: "상품판매·집합투자·AI·데이터",
        color: "#1D9E75",
        bg: "#E1F5EE",
        fg: "#085041",
        year: "2024",
      },
    ];
  
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {badges.map((b) => (
          <div key={b.label} style={{
            background: b.bg,
            border: `1px solid ${b.color}30`,
            borderRadius: 10,
            padding: "0.85rem",
            textAlign: "center",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: b.color, margin: "0 auto 8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                {b.label.slice(0, 2)}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: b.fg }}>{b.label}</div>
            <div style={{ fontSize: 11, color: b.fg, opacity: 0.75, marginTop: 2 }}>{b.sub}</div>
            <div style={{ fontSize: 10, color: b.fg, opacity: 0.55, marginTop: 4 }}>{b.year}</div>
          </div>
        ))}
      </div>
    );
  }
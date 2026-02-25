import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function TitleEditor({ title, setTitle, year, setYear }) {
  const { theme } = useCompanyProfile();

  const sectionStyle = {
    marginBottom: 20,
    padding: "20px 24px",
    background: theme.white,
    borderRadius: 12,
    border: "1px solid #E8E8E8",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };
  const labelStyle = {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    fontSize: 13,
    fontWeight: 800,
    background: theme.info,
    color: "white",
    flexShrink: 0,
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>
        <span style={badgeStyle}>2</span>
        <span>채용공고 제목</span>
      </div>
      <div style={{ fontSize: 11, color: theme.sub, marginBottom: 8 }}>
        첫째 줄 = 상단 배너, 둘째 줄 이후 = 메인 제목
      </div>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={2}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "1px solid #DDD",
          borderRadius: 8,
          fontSize: 14,
          lineHeight: 1.5,
          resize: "vertical",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />
      <div style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>기준 연도:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
          style={{
            width: 80,
            padding: "6px 10px",
            border: "1px solid #DDD",
            borderRadius: 6,
            fontSize: 13,
          }}
        />
      </div>
    </div>
  );
}

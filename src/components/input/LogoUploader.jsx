import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function LogoUploader({ logoUrl, onLogoChange }) {
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
    background: logoUrl ? theme.success : theme.info,
    color: "white",
    flexShrink: 0,
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>
        <span style={badgeStyle}>4</span>
        <span>기업 로고 (선택)</span>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onLogoChange}
        style={{ fontSize: 13 }}
      />
      {logoUrl && (
        <div
          style={{
            marginTop: 10,
            padding: 12,
            background: theme.gray,
            borderRadius: 8,
            display: "inline-block",
          }}
        >
          <img src={logoUrl} alt="logo" style={{ height: 40, objectFit: "contain" }} />
          <span style={{ marginLeft: 10, fontSize: 12, color: theme.success, fontWeight: 600 }}>
            ✓ 적용됨
          </span>
        </div>
      )}
    </div>
  );
}

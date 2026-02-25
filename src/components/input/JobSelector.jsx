import { matchJobs } from "../../utils/sheets";
import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function JobSelector({
  jobInput,
  setJobInput,
  sheetLoaded,
  availableJobs,
  allGroups,
}) {
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
        <span style={badgeStyle}>3</span>
        <span>모집 직무 선택</span>
      </div>
      <div style={{ fontSize: 11, color: theme.sub, marginBottom: 8 }}>
        공고에 포함할 직무명을 콤마(,)로 구분하여 입력
      </div>
      <input
        type="text"
        value={jobInput}
        onChange={(e) => setJobInput(e.target.value)}
        placeholder={
          sheetLoaded
            ? `예: ${availableJobs.slice(0, 2).join(", ")}`
            : "먼저 시트 데이터를 불러오세요"
        }
        disabled={!sheetLoaded}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "1px solid #DDD",
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "inherit",
          boxSizing: "border-box",
          background: sheetLoaded ? theme.white : "#F0F0F0",
        }}
      />
      {sheetLoaded && jobInput && (
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {jobInput
            .split(",")
            .map((q) => q.trim())
            .filter(Boolean)
            .map((q, i) => {
              const found = matchJobs(allGroups, [q]).length > 0;
              return (
                <span
                  key={i}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 14,
                    fontSize: 12,
                    fontWeight: 600,
                    background: found ? theme.successLight : theme.primaryLight,
                    color: found ? theme.success : theme.primary,
                    border: `1px solid ${found ? theme.success : theme.primary}`,
                  }}
                >
                  {q} {found ? "✓" : "✗"}
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
}

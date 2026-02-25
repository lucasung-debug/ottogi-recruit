import { useCompanyProfile } from "../context/CompanyProfileContext";
import Poster from "../components/poster/Poster";

export default function PreviewPage({
  posterRef,
  title,
  matchedJobs,
  processSteps,
  schedule,
  year,
  finalHireMonth,
  logoUrl,
  downloading,
  onBack,
  onDownload,
}) {
  const { theme } = useCompanyProfile();
  const scale =
    typeof window !== "undefined"
      ? Math.min(1, (window.innerWidth - 60) / 860)
      : 0.6;

  return (
    <div
      style={{
        fontFamily: "'Apple SD Gothic Neo','Malgun Gothic',sans-serif",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "white",
          borderBottom: "1px solid #E0E0E0",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            padding: "8px 16px",
            background: theme.gray,
            border: "1px solid #CCC",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← 설정으로
        </button>
        <button
          onClick={onDownload}
          disabled={downloading}
          style={{
            padding: "10px 24px",
            background: theme.primary,
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: downloading ? "wait" : "pointer",
            boxShadow: `0 2px 8px ${theme.primary}40`,
            opacity: downloading ? 0.6 : 1,
          }}
        >
          {downloading ? "생성 중..." : "📥 PNG 다운로드"}
        </button>
        <div style={{ flex: 1, fontSize: 11, color: theme.sub, textAlign: "right" }}>
          미리보기 ({Math.round(scale * 100)}%)
        </div>
      </div>

      {/* 포스터 미리보기 */}
      <div
        style={{
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#E8E8E8",
          minHeight: "60vh",
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
          <Poster
            ref={posterRef}
            title={title}
            jobs={matchedJobs}
            processSteps={processSteps}
            schedule={schedule}
            year={year}
            finalHireMonth={finalHireMonth}
            logoUrl={logoUrl}
          />
        </div>
      </div>
    </div>
  );
}

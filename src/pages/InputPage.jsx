import { Link } from "react-router-dom";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import SheetLoader from "../components/input/SheetLoader";
import TitleEditor from "../components/input/TitleEditor";
import JobSelector from "../components/input/JobSelector";
import LogoUploader from "../components/input/LogoUploader";

export default function InputPage({
  title,
  setTitle,
  year,
  setYear,
  sheetUrl,
  setSheetUrl,
  jobInput,
  setJobInput,
  logoUrl,
  sheetLoaded,
  dataMode,
  showManual,
  setShowManual,
  manualTSV,
  setManualTSV,
  availableJobs,
  allGroups,
  loading,
  error,
  onFetchSheet,
  onManualPaste,
  onLogoChange,
  onGenerate,
}) {
  const { profile, theme } = useCompanyProfile();

  return (
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "16px 16px 30px",
        fontFamily: "'Apple SD Gothic Neo','Malgun Gothic',sans-serif",
        background: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          textAlign: "center",
          margin: "10px 0 24px",
          padding: "28px 20px",
          background: "linear-gradient(135deg,#E8F5E9,#FFF9C4,#E3F2FD)",
          borderRadius: 16,
          border: `2px solid ${theme.success}`,
        }}
      >
        <div style={{ fontSize: 13, color: theme.sub, marginBottom: 2 }}>
          {profile.companyName}
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: theme.text }}>
          채용공고 자동 생성기
        </div>
        <div style={{ fontSize: 12, color: theme.sub, marginTop: 4 }}>
          Google Sheets 데이터 기반 채용공고 포스터 자동 생성
        </div>
        <Link
          to="/setup"
          style={{
            display: "inline-block",
            marginTop: 8,
            fontSize: 12,
            color: theme.secondary,
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          기업 설정 변경
        </Link>
      </div>

      <SheetLoader
        sheetUrl={sheetUrl}
        setSheetUrl={setSheetUrl}
        loading={loading}
        sheetLoaded={sheetLoaded}
        dataMode={dataMode}
        showManual={showManual}
        setShowManual={setShowManual}
        manualTSV={manualTSV}
        setManualTSV={setManualTSV}
        availableJobs={availableJobs}
        onFetchSheet={onFetchSheet}
        onManualPaste={onManualPaste}
      />

      <TitleEditor
        title={title}
        setTitle={setTitle}
        year={year}
        setYear={setYear}
      />

      <JobSelector
        jobInput={jobInput}
        setJobInput={setJobInput}
        sheetLoaded={sheetLoaded}
        availableJobs={availableJobs}
        allGroups={allGroups}
      />

      <LogoUploader logoUrl={logoUrl} onLogoChange={onLogoChange} />

      {/* 에러 */}
      {error && (
        <div
          style={{
            padding: "14px 18px",
            background: theme.primaryLight,
            border: `1px solid ${theme.primary}`,
            borderRadius: 10,
            fontSize: 13,
            color: theme.primary,
            marginBottom: 16,
            whiteSpace: "pre-line",
          }}
        >
          {error}
        </div>
      )}

      {/* 생성 버튼 */}
      <button
        onClick={onGenerate}
        style={{
          width: "100%",
          padding: "18px 0",
          background: sheetLoaded ? theme.primary : "#CCC",
          color: "white",
          border: "none",
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 800,
          cursor: sheetLoaded ? "pointer" : "not-allowed",
          boxShadow: sheetLoaded ? `0 4px 14px ${theme.primary}4D` : "none",
        }}
      >
        {sheetLoaded ? "채용공고 생성 →" : "시트 데이터를 먼저 불러오세요"}
      </button>
    </div>
  );
}

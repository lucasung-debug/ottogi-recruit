import { Link } from "react-router-dom";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import SheetLoader from "../components/input/SheetLoader";
import TitleEditor from "../components/input/TitleEditor";
import JobSelector from "../components/input/JobSelector";
import LogoUploader from "../components/input/LogoUploader";
import AiGenerator from "../components/input/AiGenerator";
import AiResultEditor from "../components/input/AiResultEditor";

export default function InputPage({
  // 공통
  title,
  setTitle,
  year,
  setYear,
  logoUrl,
  error,
  onLogoChange,
  onGenerate,
  // 모드
  sourceMode,
  setSourceMode,
  // Sheets 모드
  sheetUrl,
  setSheetUrl,
  jobInput,
  setJobInput,
  sheetLoaded,
  dataMode,
  showManual,
  setShowManual,
  manualTSV,
  setManualTSV,
  availableJobs,
  allGroups,
  loading,
  onFetchSheet,
  onManualPaste,
  // AI 모드
  aiJobTitle,
  setAiJobTitle,
  aiEmploymentType,
  setAiEmploymentType,
  aiExperienceLevel,
  setAiExperienceLevel,
  aiLoading,
  aiError,
  aiResult,
  onAiGenerate,
  onAiResultUpdate,
}) {
  const { profile, theme } = useCompanyProfile();

  const isReady =
    sourceMode === "sheets"
      ? sheetLoaded
      : !!aiResult?.jobs?.length;

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
          {sourceMode === "ai"
            ? "AI 기반 채용공고 포스터 자동 생성"
            : "Google Sheets 데이터 기반 채용공고 포스터 자동 생성"}
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

      {/* 모드 토글 */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
        <button
          onClick={() => setSourceMode("sheets")}
          style={{
            flex: 1,
            padding: "11px 0",
            background: sourceMode === "sheets" ? theme.primary : theme.white,
            color: sourceMode === "sheets" ? "white" : theme.sub,
            border: `1.5px solid ${theme.primary}`,
            borderRadius: "10px 0 0 10px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Google Sheets 연동
        </button>
        <button
          onClick={() => setSourceMode("ai")}
          style={{
            flex: 1,
            padding: "11px 0",
            background: sourceMode === "ai" ? theme.primary : theme.white,
            color: sourceMode === "ai" ? "white" : theme.sub,
            border: `1.5px solid ${theme.primary}`,
            borderLeft: "none",
            borderRadius: "0 10px 10px 0",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          AI 자동 생성
        </button>
      </div>

      {/* 모드별 콘텐츠 */}
      {sourceMode === "sheets" ? (
        <>
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
        </>
      ) : (
        <>
          <AiGenerator
            aiJobTitle={aiJobTitle}
            setAiJobTitle={setAiJobTitle}
            aiEmploymentType={aiEmploymentType}
            setAiEmploymentType={setAiEmploymentType}
            aiExperienceLevel={aiExperienceLevel}
            setAiExperienceLevel={setAiExperienceLevel}
            aiLoading={aiLoading}
            aiResult={aiResult}
            onAiGenerate={onAiGenerate}
          />
          {aiError && (
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
              {aiError}
            </div>
          )}
          <AiResultEditor
            aiResult={aiResult}
            onAiResultUpdate={onAiResultUpdate}
            onApplyTitle={(t) => setTitle(t)}
          />
          <TitleEditor
            title={title}
            setTitle={setTitle}
            year={year}
            setYear={setYear}
          />
        </>
      )}

      <LogoUploader logoUrl={logoUrl} onLogoChange={onLogoChange} />

      {/* 에러 (공통) */}
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
          background: isReady ? theme.primary : "#CCC",
          color: "white",
          border: "none",
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 800,
          cursor: isReady ? "pointer" : "not-allowed",
          boxShadow: isReady ? `0 4px 14px ${theme.primary}4D` : "none",
        }}
      >
        {isReady
          ? "채용공고 생성 →"
          : sourceMode === "ai"
            ? "AI로 채용공고를 먼저 생성해주세요"
            : "시트 데이터를 먼저 불러오세요"}
      </button>
    </div>
  );
}

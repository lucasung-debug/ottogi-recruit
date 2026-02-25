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
  const { profile } = useCompanyProfile();

  const isReady =
    sourceMode === "sheets"
      ? sheetLoaded
      : !!aiResult?.jobs?.length;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* 글래스 헤더 */}
      <div className="glass-header sticky top-0 z-50 px-6 py-3">
        <div className="max-w-[680px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[17px] font-bold text-[#1d1d1f]">채용공고 생성</h1>
            <span className="text-[12px] text-[#86868b]">{profile.companyName}</span>
          </div>
          <Link
            to="/setup"
            className="text-[13px] font-medium text-[#0071e3] hover:underline"
          >
            설정
          </Link>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto px-4 py-6 space-y-4">
        {/* 모드 토글 — segmented control */}
        <div className="segmented-control">
          <button
            onClick={() => setSourceMode("sheets")}
            className={`segmented-item ${sourceMode === "sheets" ? "segmented-item-active" : ""}`}
          >
            Google Sheets
          </button>
          <button
            onClick={() => setSourceMode("ai")}
            className={`segmented-item ${sourceMode === "ai" ? "segmented-item-active" : ""}`}
          >
            AI 자동 생성
          </button>
        </div>

        {/* 모드별 콘텐츠 */}
        <div className="animate-fade-in" key={sourceMode}>
          {sourceMode === "sheets" ? (
            <div className="space-y-4">
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
            </div>
          ) : (
            <div className="space-y-4">
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
                <div className="flex items-start gap-2 p-4 rounded-xl bg-[#ff3b30]/10 text-[13px] text-[#d70015]">
                  <span className="shrink-0">✗</span>
                  <span className="whitespace-pre-line">{aiError}</span>
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
            </div>
          )}
        </div>

        <LogoUploader logoUrl={logoUrl} onLogoChange={onLogoChange} />

        {/* 에러 (공통) */}
        {error && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-[#ff3b30]/10 text-[13px] text-[#d70015]">
            <span className="shrink-0">✗</span>
            <span className="whitespace-pre-line">{error}</span>
          </div>
        )}

        {/* 생성 버튼 */}
        <button
          onClick={onGenerate}
          disabled={!isReady}
          className={`w-full py-4 rounded-2xl text-[16px] font-bold transition-all ${
            isReady
              ? "apple-btn-primary shadow-lg hover:shadow-xl active:scale-[0.98]"
              : "bg-[#d2d2d7] text-white cursor-not-allowed"
          }`}
        >
          {isReady
            ? "채용공고 생성"
            : sourceMode === "ai"
              ? "AI로 채용공고를 먼저 생성해주세요"
              : "시트 데이터를 먼저 불러오세요"}
        </button>
      </div>
    </div>
  );
}

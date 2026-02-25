import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCompanyProfile } from "../../context/CompanyProfileContext";

const EMPLOYMENT_TYPES = ["정규직", "계약직", "인턴"];
const EXPERIENCE_LEVELS = ["신입", "경력", "신입/경력"];

const LOADING_MESSAGES = [
  "AI가 직무 내용을 분석하고 있습니다",
  "채용공고 콘텐츠를 생성하고 있습니다",
  "자격요건과 우대사항을 정리하고 있습니다",
];

export default function AiGenerator({
  aiJobTitle,
  setAiJobTitle,
  aiEmploymentType,
  setAiEmploymentType,
  aiExperienceLevel,
  setAiExperienceLevel,
  aiLoading,
  aiResult,
  onAiGenerate,
}) {
  const { profile } = useCompanyProfile();
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const hasApiKey = !!profile.aiConfig?.apiKey;
  const hasResult = !!aiResult;

  useEffect(() => {
    if (!aiLoading) {
      setLoadingMsgIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [aiLoading]);

  const canGenerate = !aiLoading && aiJobTitle.trim() && hasApiKey;

  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white ${
            hasResult ? "bg-[#34c759]" : "bg-[#0071e3]"
          }`}
        >
          1
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">AI 채용공고 자동 생성</h3>
        {hasResult && (
          <span className="text-[12px] font-semibold text-[#34c759]">✓ 생성 완료</span>
        )}
      </div>

      {/* API 키 미설정 안내 */}
      {!hasApiKey && (
        <div className="flex items-start gap-2 p-4 bg-[#ff9500]/10 rounded-xl mb-4 text-[13px] leading-relaxed text-[#1d1d1f]">
          <span className="shrink-0 mt-0.5">⚠</span>
          <span>
            AI 자동 생성 기능을 사용하려면 OpenAI API 키가 필요합니다.{" "}
            <Link to="/setup" className="text-[#0071e3] font-semibold hover:underline">
              설정에서 API 키 입력하기
            </Link>
          </span>
        </div>
      )}

      {/* 직무명 입력 */}
      <div className="mb-4">
        <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">직무명 (필수)</label>
        <input
          type="text"
          value={aiJobTitle}
          onChange={(e) => setAiJobTitle(e.target.value)}
          placeholder="예: 마케팅 담당자, 소프트웨어 엔지니어"
          className="apple-input"
        />
      </div>

      {/* 고용형태 */}
      <div className="mb-4">
        <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">고용형태</label>
        <div className="segmented-control">
          {EMPLOYMENT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setAiEmploymentType(type)}
              className={`segmented-item ${aiEmploymentType === type ? "segmented-item-active" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 경력구분 */}
      <div className="mb-5">
        <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">경력구분</label>
        <div className="segmented-control">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setAiExperienceLevel(level)}
              className={`segmented-item ${aiExperienceLevel === level ? "segmented-item-active" : ""}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 생성 버튼 */}
      <button
        onClick={onAiGenerate}
        disabled={!canGenerate}
        className={`w-full py-3.5 rounded-xl text-[15px] font-bold transition-all ${
          canGenerate
            ? "apple-btn-primary shadow-md hover:shadow-lg active:scale-[0.98]"
            : "bg-[#d2d2d7] text-white cursor-not-allowed"
        }`}
      >
        {aiLoading ? "생성 중..." : hasResult ? "다시 생성하기" : "AI로 생성하기"}
      </button>

      {/* 로딩 상태 메시지 */}
      {aiLoading && (
        <div className="mt-3 p-3 bg-[#0071e3]/[0.06] rounded-xl text-[13px] text-[#0071e3] text-center animate-pulse-soft">
          {LOADING_MESSAGES[loadingMsgIdx]}...
        </div>
      )}
    </div>
  );
}

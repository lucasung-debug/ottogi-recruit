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
  const { profile, theme } = useCompanyProfile();
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
    background: hasResult ? theme.success : theme.info,
    color: "white",
    flexShrink: 0,
  };

  const pillGroupStyle = {
    display: "flex",
    gap: 0,
    marginBottom: 14,
  };
  const pillStyle = (active) => ({
    flex: 1,
    padding: "8px 0",
    background: active ? theme.secondary : theme.white,
    color: active ? "white" : theme.sub,
    border: `1px solid ${theme.secondary}`,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  });

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>
        <span style={badgeStyle}>1</span>
        <span>AI 채용공고 자동 생성</span>
        {hasResult && (
          <span style={{ fontSize: 12, color: theme.success, fontWeight: 600 }}>
            ✓ 생성 완료
          </span>
        )}
      </div>

      {/* API 키 미설정 안내 */}
      {!hasApiKey && (
        <div
          style={{
            padding: "14px 18px",
            background: theme.accentLight,
            border: `1px solid ${theme.accent}`,
            borderRadius: 10,
            fontSize: 13,
            marginBottom: 14,
            lineHeight: 1.6,
          }}
        >
          AI 자동 생성 기능을 사용하려면 OpenAI API 키가 필요합니다.{" "}
          <Link
            to="/setup"
            style={{ color: theme.secondary, fontWeight: 700, textDecoration: "underline" }}
          >
            설정에서 API 키 입력하기
          </Link>
        </div>
      )}

      {/* 직무명 입력 */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: theme.sub, marginBottom: 6 }}>
          직무명 (필수)
        </div>
        <input
          type="text"
          value={aiJobTitle}
          onChange={(e) => setAiJobTitle(e.target.value)}
          placeholder="예: 마케팅 담당자, 소프트웨어 엔지니어"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid #DDD",
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* 고용형태 */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 12, color: theme.sub, marginBottom: 6 }}>
          고용형태
        </div>
        <div style={pillGroupStyle}>
          {EMPLOYMENT_TYPES.map((type, i) => (
            <button
              key={type}
              onClick={() => setAiEmploymentType(type)}
              style={{
                ...pillStyle(aiEmploymentType === type),
                borderRadius:
                  i === 0
                    ? "8px 0 0 8px"
                    : i === EMPLOYMENT_TYPES.length - 1
                      ? "0 8px 8px 0"
                      : 0,
                borderLeft: i === 0 ? undefined : "none",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 경력구분 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: theme.sub, marginBottom: 6 }}>
          경력구분
        </div>
        <div style={pillGroupStyle}>
          {EXPERIENCE_LEVELS.map((level, i) => (
            <button
              key={level}
              onClick={() => setAiExperienceLevel(level)}
              style={{
                ...pillStyle(aiExperienceLevel === level),
                borderRadius:
                  i === 0
                    ? "8px 0 0 8px"
                    : i === EXPERIENCE_LEVELS.length - 1
                      ? "0 8px 8px 0"
                      : 0,
                borderLeft: i === 0 ? undefined : "none",
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 생성 버튼 */}
      <button
        onClick={onAiGenerate}
        disabled={aiLoading || !aiJobTitle.trim() || !hasApiKey}
        style={{
          width: "100%",
          padding: "14px 0",
          background:
            aiLoading || !aiJobTitle.trim() || !hasApiKey ? "#CCC" : theme.primary,
          color: "white",
          border: "none",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 700,
          cursor: aiLoading || !aiJobTitle.trim() || !hasApiKey ? "not-allowed" : "pointer",
          boxShadow:
            !aiLoading && aiJobTitle.trim() && hasApiKey
              ? `0 2px 8px ${theme.primary}40`
              : "none",
        }}
      >
        {aiLoading ? "생성 중..." : hasResult ? "다시 생성하기" : "AI로 생성하기"}
      </button>

      {/* 로딩 상태 메시지 */}
      {aiLoading && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 16px",
            background: theme.infoLight,
            borderRadius: 8,
            fontSize: 13,
            color: theme.secondary,
            textAlign: "center",
          }}
        >
          <span style={{ display: "inline-block", animation: "pulse 1.5s infinite" }}>
            {LOADING_MESSAGES[loadingMsgIdx]}...
          </span>
          <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
        </div>
      )}
    </div>
  );
}

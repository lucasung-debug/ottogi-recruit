import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import Poster from "./components/Poster";
import {
  fetchFromSheet,
  parseFromTSV,
  extractSheetId,
  matchJobs,
} from "./utils/sheets";
import { calcFinalHireMonth, processLogo } from "./utils/helpers";
import { C } from "./utils/constants";

export default function App() {
  // ===== 상태 =====
  const [title, setTitle] = useState("2026년 상반기\n대졸 신입사원 수시채용");
  const [year, setYear] = useState(new Date().getFullYear());
  const [sheetUrl, setSheetUrl] = useState("");
  const [jobInput, setJobInput] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [finalHireMonth, setFinalHireMonth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [step, setStep] = useState("input"); // input | preview
  const [sheetLoaded, setSheetLoaded] = useState(false);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [dataMode, setDataMode] = useState(""); // auto | manual
  const [manualTSV, setManualTSV] = useState("");
  const [showManual, setShowManual] = useState(false);
  const posterRef = useRef(null);

  // ===== 시트 자동 불러오기 =====
  const fetchSheet = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const id = extractSheetId(sheetUrl);
      const groups = await fetchFromSheet(id);
      setAllGroups(groups);
      setAvailableJobs(groups.map((g) => g.jobName));
      setSheetLoaded(true);
      setDataMode("auto");
    } catch (e) {
      setError(
        `자동 연동 실패: ${e.message}\n\n해결 방법:\n1. 시트가 '링크가 있는 모든 사용자 → 보기' 권한으로 공유되어 있는지 확인\n2. 그래도 안 되면 아래 '수동 입력' 사용`
      );
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  }, [sheetUrl]);

  // ===== 수동 붙여넣기 =====
  const handleManualPaste = useCallback(
    (text) => {
      if (!text.trim()) return;
      try {
        const groups = parseFromTSV(text);
        setAllGroups(groups);
        setAvailableJobs(groups.map((g) => g.jobName));
        setSheetLoaded(true);
        setDataMode("manual");
        setError("");
      } catch (e) {
        setError(`데이터 인식 실패: ${e.message}`);
      }
    },
    []
  );

  // ===== 로고 업로드 =====
  const handleLogo = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      setLogoUrl(await processLogo(ev.target.result));
    };
    reader.readAsDataURL(f);
  };

  // ===== 공고 생성 =====
  const generate = async () => {
    if (!sheetLoaded) {
      setError("먼저 시트 데이터를 불러와 주세요.");
      return;
    }
    const queries = jobInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!queries.length) {
      setError("직무명을 1개 이상 입력해주세요.");
      return;
    }
    const matched = matchJobs(allGroups, queries);
    if (!matched.length) {
      setError(
        `일치하는 직무가 없습니다.\n등록된 직무: ${allGroups.map((g) => g.jobName).join(", ")}`
      );
      return;
    }
    setMatchedJobs(matched);
    const withProc = matched.find((m) => m.process.length > 0) || matched[0];
    const withSched = matched.find((m) => m.schedule) || matched[0];
    setProcessSteps(withProc.process);
    setSchedule(withSched.schedule);
    setFinalHireMonth(calcFinalHireMonth(withSched.schedule, year));
    setError("");
    setStep("preview");
  };

  // ===== PNG 다운로드 (html2canvas) =====
  const downloadPNG = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `채용공고_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      alert(`다운로드 실패: ${e.message}\n\n대안: 미리보기를 스크린샷하거나 Ctrl+P → PDF로 저장해주세요.`);
    } finally {
      setDownloading(false);
    }
  };

  // ===== 스타일 =====
  const sectionStyle = {
    marginBottom: 20,
    padding: "20px 24px",
    background: C.white,
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
  const badgeStyle = (done) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    fontSize: 13,
    fontWeight: 800,
    background: done ? C.green : C.sky,
    color: "white",
    flexShrink: 0,
  });
  const scale =
    typeof window !== "undefined"
      ? Math.min(1, (window.innerWidth - 60) / 860)
      : 0.6;

  // ==============================
  //  입력 화면
  // ==============================
  if (step === "input") {
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
            background:
              "linear-gradient(135deg,#E8F5E9,#FFF9C4,#E3F2FD)",
            borderRadius: 16,
            border: `2px solid ${C.green}`,
          }}
        >
          <div style={{ fontSize: 13, color: C.sub, marginBottom: 2 }}>
            오뚜기라면주식회사
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: C.text }}>
            채용공고 자동 생성기
          </div>
          <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>
            Google Sheets 데이터 기반 채용공고 포스터 자동 생성
          </div>
        </div>

        {/* STEP 1: 시트 데이터 */}
        <div style={sectionStyle}>
          <div style={labelStyle}>
            <span style={badgeStyle(sheetLoaded)}>1</span>
            <span>Google Sheets 데이터 연동</span>
            {sheetLoaded && (
              <span
                style={{ fontSize: 12, color: C.green, fontWeight: 600 }}
              >
                ✓ {dataMode === "auto" ? "자동 연동" : "수동 입력"} 완료
              </span>
            )}
          </div>

          {/* 자동 연동 */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}
            >
              시트 URL을 입력하거나, 기본 시트를 바로 불러올 수 있습니다.
            </div>
            <div
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="Google Sheets URL (빈칸 = 기본 시트)"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "1px solid #DDD",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={fetchSheet}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  background:
                    sheetLoaded && dataMode === "auto" ? C.green : C.sky,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {loading
                  ? "불러오는 중..."
                  : sheetLoaded && dataMode === "auto"
                    ? "✓ 연동됨"
                    : "불러오기"}
              </button>
            </div>
          </div>

          {/* 수동 입력 토글 */}
          <div style={{ borderTop: "1px dashed #DDD", paddingTop: 12 }}>
            <button
              onClick={() => setShowManual(!showManual)}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                color: C.darkBlue,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {showManual ? "▾" : "▸"} 수동 붙여넣기 (자동 연동 실패
              시)
            </button>
            {showManual && (
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    background: "#E3F2FD",
                    borderRadius: 8,
                    padding: "12px 14px",
                    marginBottom: 10,
                    fontSize: 12,
                    lineHeight: 1.8,
                  }}
                >
                  <strong>방법:</strong> Google Sheets → Ctrl+A (전체선택) →
                  Ctrl+C (복사) → 아래 Ctrl+V (붙여넣기)
                </div>
                <textarea
                  value={manualTSV}
                  onChange={(e) => {
                    setManualTSV(e.target.value);
                    if (e.target.value.trim())
                      handleManualPaste(e.target.value);
                  }}
                  placeholder="여기에 시트 데이터를 붙여넣으세요 (Ctrl+V)"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: `2px solid ${dataMode === "manual" ? C.green : "#CCC"}`,
                    borderRadius: 8,
                    fontSize: 12,
                    resize: "vertical",
                    fontFamily: "monospace",
                    background:
                      dataMode === "manual" ? "#F1F8E9" : C.white,
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}
          </div>

          {/* 인식 결과 */}
          {sheetLoaded && (
            <div
              style={{
                marginTop: 12,
                padding: "10px 14px",
                background: "#E8F5E9",
                borderRadius: 8,
                fontSize: 13,
                color: C.green,
                border: `1px solid ${C.green}`,
              }}
            >
              ✓ <strong>{availableJobs.length}개 직무</strong> 인식:{" "}
              {availableJobs.map((j, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    background: "white",
                    padding: "2px 10px",
                    borderRadius: 12,
                    margin: "2px 4px",
                    fontSize: 12,
                    fontWeight: 600,
                    border: `1px solid ${C.green}`,
                  }}
                >
                  {j}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* STEP 2: 제목 */}
        <div style={sectionStyle}>
          <div style={labelStyle}>
            <span style={badgeStyle(false)}>2</span>
            <span>채용공고 제목</span>
          </div>
          <div style={{ fontSize: 11, color: C.sub, marginBottom: 8 }}>
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
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              기준 연도:
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(
                  parseInt(e.target.value) || new Date().getFullYear()
                )
              }
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

        {/* STEP 3: 직무 입력 */}
        <div style={sectionStyle}>
          <div style={labelStyle}>
            <span style={badgeStyle(false)}>3</span>
            <span>모집 직무 선택</span>
          </div>
          <div style={{ fontSize: 11, color: C.sub, marginBottom: 8 }}>
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
              background: sheetLoaded ? C.white : "#F0F0F0",
            }}
          />
          {sheetLoaded && jobInput && (
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
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
                        background: found ? "#E8F5E9" : "#FFEBEE",
                        color: found ? C.green : C.red,
                        border: `1px solid ${found ? C.green : C.red}`,
                      }}
                    >
                      {q} {found ? "✓" : "✗"}
                    </span>
                  );
                })}
            </div>
          )}
        </div>

        {/* STEP 4: 로고 */}
        <div style={sectionStyle}>
          <div style={labelStyle}>
            <span style={badgeStyle(!!logoUrl)}>4</span>
            <span>기업 로고 (선택)</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            style={{ fontSize: 13 }}
          />
          {logoUrl && (
            <div
              style={{
                marginTop: 10,
                padding: 12,
                background: C.gray,
                borderRadius: 8,
                display: "inline-block",
              }}
            >
              <img
                src={logoUrl}
                alt="logo"
                style={{ height: 40, objectFit: "contain" }}
              />
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  color: C.green,
                  fontWeight: 600,
                }}
              >
                ✓ 적용됨
              </span>
            </div>
          )}
        </div>

        {/* 에러 */}
        {error && (
          <div
            style={{
              padding: "14px 18px",
              background: "#FFEBEE",
              border: `1px solid ${C.red}`,
              borderRadius: 10,
              fontSize: 13,
              color: C.red,
              marginBottom: 16,
              whiteSpace: "pre-line",
            }}
          >
            {error}
          </div>
        )}

        {/* 생성 버튼 */}
        <button
          onClick={generate}
          style={{
            width: "100%",
            padding: "18px 0",
            background: sheetLoaded ? C.red : "#CCC",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 800,
            cursor: sheetLoaded ? "pointer" : "not-allowed",
            boxShadow: sheetLoaded
              ? "0 4px 14px rgba(230,0,18,0.3)"
              : "none",
          }}
        >
          {sheetLoaded ? "채용공고 생성 →" : "시트 데이터를 먼저 불러오세요"}
        </button>
      </div>
    );
  }

  // ==============================
  //  미리보기 화면
  // ==============================
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
          onClick={() => setStep("input")}
          style={{
            padding: "8px 16px",
            background: C.gray,
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
          onClick={downloadPNG}
          disabled={downloading}
          style={{
            padding: "10px 24px",
            background: C.red,
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: downloading ? "wait" : "pointer",
            boxShadow: "0 2px 8px rgba(230,0,18,0.25)",
            opacity: downloading ? 0.6 : 1,
          }}
        >
          {downloading ? "생성 중..." : "📥 PNG 다운로드"}
        </button>
        <div
          style={{ flex: 1, fontSize: 11, color: C.sub, textAlign: "right" }}
        >
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
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
        >
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

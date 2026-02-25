import { useState, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  fetchFromSheet,
  parseFromTSV,
  extractSheetId,
  matchJobs,
} from "./utils/sheets";
import { calcFinalHireMonth, processLogo } from "./utils/helpers";
import { useCompanyProfile } from "./context/CompanyProfileContext";
import InputPage from "./pages/InputPage";
import PreviewPage from "./pages/PreviewPage";

function AppContent() {
  const { profile } = useCompanyProfile();
  const navigate = useNavigate();

  // ===== 상태 =====
  const [title, setTitle] = useState(profile.defaultTitle);
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
      const id = extractSheetId(sheetUrl || profile.sheetConfig.defaultSheetId);
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
  }, [sheetUrl, profile.sheetConfig.defaultSheetId]);

  // ===== 수동 붙여넣기 =====
  const handleManualPaste = useCallback((text) => {
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
  }, []);

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
    navigate("/preview");
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

  return (
    <Routes>
      <Route
        path="/create"
        element={
          <InputPage
            title={title}
            setTitle={setTitle}
            year={year}
            setYear={setYear}
            sheetUrl={sheetUrl}
            setSheetUrl={setSheetUrl}
            jobInput={jobInput}
            setJobInput={setJobInput}
            logoUrl={logoUrl}
            sheetLoaded={sheetLoaded}
            dataMode={dataMode}
            showManual={showManual}
            setShowManual={setShowManual}
            manualTSV={manualTSV}
            setManualTSV={setManualTSV}
            availableJobs={availableJobs}
            allGroups={allGroups}
            loading={loading}
            error={error}
            onFetchSheet={fetchSheet}
            onManualPaste={handleManualPaste}
            onLogoChange={handleLogo}
            onGenerate={generate}
          />
        }
      />
      <Route
        path="/preview"
        element={
          <PreviewPage
            posterRef={posterRef}
            title={title}
            matchedJobs={matchedJobs}
            processSteps={processSteps}
            schedule={schedule}
            year={year}
            finalHireMonth={finalHireMonth}
            logoUrl={logoUrl}
            downloading={downloading}
            onBack={() => navigate("/create")}
            onDownload={downloadPNG}
          />
        }
      />
      <Route path="*" element={<Navigate to="/create" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppContent />;
}

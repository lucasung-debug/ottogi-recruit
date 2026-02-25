import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyProfile } from "../context/CompanyProfileContext";
import SetupSidebar from "../components/setup/SetupSidebar";
import MiniPosterPreview from "../components/setup/MiniPosterPreview";
import StepCompanyInfo from "../components/setup/StepCompanyInfo";
import StepBrandColors from "../components/setup/StepBrandColors";
import StepTalentProfile from "../components/setup/StepTalentProfile";
import StepDefaultContent from "../components/setup/StepDefaultContent";
import StepDataSource from "../components/setup/StepDataSource";

const STEP_COMPONENTS = {
  1: StepCompanyInfo,
  2: StepBrandColors,
  3: StepTalentProfile,
  4: StepDefaultContent,
  5: StepDataSource,
};

const TOTAL_STEPS = 5;

export default function SetupPage() {
  const { profile, setProfile, updateField } = useCompanyProfile();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const importRef = useRef(null);

  const StepComponent = STEP_COMPONENTS[currentStep];

  const handleExport = () => {
    const data = JSON.stringify(profile, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `company-profile-${new Date().toISOString().slice(0, 10)}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.companyName || !parsed.brandColors) {
          alert("유효하지 않은 프로필 파일입니다. companyName, brandColors 필드가 필요합니다.");
          return;
        }
        setProfile(parsed);
        alert("프로필을 성공적으로 가져왔습니다.");
      } catch {
        alert("JSON 파일 파싱에 실패했습니다.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleComplete = () => {
    updateField("isConfigured", true);
    navigate("/create");
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[system-ui]">
      {/* 상단 바 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/create")}
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              &larr; 채용공고 생성으로
            </button>
            <h1 className="text-lg font-bold text-gray-800">기업 초기 설정</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              JSON 내보내기
            </button>
            <button
              onClick={() => importRef.current?.click()}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              JSON 가져오기
            </button>
            <input
              ref={importRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* 본문 */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* 사이드바 */}
        <aside className="w-full lg:w-52 shrink-0">
          <SetupSidebar currentStep={currentStep} onStepChange={setCurrentStep} />
        </aside>

        {/* 스텝 콘텐츠 */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <StepComponent />

            {/* 하단 네비게이션 */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-40 disabled:cursor-default"
              >
                &larr; 이전
              </button>
              <span className="text-xs text-gray-400">
                {currentStep} / {TOTAL_STEPS}
              </span>
              <button
                onClick={handleNext}
                className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                {currentStep < TOTAL_STEPS ? "다음 →" : "설정 완료 →"}
              </button>
            </div>
          </div>
        </main>

        {/* 미니 프리뷰 */}
        <aside className="shrink-0">
          <MiniPosterPreview />
        </aside>
      </div>
    </div>
  );
}

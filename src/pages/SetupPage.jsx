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
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Glass Header */}
      <header className="sticky top-0 z-50 glass-header border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/create")}
              className="text-[13px] text-[#0071e3] font-medium hover:underline cursor-pointer"
            >
              &larr; 채용공고 생성
            </button>
            <div className="w-px h-4 bg-black/10" />
            <h1 className="text-[15px] font-semibold text-[#1d1d1f]">설정</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="apple-btn apple-btn-ghost text-[12px] py-1.5 px-3"
            >
              내보내기
            </button>
            <button
              onClick={() => importRef.current?.click()}
              className="apple-btn apple-btn-ghost text-[12px] py-1.5 px-3"
            >
              가져오기
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

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-48 shrink-0">
          <SetupSidebar currentStep={currentStep} onStepChange={setCurrentStep} />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="apple-card p-8 animate-fade-in" key={currentStep}>
            <StepComponent />

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/[0.06]">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="apple-btn apple-btn-secondary"
              >
                &larr; 이전
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i + 1 === currentStep ? "bg-[#0071e3] w-4" : "bg-black/15"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="apple-btn apple-btn-primary"
              >
                {currentStep < TOTAL_STEPS ? "다음 →" : "설정 완료 →"}
              </button>
            </div>
          </div>
        </main>

        {/* Mini Preview */}
        <aside className="shrink-0">
          <MiniPosterPreview />
        </aside>
      </div>
    </div>
  );
}

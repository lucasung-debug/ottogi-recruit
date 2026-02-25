const STEPS = [
  { id: 1, label: "기업 정보", icon: "🏢" },
  { id: 2, label: "브랜드 컬러", icon: "🎨" },
  { id: 3, label: "인재상", icon: "👤" },
  { id: 4, label: "기본 콘텐츠", icon: "📝" },
  { id: 5, label: "데이터 소스", icon: "🔗" },
];

export default function SetupSidebar({ currentStep, onStepChange }) {
  return (
    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        return (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap
              ${isActive
                ? "bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "text-[#6e6e73] hover:bg-white/60"
              }`}
          >
            <span className="text-base">{step.icon}</span>
            <span className="hidden lg:inline">{step.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

const STEPS = [
  { id: 1, label: "기업 정보" },
  { id: 2, label: "브랜드 컬러" },
  { id: 3, label: "인재상" },
  { id: 4, label: "기본 콘텐츠" },
  { id: 5, label: "데이터 소스" },
];

export default function SetupSidebar({ currentStep, onStepChange }) {
  return (
    <nav className="flex flex-row lg:flex-col gap-1 lg:gap-2 overflow-x-auto lg:overflow-visible p-2 lg:p-0">
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        return (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer whitespace-nowrap
              ${isActive
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-600 hover:bg-gray-100 border border-transparent"
              }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {step.id}
            </span>
            <span className="hidden lg:inline">{step.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

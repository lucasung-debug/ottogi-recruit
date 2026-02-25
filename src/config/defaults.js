/**
 * 기본 기업 프로필 설정
 *
 * 현재 오뚜기라면 데이터를 기본값으로 사용합니다.
 * Phase 2에서 설정 마법사를 통해 이 값들을 기업별로 커스터마이징할 수 있습니다.
 */

export const DEFAULT_COMPANY_PROFILE = {
  isConfigured: false,
  companyName: "오뚜기라면주식회사",

  brandColors: {
    primary: "#D3233A",    // OTOKI RED   PANTONE 186
    secondary: "#0A309E",  // OTOKI BLUE  PANTONE 2747
    accent: "#FFF300",     // OTOKI YELLOW PANTONE 108
  },

  defaultTitle: "2026년 상반기\n대졸 신입사원 수시채용",

  sheetConfig: {
    defaultSheetId: "1WHiAnUbcjrfKDpK3YqyU0yEiccHyjjgmiC9Hhw92VDI",
  },

  commonQualifications: [
    { text: "직무별 요구기준에 적합한 학위소지자", highlight: true },
    { text: "남성의 경우, 병역 필 또는 면제자", highlight: false },
    { text: "해외 여행(또는 해외 출장)에 결격사유가 없는 자", highlight: false },
    { text: "취업보호대상자는 관련 법령에 의거하여 우대", highlight: false },
  ],

  applicationMethod: [
    "접수방법: 오뚜기라면 채용홈페이지 內 온라인 지원",
    "지원서 첨부파일 外 제출 필요서류는 1차 서류 합격자에 한하여 별도 안내 예정",
  ],

  additionalInfo: [
    { text: "서류전형 합격자 발표: 개별 이메일 및 카카오톡 안내 예정", highlight: false },
    { text: "인성/업무적응도 검사 : 온라인 실시", highlight: false },
  ],

  notes: [
    "전형과정 중 지원자의 적성 및 경험을 고려하여 타직무가 적합하다고 판단하는 경우 전환배치를 검토할 수 있습니다.",
    "제출된 서류는 각 전형별 합격자 발표일 이후 삭제됩니다.",
    "서류접수 마감일은 접속자가 집중되어 시스템이 불안정할 수 있으므로, 기한 내에 여유 있게 지원서를 제출하여 주시기 바랍니다.",
    "허위사실이 발견될 경우 채용이 취소될 수 있습니다.",
    "보훈대상자와 장애인은 국가관련법에 의거 우대합니다.",
  ],

  contactInfo: {
    phone: "031-683-1832",
    email: "recruit@otokirm.com",
    team: "오뚜기라면 인사팀",
  },

  cautions: [
    "공통지원자격 결격사유 해당자 (해외여행 결격사유자 등)",
    "입사지원서 및 제출서류에 허위사실이 있는 자",
    "면접전형 합격 후, 채용검진결과 정상근무 불가 판정자",
  ],

  talentProfile: {
    values: [],
    keywords: [],
  },

  aiConfig: {
    apiKey: "",
    model: "gpt-4o",
  },
};

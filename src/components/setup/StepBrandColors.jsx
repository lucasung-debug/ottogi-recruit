import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { DEFAULT_COMPANY_PROFILE } from "../../config/defaults";
import ColorPickerField from "../common/ColorPickerField";

export default function StepBrandColors() {
  const { profile, updateField } = useCompanyProfile();

  const handleReset = () => {
    updateField("brandColors", { ...DEFAULT_COMPANY_PROFILE.brandColors });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">브랜드 컬러</h2>
        <p className="text-sm text-gray-500">포스터의 전체 색상 테마를 결정하는 3가지 브랜드 컬러를 설정합니다.</p>
      </div>

      <div className="space-y-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <ColorPickerField
          label="메인 컬러 (Primary)"
          description="강조 텍스트, 버튼, 에러 표시에 사용"
          value={profile.brandColors.primary}
          onChange={(v) => updateField("brandColors.primary", v)}
        />
        <ColorPickerField
          label="보조 컬러 (Secondary)"
          description="섹션 헤더, 테이블 헤더, 프로세스 차트에 사용"
          value={profile.brandColors.secondary}
          onChange={(v) => updateField("brandColors.secondary", v)}
        />
        <ColorPickerField
          label="강조 컬러 (Accent)"
          description="직무명 배경, 마지막 프로세스 단계, 유의사항 배경에 사용"
          value={profile.brandColors.accent}
          onChange={(v) => updateField("brandColors.accent", v)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={handleReset}
        >
          기본값으로 초기화
        </button>
        <span className="text-xs text-gray-400">컬러 변경 시 우측 미니 프리뷰에서 실시간으로 확인할 수 있습니다.</span>
      </div>
    </div>
  );
}

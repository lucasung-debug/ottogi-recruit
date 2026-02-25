import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { DEFAULT_COMPANY_PROFILE } from "../../config/defaults";
import ColorPickerField from "../common/ColorPickerField";

export default function StepBrandColors() {
  const { profile, updateField } = useCompanyProfile();

  const handleReset = () => {
    updateField("brandColors", { ...DEFAULT_COMPANY_PROFILE.brandColors });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] tracking-tight">브랜드 컬러</h2>
        <p className="text-[14px] text-[#86868b] mt-1">포스터의 전체 색상 테마를 결정하는 3가지 브랜드 컬러를 설정합니다.</p>
      </div>

      <div className="space-y-6 p-6 bg-[#f5f5f7] rounded-2xl">
        <ColorPickerField
          label="메인 컬러"
          description="강조 텍스트, 버튼, 에러 표시에 사용"
          value={profile.brandColors.primary}
          onChange={(v) => updateField("brandColors.primary", v)}
        />
        <hr className="apple-divider" />
        <ColorPickerField
          label="보조 컬러"
          description="섹션 헤더, 테이블 헤더, 프로세스 차트에 사용"
          value={profile.brandColors.secondary}
          onChange={(v) => updateField("brandColors.secondary", v)}
        />
        <hr className="apple-divider" />
        <ColorPickerField
          label="강조 컬러"
          description="직무명 배경, 마지막 프로세스 단계, 유의사항 배경에 사용"
          value={profile.brandColors.accent}
          onChange={(v) => updateField("brandColors.accent", v)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="apple-btn apple-btn-secondary text-[13px]"
          onClick={handleReset}
        >
          기본값으로 초기화
        </button>
        <span className="text-[12px] text-[#86868b]">
          컬러 변경 시 우측 미니 프리뷰에서 실시간으로 확인할 수 있습니다.
        </span>
      </div>
    </div>
  );
}

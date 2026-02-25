import { useCompanyProfile } from "../../context/CompanyProfileContext";
import ImageUploadField from "../common/ImageUploadField";

export default function StepCompanyInfo() {
  const { profile, updateField } = useCompanyProfile();

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400";
  const labelClass = "text-sm font-semibold text-gray-700 mb-1 block";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">기업 정보</h2>
        <p className="text-sm text-gray-500">채용공고에 표시될 기본 기업 정보를 입력합니다.</p>
      </div>

      <div>
        <label className={labelClass}>회사명</label>
        <input
          className={inputClass}
          value={profile.companyName}
          onChange={(e) => updateField("companyName", e.target.value)}
          placeholder="예: 오뚜기라면주식회사"
        />
      </div>

      <div>
        <label className={labelClass}>채용공고 기본 제목</label>
        <p className="text-xs text-gray-400 mb-1">첫째 줄 = 상단 배너, 둘째 줄 이후 = 메인 제목</p>
        <textarea
          className={`${inputClass} resize-y`}
          rows={2}
          value={profile.defaultTitle}
          onChange={(e) => updateField("defaultTitle", e.target.value)}
          placeholder="2026년 상반기&#10;대졸 신입사원 수시채용"
        />
      </div>

      <ImageUploadField
        label="기업 로고 (포스터 우측 상단)"
        value={profile.logoUrl || ""}
        onChange={(v) => updateField("logoUrl", v)}
        processImage
        height={40}
      />

      <ImageUploadField
        label="배너 이미지 (포스터 상단 배경)"
        value={profile.bannerUrl || ""}
        onChange={(v) => updateField("bannerUrl", v)}
        height={80}
      />

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">연락처 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>담당 팀명</label>
            <input
              className={inputClass}
              value={profile.contactInfo.team}
              onChange={(e) => updateField("contactInfo.team", e.target.value)}
              placeholder="인사팀"
            />
          </div>
          <div>
            <label className={labelClass}>전화번호</label>
            <input
              className={inputClass}
              value={profile.contactInfo.phone}
              onChange={(e) => updateField("contactInfo.phone", e.target.value)}
              placeholder="031-000-0000"
            />
          </div>
          <div>
            <label className={labelClass}>이메일</label>
            <input
              className={inputClass}
              value={profile.contactInfo.email}
              onChange={(e) => updateField("contactInfo.email", e.target.value)}
              placeholder="recruit@company.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

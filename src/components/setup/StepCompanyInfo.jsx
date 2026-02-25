import { useCompanyProfile } from "../../context/CompanyProfileContext";
import ImageUploadField from "../common/ImageUploadField";

export default function StepCompanyInfo() {
  const { profile, updateField } = useCompanyProfile();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] tracking-tight">기업 정보</h2>
        <p className="text-[14px] text-[#86868b] mt-1">채용공고에 표시될 기본 기업 정보를 입력합니다.</p>
      </div>

      <div>
        <label className="text-[13px] font-semibold text-[#1d1d1f] mb-2 block">회사명</label>
        <input
          className="apple-input"
          value={profile.companyName}
          onChange={(e) => updateField("companyName", e.target.value)}
          placeholder="예: 오뚜기라면주식회사"
        />
      </div>

      <div>
        <label className="text-[13px] font-semibold text-[#1d1d1f] mb-1 block">채용공고 기본 제목</label>
        <p className="text-[12px] text-[#86868b] mb-2">첫째 줄 = 상단 배너, 둘째 줄 이후 = 메인 제목</p>
        <textarea
          className="apple-textarea"
          rows={2}
          value={profile.defaultTitle}
          onChange={(e) => updateField("defaultTitle", e.target.value)}
          placeholder={"2026년 상반기\n대졸 신입사원 수시채용"}
        />
      </div>

      <hr className="apple-divider" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploadField
          label="기업 로고"
          value={profile.logoUrl || ""}
          onChange={(v) => updateField("logoUrl", v)}
          processImage
          height={40}
        />
        <ImageUploadField
          label="배너 이미지"
          value={profile.bannerUrl || ""}
          onChange={(v) => updateField("bannerUrl", v)}
          height={80}
        />
      </div>

      <hr className="apple-divider" />

      <div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-4">연락처 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">담당 팀명</label>
            <input
              className="apple-input"
              value={profile.contactInfo.team}
              onChange={(e) => updateField("contactInfo.team", e.target.value)}
              placeholder="인사팀"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">전화번호</label>
            <input
              className="apple-input"
              value={profile.contactInfo.phone}
              onChange={(e) => updateField("contactInfo.phone", e.target.value)}
              placeholder="031-000-0000"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">이메일</label>
            <input
              className="apple-input"
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

import { useCompanyProfile } from "../../context/CompanyProfileContext";
import TagInput from "../common/TagInput";

export default function StepTalentProfile() {
  const { profile, updateField } = useCompanyProfile();

  const values = Array.isArray(profile.talentProfile.values)
    ? profile.talentProfile.values.join("\n")
    : (profile.talentProfile.values || "");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] tracking-tight">인재상</h2>
        <p className="text-[14px] text-[#86868b] mt-1">기업이 추구하는 인재상과 핵심 역량 키워드를 설정합니다.</p>
      </div>

      <div className="flex items-start gap-3 p-4 bg-[#0071e3]/[0.06] rounded-2xl">
        <span className="text-base mt-0.5">💡</span>
        <p className="text-[13px] text-[#0071e3] font-medium leading-relaxed">
          이 정보는 AI가 채용공고를 자동 작성할 때 참고하여, 기업의 인재상에 맞는 공고 문구를 생성합니다.
        </p>
      </div>

      <div>
        <label className="text-[13px] font-semibold text-[#1d1d1f] mb-1 block">기업 가치관 / 인재상</label>
        <p className="text-[12px] text-[#86868b] mb-2">한 줄에 하나씩 입력합니다.</p>
        <textarea
          className="apple-textarea"
          rows={4}
          value={values}
          onChange={(e) => {
            const lines = e.target.value.split("\n").filter((l) => l.trim());
            updateField("talentProfile.values", lines);
          }}
          placeholder={"예:\n도전을 두려워하지 않는 인재\n함께 성장하는 협업형 인재\n고객 중심의 사고를 하는 인재"}
        />
      </div>

      <div>
        <label className="text-[13px] font-semibold text-[#1d1d1f] mb-1 block">핵심 역량 키워드</label>
        <p className="text-[12px] text-[#86868b] mb-2">Enter 또는 콤마(,)로 구분하여 입력합니다.</p>
        <TagInput
          tags={profile.talentProfile.keywords}
          onChange={(tags) => updateField("talentProfile.keywords", tags)}
          placeholder="예: 도전정신, 창의력, 글로벌 역량"
        />
      </div>
    </div>
  );
}

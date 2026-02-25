import { useCompanyProfile } from "../../context/CompanyProfileContext";
import TagInput from "../common/TagInput";

export default function StepTalentProfile() {
  const { profile, updateField } = useCompanyProfile();

  const values = Array.isArray(profile.talentProfile.values)
    ? profile.talentProfile.values.join("\n")
    : (profile.talentProfile.values || "");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">인재상</h2>
        <p className="text-sm text-gray-500">기업이 추구하는 인재상과 핵심 역량 키워드를 설정합니다.</p>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="text-sm text-blue-700 font-medium">
          이 정보는 향후 AI가 채용공고를 자동 작성할 때 참고하여, 기업의 인재상에 맞는 공고 문구를 생성합니다.
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-1 block">기업 가치관 / 인재상</label>
        <p className="text-xs text-gray-400 mb-2">한 줄에 하나씩 입력합니다.</p>
        <textarea
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 resize-y"
          rows={4}
          value={values}
          onChange={(e) => {
            const lines = e.target.value.split("\n").filter((l) => l.trim());
            updateField("talentProfile.values", lines);
          }}
          placeholder="예:&#10;도전을 두려워하지 않는 인재&#10;함께 성장하는 협업형 인재&#10;고객 중심의 사고를 하는 인재"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-1 block">핵심 역량 키워드</label>
        <p className="text-xs text-gray-400 mb-2">Enter 또는 콤마(,)로 구분하여 입력합니다.</p>
        <TagInput
          tags={profile.talentProfile.keywords}
          onChange={(tags) => updateField("talentProfile.keywords", tags)}
          placeholder="예: 도전정신, 창의력, 글로벌 역량"
        />
      </div>
    </div>
  );
}

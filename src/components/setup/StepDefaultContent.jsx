import { useCompanyProfile } from "../../context/CompanyProfileContext";
import EditableList from "../common/EditableList";

function SectionBlock({ title, description, children }) {
  return (
    <div className="p-5 bg-[#f5f5f7] rounded-2xl">
      <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-0.5">{title}</h3>
      {description && <p className="text-[12px] text-[#86868b] mb-3">{description}</p>}
      {children}
    </div>
  );
}

export default function StepDefaultContent() {
  const { profile, updateField } = useCompanyProfile();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] tracking-tight">기본 콘텐츠</h2>
        <p className="text-[14px] text-[#86868b] mt-1">채용공고 포스터에 기본으로 표시되는 내용을 편집합니다.</p>
      </div>

      <SectionBlock
        title="공통지원자격"
        description="모든 직무에 공통으로 적용되는 지원 자격 요건입니다."
      >
        <EditableList
          items={profile.commonQualifications}
          onChange={(items) => updateField("commonQualifications", items)}
          hasHighlight
          placeholder="새 자격 요건 입력"
        />
      </SectionBlock>

      <SectionBlock
        title="접수방법"
        description="서류 접수 방법에 대한 안내 문구입니다."
      >
        <EditableList
          items={profile.applicationMethod}
          onChange={(items) => updateField("applicationMethod", items)}
          placeholder="새 접수방법 안내 입력"
        />
      </SectionBlock>

      <SectionBlock
        title="추가 안내사항"
        description="서류전형 결과 발표, 검사 방법 등 추가 안내 사항입니다."
      >
        <EditableList
          items={profile.additionalInfo}
          onChange={(items) => updateField("additionalInfo", items)}
          hasHighlight
          placeholder="새 안내사항 입력"
        />
      </SectionBlock>

      <SectionBlock
        title="기타 사항"
        description="포스터 하단에 표시되는 기타 참고 사항입니다."
      >
        <EditableList
          items={profile.notes}
          onChange={(items) => updateField("notes", items)}
          placeholder="새 기타 사항 입력"
        />
      </SectionBlock>

      <SectionBlock
        title="유의사항 (입사결격사유)"
        description="불합격 처리 또는 채용 취소 사유가 되는 항목입니다."
      >
        <EditableList
          items={profile.cautions}
          onChange={(items) => updateField("cautions", items)}
          placeholder="새 유의사항 입력"
        />
      </SectionBlock>
    </div>
  );
}

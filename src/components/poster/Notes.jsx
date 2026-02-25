import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import SectionHeader from "./SectionHeader";

export default function Notes() {
  const { profile, theme } = useCompanyProfile();

  const contactLine = profile.contactInfo
    ? `기타 채용관련 문의사항은 ${profile.contactInfo.team} ☎${profile.contactInfo.phone} 또는 이메일(${profile.contactInfo.email})`
    : null;

  const allNotes = contactLine
    ? [...profile.notes, contactLine]
    : profile.notes;

  return (
    <div style={{ padding: "20px 20px 30px" }}>
      <SectionHeader>기타</SectionHeader>
      <div
        style={{
          fontSize: 12,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: theme.sub,
          marginBottom: 20,
        }}
      >
        {allNotes.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>•</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      <SectionHeader>유의사항</SectionHeader>
      <div
        style={{
          fontSize: 12,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: theme.text,
          background: theme.accentLight,
          border: `1px solid ${theme.accent}`,
          borderRadius: 6,
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <span>•</span>
          <span>
            아래 항목 중 어느 하나에 해당되는 경우{" "}
            <strong style={{ color: theme.primary, fontWeight: 700, textDecoration: "underline" }}>
              입사결격사유
            </strong>
            가 되어{" "}
            <strong style={{ color: theme.primary, fontWeight: 700, textDecoration: "underline" }}>
              불합격 처리 또는 채용 취소
            </strong>{" "}
            될 수 있습니다.
          </span>
        </div>
        {profile.cautions.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 8, paddingLeft: 16 }}>
            <span style={{ color: theme.success }}>✓</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

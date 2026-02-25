import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import SectionHeader from "./SectionHeader";

export default function CommonQuals() {
  const { profile, theme } = useCompanyProfile();

  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>공통지원자격</SectionHeader>
      <div
        style={{
          background: theme.secondaryLight,
          border: `1px solid ${theme.secondaryBorder}`,
          borderRadius: 6,
          padding: "12px 16px",
        }}
      >
        {profile.commonQualifications.map((it, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: i < arr.length - 1 ? 5 : 0,
              fontSize: 13,
              fontWeight: it.highlight ? 500 : 200,
              fontFamily: FONT,
              lineHeight: 1.6,
              color: it.highlight ? theme.primary : theme.text,
            }}
          >
            <span>•</span>
            <span>{it.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

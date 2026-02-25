import { FONT } from "../../utils/constants";
import { formatSchedule } from "../../utils/helpers";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import SectionHeader from "./SectionHeader";

export default function AppPeriod({ schedule, year }) {
  const { profile, theme } = useCompanyProfile();
  const formatted = formatSchedule(schedule, year);

  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>서류 접수기간 및 방법</SectionHeader>
      <div
        style={{
          background: theme.secondaryLight,
          border: `1px solid ${theme.infoBorder}`,
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontFamily: FONT,
            fontSize: 13,
            color: theme.secondary,
            flexShrink: 0,
          }}
        >
          접수기간
        </span>
        <span style={{ color: "#AAAAAA", fontSize: 12 }}>|</span>
        <strong style={{ color: theme.primary, fontWeight: 700, fontFamily: FONT, fontSize: 13 }}>
          {formatted}
        </strong>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: theme.text,
        }}
      >
        {profile.applicationMethod.map((text, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>•</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function AdditionalInfo({ finalHireMonth }) {
  const { profile, theme } = useCompanyProfile();

  return (
    <div style={{ padding: "0 20px 10px" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: theme.text,
          background: theme.gray,
          padding: "12px 16px",
          borderRadius: 6,
          borderLeft: `4px solid ${theme.secondary}`,
        }}
      >
        {profile.additionalInfo.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>•</span>
            <span>{item.text}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>
            최종 입사:{" "}
            <strong style={{ color: theme.primary, fontWeight: 700 }}>
              {finalHireMonth || "(일정 확인 후 자동 계산)"}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

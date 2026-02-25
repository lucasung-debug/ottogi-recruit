import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function SectionHeader({ children }) {
  const { theme } = useCompanyProfile();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 15,
        fontWeight: 700,
        fontFamily: FONT,
        color: theme.secondary,
        borderBottom: `2px solid ${theme.secondary}`,
        paddingBottom: 7,
        marginBottom: 14,
        letterSpacing: 0.5,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 4,
          height: 16,
          background: theme.accent,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

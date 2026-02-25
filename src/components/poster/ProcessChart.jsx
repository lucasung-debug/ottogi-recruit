import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import SectionHeader from "./SectionHeader";

export default function ProcessChart({ steps }) {
  const { theme } = useCompanyProfile();

  if (!steps.length) return null;
  const ARROW = 14;

  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>채용 프로세스</SectionHeader>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          rowGap: 16,
          padding: "16px 0",
        }}
      >
        {steps.map((s, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          const bg = isLast ? theme.accent : theme.secondary;
          const textColor = isLast ? theme.secondary : theme.white;
          let clipPath;
          if (steps.length === 1) {
            clipPath = "none";
          } else if (isFirst) {
            clipPath = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%)`;
          } else if (isLast) {
            clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${ARROW}px 50%)`;
          } else {
            clipPath = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%, ${ARROW}px 50%)`;
          }
          const marginLeft = isFirst ? 0 : -ARROW;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                marginLeft,
                zIndex: i + 1,
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: FONT,
                  color: theme.secondary,
                  letterSpacing: 0.5,
                }}
              >
                STEP {i + 1}
              </span>
              <div
                style={{
                  width: 120,
                  height: 52,
                  background: bg,
                  clipPath,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: FONT,
                  color: textColor,
                  textAlign: "center",
                  lineHeight: 1.3,
                  padding: isFirst
                    ? `0 ${ARROW + 8}px 0 8px`
                    : isLast
                    ? `0 8px 0 ${ARROW + 8}px`
                    : `0 ${ARROW + 8}px 0 ${ARROW + 8}px`,
                  boxSizing: "border-box",
                  wordBreak: "keep-all",
                }}
              >
                {s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

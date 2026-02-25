import { FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import SectionHeader from "./SectionHeader";

export default function PosterTable({ jobs }) {
  const { theme } = useCompanyProfile();

  if (!jobs.length) return null;
  const cellStyle = {
    padding: "10px 12px",
    fontSize: 12,
    fontWeight: 200,
    fontFamily: FONT,
    lineHeight: 1.7,
    verticalAlign: "top",
    color: "#111111",
    wordBreak: "keep-all",
  };

  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>모집부문</SectionHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {jobs.map((j, i) => (
          <div
            key={i}
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                background: theme.accent,
                color: theme.secondary,
                fontWeight: 700,
                fontFamily: FONT,
                fontSize: 14,
                padding: "8px 16px",
                letterSpacing: 0.5,
              }}
            >
              {j.jobName}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  ...cellStyle,
                  flex: 1,
                  borderRight: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: theme.secondary,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  담당업무 및 비전
                </div>
                {j.tasks.map((t, k) => (
                  <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{t}</div>
                ))}
              </div>
              <div
                style={{
                  ...cellStyle,
                  width: 110,
                  flexShrink: 0,
                  borderRight: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: theme.secondary,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  우대전공
                </div>
                {j.major || "전공무관"}
              </div>
              <div style={{ ...cellStyle, flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: theme.secondary,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  자격요건
                </div>
                {j.required.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontFamily: FONT,
                        color: theme.secondary,
                        marginBottom: 3,
                        fontSize: 11,
                      }}
                    >
                      [ 필수사항 ]
                    </div>
                    {j.required.map((q, k) => (
                      <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{q}</div>
                    ))}
                  </div>
                )}
                {j.preferred.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontFamily: FONT,
                        color: theme.secondary,
                        marginBottom: 3,
                        fontSize: 11,
                      }}
                    >
                      [ 우대사항 ]
                    </div>
                    {j.preferred.map((q, k) => (
                      <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{q}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

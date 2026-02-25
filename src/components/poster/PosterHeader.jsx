import { POSTER_W, FONT } from "../../utils/constants";
import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function PosterHeader({ title, logoUrl }) {
  const { theme } = useCompanyProfile();
  const lines = title.split("\n");
  const top = lines[0] || "";
  const main = lines.slice(1).join(" ") || "";

  return (
    <div style={{ width: POSTER_W, background: theme.white, padding: "0 20px", boxSizing: "border-box" }}>
      <div style={{ position: "relative" }}>
        <img
          src={`${import.meta.env.BASE_URL}images/banner.png`}
          alt="배너"
          style={{
            width: "100%",
            height: "160px",
            display: "block",
            objectFit: "cover",
            objectPosition: "center",
          }}
          crossOrigin="anonymous"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transform: "translateY(-7px)",
          }}
        >
          {top && (
            <div
              style={{
                color: theme.secondary,
                padding: "5px 26px",
                borderRadius: 3,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: FONT,
                letterSpacing: 1,
              }}
            >
              {top}
            </div>
          )}
          {main && (
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                fontFamily: FONT,
                color: theme.secondary,
                letterSpacing: 2,
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {main}
            </div>
          )}
        </div>

        {logoUrl && (
          <img
            src={logoUrl}
            alt="로고"
            style={{
              position: "absolute",
              top: 14,
              right: 18,
              height: 35,
              objectFit: "contain",
            }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
}

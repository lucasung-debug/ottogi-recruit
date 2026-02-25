/**
 * 동적 테마 생성 시스템
 *
 * 브랜드 컬러 3개(primary, secondary, accent)로부터
 * 전체 UI + 포스터 팔레트를 자동 생성합니다.
 */

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount
  );
}

export function generateTheme(brandColors) {
  const { primary, secondary, accent } = brandColors;

  return {
    // 브랜드 컬러 (포스터 + 강조)
    primary,
    secondary,
    accent,

    // 파생 컬러 (브랜드 기반)
    accentLight: lighten(accent, 0.9),
    secondaryLight: lighten(secondary, 0.92),
    secondaryBorder: lighten(secondary, 0.85),
    primaryLight: lighten(primary, 0.92),

    // Apple-style UI 컬러
    text: "#1d1d1f",
    textSecondary: "#6e6e73",
    textTertiary: "#86868b",
    bg: "#f5f5f7",
    card: "#ffffff",
    border: "rgba(0, 0, 0, 0.06)",
    borderSolid: "#d2d2d7",

    // Apple 시스템 컬러
    blue: "#0071e3",
    blueLight: "rgba(0, 113, 227, 0.08)",
    green: "#34c759",
    greenLight: "rgba(52, 199, 89, 0.1)",
    red: "#ff3b30",
    redLight: "rgba(255, 59, 48, 0.1)",
    orange: "#ff9500",

    // 레거시 호환 (포스터 + 기존 코드)
    sub: "#6e6e73",
    gray: "#f5f5f7",
    white: "#ffffff",
    success: "#34c759",
    successLight: "rgba(52, 199, 89, 0.1)",
    info: "#0071e3",
    infoLight: "rgba(0, 113, 227, 0.06)",
    infoBorder: "rgba(0, 113, 227, 0.15)",
  };
}

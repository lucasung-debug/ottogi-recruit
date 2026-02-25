/**
 * 동적 테마 생성 시스템
 *
 * 브랜드 컬러 3개(primary, secondary, accent)로부터
 * 전체 UI 팔레트를 자동 생성합니다.
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
    // 브랜드 컬러 (직접 매핑)
    primary,        // C.red → theme.primary
    secondary,      // C.darkBlue → theme.secondary
    accent,         // C.yellow → theme.accent

    // 파생 컬러 (브랜드 기반 자동 생성)
    accentLight: lighten(accent, 0.9),      // C.cream → 유의사항 박스 배경
    secondaryLight: lighten(secondary, 0.92), // #F8F9FF → 공통자격 배경
    secondaryBorder: lighten(secondary, 0.85), // #E0E4F5 → 공통자격 border
    primaryLight: lighten(primary, 0.9),     // #FFEBEE → 에러 배경

    // UI 기본 컬러 (고정, 브랜드 무관)
    text: "#222222",
    sub: "#555555",
    border: "#CCCCCC",
    gray: "#F7F7F7",
    white: "#FFFFFF",

    // 상태 컬러 (고정)
    success: "#6BAF3D",
    successLight: "#E8F5E9",
    info: "#4BACC6",
    infoLight: "#E8F4FD",
    infoBorder: "#C5CCEE",
  };
}

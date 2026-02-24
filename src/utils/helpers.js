/**
 * 공통 유틸리티 함수
 */

const DAY_MAP = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" };

/**
 * 일정 문자열("M/DD ~ M/DD") → 포맷된 날짜 문자열
 */
export function formatSchedule(schedule, year) {
  if (!schedule || schedule.includes("0/00")) {
    return `${year}년 (시트에서 일정을 입력해주세요)`;
  }
  try {
    const parts = schedule.split("~").map((s) => s.trim());
    const fmt = parts.map((p) => {
      const [m, d] = p.split("/").map(Number);
      const dt = new Date(year, m - 1, d);
      return `${m}월 ${d}일(${DAY_MAP[dt.getDay()]})`;
    });
    return `${year}년 ${fmt[0]} ~ ${fmt[1]} 23:59`;
  } catch {
    return `${year}년 ${schedule}`;
  }
}

/**
 * 접수 마감일 + 6주 → "N월 중 예정"
 */
export function calcFinalHireMonth(schedule, year) {
  try {
    const end = schedule.split("~")[1].trim().split("/");
    const dt = new Date(year, parseInt(end[0]) - 1, parseInt(end[1]));
    dt.setMonth(dt.getMonth() + 1);
    dt.setDate(dt.getDate() + 14);
    return `${dt.getMonth() + 1}월 중 예정`;
  } catch {
    return "";
  }
}

/**
 * 로고 이미지 검은 배경 → 투명 변환
 */
export function processLogo(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = img.width;
      cv.height = img.height;
      const ctx = cv.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, cv.width, cv.height);
      const px = d.data;
      for (let i = 0; i < px.length; i += 4) {
        const brightness = (px[i] + px[i + 1] + px[i + 2]) / 3;
        if (brightness < 35) px[i + 3] = 0;
        else if (brightness < 65)
          px[i + 3] = Math.round(((brightness - 35) / 30) * 255);
      }
      ctx.putImageData(d, 0, 0);
      resolve(cv.toDataURL("image/png"));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * AI 채용공고 생성 클라이언트 서비스
 *
 * Vercel Serverless Function(/api/generate)을 호출하여
 * OpenAI GPT-4o 기반 채용공고 콘텐츠를 생성합니다.
 */

const AI_ENDPOINT = "/api/generate";
const TIMEOUT_MS = 30000;
const MIN_INTERVAL_MS = 5000;

let lastRequestTime = 0;

export async function generateJobPosting({
  jobTitle,
  employmentType,
  experienceLevel,
  companyContext,
  apiKey,
}) {
  // 요청 간격 제한
  const now = Date.now();
  if (now - lastRequestTime < MIN_INTERVAL_MS) {
    const waitSec = Math.ceil((MIN_INTERVAL_MS - (now - lastRequestTime)) / 1000);
    throw new Error(`너무 빠른 요청입니다. ${waitSec}초 후에 다시 시도해주세요.`);
  }
  lastRequestTime = now;

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        jobTitle,
        employmentType: employmentType || "정규직",
        experienceLevel: experienceLevel || "신입/경력",
        companyContext: companyContext || null,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    // 클라이언트 측 기본 검증
    if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length === 0) {
      throw new Error("AI 응답에서 직무 데이터를 찾을 수 없습니다.");
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("요청 시간이 초과되었습니다 (30초). 다시 시도해주세요.");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

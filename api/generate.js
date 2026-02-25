import OpenAI from "openai";

// ===== 프롬프트 빌더 =====

function buildSystemPrompt() {
  return `당신은 한국 기업 채용공고 작성 전문가입니다.

규칙:
1. NCS(국가직무능력표준) 기반으로 직무 내용을 구체적이고 실무적으로 기술합니다.
2. 블라인드 채용 가이드라인을 준수합니다. 출신학교, 나이, 성별, 외모, 가족관계 관련 요건을 절대 포함하지 않습니다.
3. 자격요건은 필수사항과 우대사항을 명확히 구분합니다.
4. 채용프로세스는 한국 기업의 일반적 채용 절차를 따릅니다.
5. 법적 필수 공시사항(보훈대상자, 장애인 우대)을 자격요건에 포함합니다.
6. 격식 있는 합니다체를 사용합니다.
7. 응답은 반드시 지정된 JSON 형식으로만 출력합니다. 마크다운, 설명 텍스트, 주석 등을 포함하지 않습니다.`;
}

function buildUserPrompt({ jobTitle, employmentType, experienceLevel, companyContext }) {
  let companySection = "";
  if (companyContext) {
    const parts = [];
    if (companyContext.companyName) {
      parts.push(`회사명: ${companyContext.companyName}`);
    }
    if (companyContext.talentValues?.length) {
      parts.push(`인재상: ${companyContext.talentValues.join(", ")}`);
    }
    if (companyContext.talentKeywords?.length) {
      parts.push(`핵심역량 키워드: ${companyContext.talentKeywords.join(", ")}`);
    }
    if (parts.length) {
      companySection = `\n\n기업 정보:\n${parts.join("\n")}\n이 기업의 인재상과 가치관을 반영하여 작성하십시오.`;
    }
  }

  return `다음 조건으로 채용공고 콘텐츠를 JSON 형식으로 생성하십시오.${companySection}

직무명: ${jobTitle}
고용형태: ${employmentType || "정규직"}
경력구분: ${experienceLevel || "신입/경력"}

아래 JSON 스키마를 정확히 따르십시오:
{
  "jobs": [
    {
      "jobName": "직무명 (간결하게)",
      "tasks": ["담당업무 항목 5~8개"],
      "major": "우대 전공 (예: 경영학, 마케팅 관련 전공) 또는 전공무관",
      "required": ["필수 자격요건 3~5개 (보훈대상자/장애인 우대 포함)"],
      "preferred": ["우대사항 3~5개"],
      "process": ["채용 프로세스 단계 (예: 서류전형, 인성검사, 1차면접, 2차면접, 최종합격)"],
      "headcount": "0명"
    }
  ],
  "suggestedTitle": "채용공고 제목 제안 (예: 2026년 상반기\\n마케팅 담당자 채용)"
}

JSON 형식으로만 응답하십시오.`;
}

// ===== 응답 검증 =====

function validateJobResponse(data) {
  if (!data || !Array.isArray(data.jobs) || data.jobs.length === 0) {
    throw new Error("AI 응답에 jobs 배열이 없습니다.");
  }

  const defaultProcess = ["서류전형", "인성검사", "1차면접", "2차면접", "최종합격"];

  const jobs = data.jobs.map((job, idx) => ({
    seq: String(idx + 1),
    jobName: job.jobName || "미정",
    tasks: Array.isArray(job.tasks) && job.tasks.length > 0 ? job.tasks : ["담당업무를 입력해주세요"],
    major: job.major || "전공무관",
    required: Array.isArray(job.required) ? job.required : [],
    preferred: Array.isArray(job.preferred) ? job.preferred : [],
    process: Array.isArray(job.process) && job.process.length > 0 ? job.process : defaultProcess,
    schedule: job.schedule || "",
    headcount: job.headcount || "0명",
  }));

  return {
    jobs,
    suggestedTitle: data.suggestedTitle || "",
  };
}

// ===== Vercel Serverless Function =====

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({
      error: "API 키가 필요합니다. 설정에서 OpenAI API 키를 입력해주세요.",
    });
  }

  const { jobTitle, employmentType, experienceLevel, companyContext } = req.body;

  if (!jobTitle || !jobTitle.trim()) {
    return res.status(400).json({ error: "직무명(jobTitle)은 필수입니다." });
  }

  const client = new OpenAI({ apiKey });

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt({ jobTitle, employmentType, experienceLevel, companyContext });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("AI 응답이 비어있습니다.");
    }

    const parsed = JSON.parse(text);
    const validated = validateJobResponse(parsed);

    return res.status(200).json(validated);
  } catch (err) {
    if (err.status === 401 || err.code === "invalid_api_key") {
      return res.status(401).json({ error: "API 키가 유효하지 않습니다. 설정에서 확인해주세요." });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요." });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "AI 응답을 파싱할 수 없습니다. 다시 시도해주세요." });
    }
    return res.status(500).json({ error: `AI 생성 실패: ${err.message}` });
  }
}

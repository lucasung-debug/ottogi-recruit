import Poster from "../poster/Poster";

const SAMPLE_JOBS = [
  {
    jobName: "경영기획",
    tasks: ["경영전략 수립 및 사업계획 관리", "성과관리 및 조직관리 지원"],
    major: "경영학, 경제학",
    required: ["관련 학위 소지자"],
    preferred: ["ERP 시스템 운영 경험자"],
    process: ["서류전형", "인적성검사", "1차 면접", "2차 면접", "최종합격"],
    schedule: "",
    headcount: "0명",
  },
];

export default function MiniPosterPreview() {
  return (
    <div className="hidden xl:block">
      <div className="text-[11px] font-semibold text-[#86868b] mb-3 tracking-wide uppercase">
        실시간 미리보기
      </div>
      <div
        className="apple-card overflow-hidden"
        style={{ width: 260 }}
      >
        <div style={{ transform: "scale(0.3)", transformOrigin: "top left", width: 860, height: "auto" }}>
          <Poster
            title={"2026년 상반기\n대졸 신입사원 수시채용"}
            jobs={SAMPLE_JOBS}
            processSteps={SAMPLE_JOBS[0].process}
            schedule=""
            year={2026}
            finalHireMonth=""
            logoUrl=""
          />
        </div>
      </div>
    </div>
  );
}

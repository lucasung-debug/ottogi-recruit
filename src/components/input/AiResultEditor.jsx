import EditableList from "../common/EditableList";

export default function AiResultEditor({
  aiResult,
  onAiResultUpdate,
  onApplyTitle,
}) {
  if (!aiResult || !aiResult.jobs?.length) return null;

  const updateJob = (jobIdx, field, value) => {
    const updatedJobs = aiResult.jobs.map((job, i) => {
      if (i !== jobIdx) return job;
      return { ...job, [field]: value };
    });
    onAiResultUpdate({ ...aiResult, jobs: updatedJobs });
  };

  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white bg-[#34c759]">
          2
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">AI 생성 결과 편집</h3>
        <span className="text-[12px] text-[#86868b]">클릭하여 수정 가능</span>
      </div>

      {/* 제안 제목 */}
      {aiResult.suggestedTitle && (
        <div className="mb-5 p-4 bg-[#0071e3]/[0.06] rounded-xl border border-[#0071e3]/10">
          <p className="text-[12px] font-semibold text-[#0071e3] mb-1.5">AI 추천 제목</p>
          <p className="text-[14px] font-bold text-[#1d1d1f] whitespace-pre-line leading-relaxed">
            {aiResult.suggestedTitle}
          </p>
          <button
            onClick={() => onApplyTitle(aiResult.suggestedTitle)}
            className="apple-btn apple-btn-primary mt-3 text-[12px] py-1.5 px-4"
          >
            제목에 적용
          </button>
        </div>
      )}

      {/* 각 직무 편집 */}
      {aiResult.jobs.map((job, jobIdx) => (
        <div
          key={jobIdx}
          className={`p-4 bg-[#f5f5f7] rounded-2xl ${
            jobIdx < aiResult.jobs.length - 1 ? "mb-4" : ""
          }`}
        >
          {/* 직무명 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">직무명</label>
            <input
              type="text"
              value={job.jobName}
              onChange={(e) => updateJob(jobIdx, "jobName", e.target.value)}
              className="apple-input font-semibold"
            />
          </div>

          {/* 담당업무 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">담당업무</label>
            <EditableList
              items={job.tasks}
              onChange={(tasks) => updateJob(jobIdx, "tasks", tasks)}
              placeholder="담당업무 추가"
            />
          </div>

          {/* 우대전공 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">우대 전공</label>
            <input
              type="text"
              value={job.major}
              onChange={(e) => updateJob(jobIdx, "major", e.target.value)}
              className="apple-input text-[13px]"
            />
          </div>

          {/* 필수 자격요건 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">필수 자격요건</label>
            <EditableList
              items={job.required}
              onChange={(required) => updateJob(jobIdx, "required", required)}
              placeholder="필수 자격요건 추가"
            />
          </div>

          {/* 우대사항 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">우대사항</label>
            <EditableList
              items={job.preferred}
              onChange={(preferred) => updateJob(jobIdx, "preferred", preferred)}
              placeholder="우대사항 추가"
            />
          </div>

          {/* 채용 프로세스 */}
          <div className="mb-3">
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">채용 프로세스</label>
            <EditableList
              items={job.process}
              onChange={(process) => updateJob(jobIdx, "process", process)}
              placeholder="프로세스 단계 추가"
            />
          </div>

          {/* 인원 */}
          <div>
            <label className="text-[12px] font-semibold text-[#6e6e73] mb-1 block">채용인원</label>
            <input
              type="text"
              value={job.headcount}
              onChange={(e) => updateJob(jobIdx, "headcount", e.target.value)}
              className="apple-input w-28 text-[13px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

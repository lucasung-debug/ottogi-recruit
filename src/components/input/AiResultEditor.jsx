import { useCompanyProfile } from "../../context/CompanyProfileContext";
import EditableList from "../common/EditableList";

export default function AiResultEditor({
  aiResult,
  onAiResultUpdate,
  onApplyTitle,
}) {
  const { theme } = useCompanyProfile();

  if (!aiResult || !aiResult.jobs?.length) return null;

  const sectionStyle = {
    marginBottom: 20,
    padding: "20px 24px",
    background: theme.white,
    borderRadius: 12,
    border: "1px solid #E8E8E8",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };
  const labelStyle = {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    fontSize: 13,
    fontWeight: 800,
    background: theme.success,
    color: "white",
    flexShrink: 0,
  };
  const subLabelStyle = {
    fontSize: 12,
    color: theme.sub,
    marginBottom: 6,
    fontWeight: 600,
  };

  const updateJob = (jobIdx, field, value) => {
    const updatedJobs = aiResult.jobs.map((job, i) => {
      if (i !== jobIdx) return job;
      return { ...job, [field]: value };
    });
    onAiResultUpdate({ ...aiResult, jobs: updatedJobs });
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>
        <span style={badgeStyle}>2</span>
        <span>AI 생성 결과 편집</span>
        <span style={{ fontSize: 11, color: theme.sub, fontWeight: 400 }}>
          (클릭하여 수정 가능)
        </span>
      </div>

      {/* 제안 제목 */}
      {aiResult.suggestedTitle && (
        <div
          style={{
            marginBottom: 16,
            padding: "12px 16px",
            background: theme.infoLight,
            borderRadius: 8,
            border: `1px solid ${theme.infoBorder}`,
          }}
        >
          <div style={{ fontSize: 12, color: theme.secondary, fontWeight: 600, marginBottom: 6 }}>
            AI 추천 제목
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, whiteSpace: "pre-line" }}>
            {aiResult.suggestedTitle}
          </div>
          <button
            onClick={() => onApplyTitle(aiResult.suggestedTitle)}
            style={{
              marginTop: 8,
              padding: "6px 14px",
              background: theme.secondary,
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            제목에 적용
          </button>
        </div>
      )}

      {/* 각 직무 편집 */}
      {aiResult.jobs.map((job, jobIdx) => (
        <div
          key={jobIdx}
          style={{
            marginBottom: jobIdx < aiResult.jobs.length - 1 ? 20 : 0,
            padding: 16,
            background: theme.gray,
            borderRadius: 10,
            border: "1px solid #E8E8E8",
          }}
        >
          {/* 직무명 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>직무명</div>
            <input
              type="text"
              value={job.jobName}
              onChange={(e) => updateJob(jobIdx, "jobName", e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #DDD",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 담당업무 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>담당업무</div>
            <EditableList
              items={job.tasks}
              onChange={(tasks) => updateJob(jobIdx, "tasks", tasks)}
              placeholder="담당업무 추가"
            />
          </div>

          {/* 우대전공 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>우대 전공</div>
            <input
              type="text"
              value={job.major}
              onChange={(e) => updateJob(jobIdx, "major", e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #DDD",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 필수 자격요건 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>필수 자격요건</div>
            <EditableList
              items={job.required}
              onChange={(required) => updateJob(jobIdx, "required", required)}
              placeholder="필수 자격요건 추가"
            />
          </div>

          {/* 우대사항 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>우대사항</div>
            <EditableList
              items={job.preferred}
              onChange={(preferred) => updateJob(jobIdx, "preferred", preferred)}
              placeholder="우대사항 추가"
            />
          </div>

          {/* 채용 프로세스 */}
          <div style={{ marginBottom: 12 }}>
            <div style={subLabelStyle}>채용 프로세스</div>
            <EditableList
              items={job.process}
              onChange={(process) => updateJob(jobIdx, "process", process)}
              placeholder="프로세스 단계 추가"
            />
          </div>

          {/* 인원 */}
          <div>
            <div style={subLabelStyle}>채용인원</div>
            <input
              type="text"
              value={job.headcount}
              onChange={(e) => updateJob(jobIdx, "headcount", e.target.value)}
              style={{
                width: 120,
                padding: "8px 12px",
                border: "1px solid #DDD",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

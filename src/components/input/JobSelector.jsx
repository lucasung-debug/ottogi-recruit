import { matchJobs } from "../../utils/sheets";

export default function JobSelector({
  jobInput,
  setJobInput,
  sheetLoaded,
  availableJobs,
  allGroups,
}) {
  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white bg-[#0071e3]">
          3
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">모집 직무 선택</h3>
      </div>

      <p className="text-[12px] text-[#86868b] mb-2">
        공고에 포함할 직무명을 콤마(,)로 구분하여 입력
      </p>
      <input
        type="text"
        value={jobInput}
        onChange={(e) => setJobInput(e.target.value)}
        placeholder={
          sheetLoaded
            ? `예: ${availableJobs.slice(0, 2).join(", ")}`
            : "먼저 시트 데이터를 불러오세요"
        }
        disabled={!sheetLoaded}
        className={`apple-input ${!sheetLoaded ? "bg-[#f5f5f7] cursor-not-allowed" : ""}`}
      />

      {sheetLoaded && jobInput && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {jobInput
            .split(",")
            .map((q) => q.trim())
            .filter(Boolean)
            .map((q, i) => {
              const found = matchJobs(allGroups, [q]).length > 0;
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold ${
                    found
                      ? "bg-[#34c759]/10 text-[#248a3d] border border-[#34c759]/30"
                      : "bg-[#ff3b30]/10 text-[#d70015] border border-[#ff3b30]/30"
                  }`}
                >
                  {q}
                  <span>{found ? "✓" : "✗"}</span>
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
}

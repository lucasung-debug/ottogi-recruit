import Poster from "../components/poster/Poster";

export default function PreviewPage({
  posterRef,
  title,
  matchedJobs,
  processSteps,
  schedule,
  year,
  finalHireMonth,
  logoUrl,
  downloading,
  onBack,
  onDownload,
}) {
  const scale =
    typeof window !== "undefined"
      ? Math.min(1, (window.innerWidth - 60) / 860)
      : 0.6;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* 글래스 헤더 */}
      <div className="glass-header sticky top-0 z-50 px-6 py-3">
        <div className="max-w-[960px] mx-auto flex items-center gap-3 flex-wrap">
          <button
            onClick={onBack}
            className="apple-btn apple-btn-ghost text-[13px]"
          >
            ← 돌아가기
          </button>

          <button
            onClick={onDownload}
            disabled={downloading}
            className={`apple-btn apple-btn-primary text-[14px] font-bold px-6 ${
              downloading ? "opacity-60 cursor-wait" : ""
            }`}
          >
            {downloading ? "생성 중..." : "PNG 다운로드"}
          </button>

          <div className="flex-1 text-right text-[12px] text-[#86868b]">
            미리보기 ({Math.round(scale * 100)}%)
          </div>
        </div>
      </div>

      {/* 포스터 미리보기 */}
      <div className="flex flex-col items-center py-8 px-5">
        <div
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
        >
          <Poster
            ref={posterRef}
            title={title}
            jobs={matchedJobs}
            processSteps={processSteps}
            schedule={schedule}
            year={year}
            finalHireMonth={finalHireMonth}
            logoUrl={logoUrl}
          />
        </div>
      </div>
    </div>
  );
}

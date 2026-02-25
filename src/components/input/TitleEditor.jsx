export default function TitleEditor({ title, setTitle, year, setYear }) {
  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white bg-[#0071e3]">
          2
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">채용공고 제목</h3>
      </div>

      <p className="text-[12px] text-[#86868b] mb-2">
        첫째 줄 = 상단 배너, 둘째 줄 이후 = 메인 제목
      </p>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={2}
        className="apple-textarea mb-3"
      />

      <div className="flex items-center gap-3">
        <label className="text-[13px] font-semibold text-[#1d1d1f]">기준 연도</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
          className="apple-input w-20 text-center"
        />
      </div>
    </div>
  );
}

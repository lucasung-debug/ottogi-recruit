export default function SheetLoader({
  sheetUrl,
  setSheetUrl,
  loading,
  sheetLoaded,
  dataMode,
  showManual,
  setShowManual,
  manualTSV,
  setManualTSV,
  availableJobs,
  onFetchSheet,
  onManualPaste,
}) {
  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white ${
            sheetLoaded ? "bg-[#34c759]" : "bg-[#0071e3]"
          }`}
        >
          1
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">Google Sheets 데이터 연동</h3>
        {sheetLoaded && (
          <span className="text-[12px] font-semibold text-[#34c759]">
            ✓ {dataMode === "auto" ? "자동 연동" : "수동 입력"} 완료
          </span>
        )}
      </div>

      {/* 자동 연동 */}
      <div className="mb-3">
        <p className="text-[12px] text-[#86868b] mb-2">
          시트 URL을 입력하거나, 기본 시트를 바로 불러올 수 있습니다.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="Google Sheets URL (빈칸 = 기본 시트)"
            className="apple-input flex-1"
          />
          <button
            onClick={onFetchSheet}
            disabled={loading}
            className={`apple-btn shrink-0 ${
              sheetLoaded && dataMode === "auto"
                ? "bg-[#34c759] text-white hover:bg-[#30b855]"
                : "apple-btn-primary"
            } ${loading ? "opacity-60 cursor-wait" : ""}`}
          >
            {loading
              ? "불러오는 중..."
              : sheetLoaded && dataMode === "auto"
                ? "✓ 연동됨"
                : "불러오기"}
          </button>
        </div>
      </div>

      {/* 수동 입력 토글 */}
      <div className="border-t border-dashed border-[#d2d2d7] pt-3">
        <button
          onClick={() => setShowManual(!showManual)}
          className="text-[13px] font-medium text-[#0071e3] hover:underline"
        >
          {showManual ? "▾" : "▸"} 수동 붙여넣기 (자동 연동 실패 시)
        </button>
        {showManual && (
          <div className="mt-3">
            <div className="bg-[#0071e3]/[0.06] rounded-xl p-3 mb-3 text-[12px] leading-relaxed text-[#1d1d1f]">
              <strong>방법:</strong> Google Sheets → Ctrl+A (전체선택) →
              Ctrl+C (복사) → 아래 Ctrl+V (붙여넣기)
            </div>
            <textarea
              value={manualTSV}
              onChange={(e) => {
                setManualTSV(e.target.value);
                if (e.target.value.trim()) onManualPaste(e.target.value);
              }}
              placeholder="여기에 시트 데이터를 붙여넣으세요 (Ctrl+V)"
              rows={4}
              className={`apple-textarea font-mono text-[12px] ${
                dataMode === "manual"
                  ? "border-[#34c759] bg-[#34c759]/[0.04]"
                  : ""
              }`}
            />
          </div>
        )}
      </div>

      {/* 인식 결과 */}
      {sheetLoaded && (
        <div className="mt-3 p-3 bg-[#34c759]/10 rounded-xl text-[13px] text-[#248a3d]">
          ✓ <strong>{availableJobs.length}개 직무</strong> 인식:{" "}
          <span className="flex flex-wrap gap-1.5 mt-1.5">
            {availableJobs.map((j, i) => (
              <span
                key={i}
                className="inline-block bg-white px-2.5 py-0.5 rounded-full text-[12px] font-semibold border border-[#34c759]/30"
              >
                {j}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

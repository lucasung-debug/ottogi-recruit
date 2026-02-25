export default function LogoUploader({ logoUrl, onLogoChange }) {
  return (
    <div className="apple-card p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white ${
            logoUrl ? "bg-[#34c759]" : "bg-[#0071e3]"
          }`}
        >
          4
        </div>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">기업 로고</h3>
        <span className="text-[12px] text-[#86868b]">선택</span>
      </div>

      <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-[#d2d2d7] rounded-2xl cursor-pointer hover:border-[#0071e3] hover:bg-[#0071e3]/[0.02] transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={onLogoChange}
          className="hidden"
        />
        {logoUrl ? (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f5f5f7] rounded-xl">
              <img src={logoUrl} alt="logo" className="h-10 object-contain" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#34c759]">✓ 로고 적용됨</p>
              <p className="text-[12px] text-[#86868b]">클릭하여 변경</p>
            </div>
          </div>
        ) : (
          <>
            <span className="text-[24px] text-[#86868b]">↑</span>
            <span className="text-[13px] text-[#86868b]">클릭하여 로고 이미지 업로드</span>
          </>
        )}
      </label>
    </div>
  );
}

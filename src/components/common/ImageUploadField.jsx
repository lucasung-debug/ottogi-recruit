import { useRef } from "react";
import { processLogo } from "../../utils/helpers";

export default function ImageUploadField({ label, value, onChange, processImage = false, height = 60 }) {
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target.result;
      if (processImage) {
        onChange(await processLogo(dataUrl));
      } else {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="text-[14px] font-semibold text-[#1d1d1f] mb-2">{label}</div>
      <div
        className="border-2 border-dashed border-[#d2d2d7] rounded-2xl p-5 text-center cursor-pointer hover:border-[#0071e3] hover:bg-[#0071e3]/[0.02] transition-all"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="flex items-center justify-center gap-4">
            <img src={value} alt={label} style={{ height }} className="object-contain rounded-lg" />
            <span className="text-[12px] text-[#86868b]">클릭하여 변경</span>
          </div>
        ) : (
          <div className="py-3">
            <div className="text-[14px] text-[#86868b] font-medium">클릭하여 업로드</div>
            <div className="text-[12px] text-[#aeaeb2] mt-1">PNG, JPG, SVG</div>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {value && (
        <button
          className="mt-2 text-[12px] text-[#ff3b30]/70 hover:text-[#ff3b30] cursor-pointer transition-colors"
          onClick={() => onChange("")}
        >
          이미지 제거
        </button>
      )}
    </div>
  );
}

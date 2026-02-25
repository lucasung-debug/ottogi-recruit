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
      <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="flex items-center justify-center gap-4">
            <img src={value} alt={label} style={{ height }} className="object-contain rounded" />
            <span className="text-xs text-gray-500">클릭하여 변경</span>
          </div>
        ) : (
          <div className="py-4">
            <div className="text-sm text-gray-400">클릭하여 이미지 업로드</div>
            <div className="text-xs text-gray-300 mt-1">PNG, JPG, SVG</div>
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
          className="mt-2 text-xs text-red-400 hover:text-red-600 cursor-pointer"
          onClick={() => onChange("")}
        >
          이미지 제거
        </button>
      )}
    </div>
  );
}

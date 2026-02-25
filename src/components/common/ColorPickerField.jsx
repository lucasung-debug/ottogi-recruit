export default function ColorPickerField({ label, value, onChange, description }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-lg border-2 border-gray-300 shrink-0 cursor-pointer overflow-hidden"
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full opacity-0 cursor-pointer"
          title={label}
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
        {description && <div className="text-xs text-gray-400 mb-1">{description}</div>}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          className="w-24 px-2 py-1 text-xs font-mono border border-gray-300 rounded"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

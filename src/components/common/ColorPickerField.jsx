export default function ColorPickerField({ label, value, onChange, description }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-2xl border border-black/10 shrink-0 cursor-pointer overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-transform hover:scale-105"
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
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-[#1d1d1f] mb-0.5">{label}</div>
        {description && <div className="text-[12px] text-[#86868b] mb-1.5">{description}</div>}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          className="w-24 px-2.5 py-1.5 text-[12px] font-mono text-[#1d1d1f] bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg outline-none focus:border-[#0071e3] transition-colors"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

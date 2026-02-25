import { useState } from "react";

export default function TagInput({ tags, onChange, placeholder = "키워드 입력 후 Enter" }) {
  const [input, setInput] = useState("");

  const addTag = (text) => {
    const trimmed = text.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (idx) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border border-[#d2d2d7] rounded-xl bg-white min-h-[44px] focus-within:border-[#0071e3] focus-within:shadow-[0_0_0_3px_rgba(0,113,227,0.12)] transition-all">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-medium bg-[#0071e3]/8 text-[#0071e3] rounded-full"
        >
          {tag}
          <button
            className="text-[#0071e3]/50 hover:text-[#0071e3] cursor-pointer text-[11px]"
            onClick={() => removeTag(i)}
          >
            &#x2715;
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[120px] px-1 py-1 text-[13px] outline-none bg-transparent text-[#1d1d1f] placeholder:text-[#86868b]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
}

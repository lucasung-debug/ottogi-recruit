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
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white min-h-[42px]">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full"
        >
          {tag}
          <button
            className="text-blue-400 hover:text-blue-700 cursor-pointer"
            onClick={() => removeTag(i)}
          >
            &#x2715;
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[120px] px-1 py-1 text-sm outline-none bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
}

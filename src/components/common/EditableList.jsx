import { useState } from "react";

export default function EditableList({ items, onChange, hasHighlight = false, placeholder = "새 항목 입력" }) {
  const [newText, setNewText] = useState("");
  const [editingIdx, setEditingIdx] = useState(-1);
  const [editText, setEditText] = useState("");

  const isObjectMode = hasHighlight || (items.length > 0 && typeof items[0] === "object");

  const getText = (item) => (typeof item === "object" ? item.text : item);
  const getHighlight = (item) => (typeof item === "object" ? item.highlight : false);

  const handleAdd = () => {
    if (!newText.trim()) return;
    const newItem = isObjectMode ? { text: newText.trim(), highlight: false } : newText.trim();
    onChange([...items, newItem]);
    setNewText("");
  };

  const handleRemove = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const handleMoveDown = (idx) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  const handleToggleHighlight = (idx) => {
    const next = items.map((item, i) => {
      if (i !== idx) return item;
      if (typeof item === "object") return { ...item, highlight: !item.highlight };
      return item;
    });
    onChange(next);
  };

  const startEdit = (idx) => {
    setEditingIdx(idx);
    setEditText(getText(items[idx]));
  };

  const finishEdit = (idx) => {
    if (!editText.trim()) {
      setEditingIdx(-1);
      return;
    }
    const next = items.map((item, i) => {
      if (i !== idx) return item;
      if (typeof item === "object") return { ...item, text: editText.trim() };
      return editText.trim();
    });
    onChange(next);
    setEditingIdx(-1);
  };

  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-2.5 bg-[#f5f5f7] rounded-xl group transition-colors hover:bg-[#ebebed]"
        >
          {editingIdx === i ? (
            <input
              className="apple-input flex-1 !py-1.5 !text-[13px] !rounded-lg"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => finishEdit(i)}
              onKeyDown={(e) => e.key === "Enter" && finishEdit(i)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-[13px] cursor-pointer rounded-lg px-1.5 py-0.5 transition-colors hover:bg-white ${
                getHighlight(item) ? "font-semibold text-[#ff3b30]" : "text-[#1d1d1f]"
              }`}
              onClick={() => startEdit(i)}
            >
              {getText(item)}
            </span>
          )}
          <div className="flex gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[11px] text-[#86868b] hover:bg-white transition-colors cursor-pointer disabled:opacity-30"
              onClick={() => handleMoveUp(i)}
              disabled={i === 0}
            >
              &#x25B2;
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[11px] text-[#86868b] hover:bg-white transition-colors cursor-pointer disabled:opacity-30"
              onClick={() => handleMoveDown(i)}
              disabled={i === items.length - 1}
            >
              &#x25BC;
            </button>
            {hasHighlight && (
              <button
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] transition-colors cursor-pointer ${
                  getHighlight(item) ? "bg-[#fff3cd] text-[#ff9500]" : "text-[#86868b] hover:bg-white"
                }`}
                onClick={() => handleToggleHighlight(i)}
              >
                &#x2B50;
              </button>
            )}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[11px] text-[#ff3b30]/60 hover:bg-[#ff3b30]/5 hover:text-[#ff3b30] transition-colors cursor-pointer"
              onClick={() => handleRemove(i)}
            >
              &#x2715;
            </button>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <input
          className="apple-input flex-1 !text-[13px]"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
        />
        <button
          className="apple-btn apple-btn-primary !text-[13px] !py-2 !px-4 shrink-0"
          onClick={handleAdd}
          disabled={!newText.trim()}
        >
          + 추가
        </button>
      </div>
    </div>
  );
}

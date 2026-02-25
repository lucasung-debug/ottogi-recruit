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

  const btnClass = "px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-default";

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
          {editingIdx === i ? (
            <input
              className="flex-1 px-2 py-1 text-sm border border-blue-400 rounded outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => finishEdit(i)}
              onKeyDown={(e) => e.key === "Enter" && finishEdit(i)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-sm cursor-pointer hover:bg-white rounded px-1 ${getHighlight(item) ? "font-bold text-red-600" : "text-gray-700"}`}
              onClick={() => startEdit(i)}
              title="클릭하여 편집"
            >
              {getText(item)}
            </span>
          )}
          <div className="flex gap-1 shrink-0">
            <button className={btnClass} onClick={() => handleMoveUp(i)} disabled={i === 0} title="위로">&#x25B2;</button>
            <button className={btnClass} onClick={() => handleMoveDown(i)} disabled={i === items.length - 1} title="아래로">&#x25BC;</button>
            {hasHighlight && (
              <button
                className={`${btnClass} ${getHighlight(item) ? "bg-yellow-100 border-yellow-400" : ""}`}
                onClick={() => handleToggleHighlight(i)}
                title="강조 토글"
              >
                &#x2B50;
              </button>
            )}
            <button className={`${btnClass} text-red-500 hover:bg-red-50`} onClick={() => handleRemove(i)} title="삭제">&#x2715;</button>
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
        />
        <button
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={handleAdd}
          disabled={!newText.trim()}
        >
          + 추가
        </button>
      </div>
    </div>
  );
}

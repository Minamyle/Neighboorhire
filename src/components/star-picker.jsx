import { useState } from "react";

// ── Star Picker (interactive) ──────────────────────────────────────────────────
export default function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(null);
  const active = hovered ?? value;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            size={28}
            className={
              star <= active
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300 dark:text-zinc-600"
            }
          />
        </button>
      ))}
    </div>
  );
}

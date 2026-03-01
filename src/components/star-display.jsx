// ── Star Display (read-only) ───────────────────────────────────────────────────
export default function StarDisplay({ rating }) {
  if (!rating)
    return (
      <span className="text-xs text-slate-400 dark:text-zinc-500 italic">
        Not rated
      </span>
    );
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return filled ? (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ) : half ? (
          <StarHalf
            key={i}
            size={13}
            className="text-amber-400 fill-amber-400"
          />
        ) : (
          <Star
            key={i}
            size={13}
            className="text-slate-300 dark:text-zinc-600"
          />
        );
      })}
      <span className="ml-1 text-xs font-semibold text-slate-500 dark:text-zinc-400">
        {rating}.0
      </span>
    </div>
  );
}

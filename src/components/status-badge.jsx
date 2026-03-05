// ── Status Badge ───────────────────────────────────────────────────────────────
export default function StatusBadge({ status }) {
  const map = {
    completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    "in-progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    accepted:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

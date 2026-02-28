function buildMonthlyData(jobs) {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const earned = jobs
      .filter((j) => {
        const jd = new Date(j.createdAt);
        return (
          jd.getFullYear() === d.getFullYear() && jd.getMonth() === d.getMonth()
        );
      })
      .reduce((s, j) => s + j.budget, 0);
    return { month: MONTH_NAMES[d.getMonth()], Earnings: earned, _date: d };
  });
}

function buildCategoryData(jobs) {
  const map = {};
  jobs.forEach((j) => {
    const cat = j.category ?? "Uncategorized";
    map[cat] = (map[cat] ?? 0) + j.budget;
  });
  const total = Object.values(map).reduce((s, v) => s + v, 0);
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amount]) => ({
      cat,
      amount,
      pct: total > 0 ? Math.round((amount / total) * 100) : 0,
    }));
}

function thisMonthEarnings(jobs) {
  const now = new Date();
  return jobs
    .filter((j) => {
      const d = new Date(j.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((s, j) => s + j.budget, 0);
}

function bestMonth(monthlyData) {
  return monthlyData.reduce(
    (best, m) => (m.Earnings > best.Earnings ? m : best),
    monthlyData[0],
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-bold text-slate-700 dark:text-white mb-1">{label}</p>
      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
        GH₵{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "from-violet-500 to-indigo-400",
  "from-emerald-500 to-teal-400",
  "from-rose-500 to-pink-400",
  "from-amber-500 to-yellow-400",
  "from-sky-500 to-cyan-400",
];

// ── Constants ──────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CATEGORY_COLORS = [
  {
    bg: "bg-violet-100 dark:bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-400",
    bar: "#8b5cf6",
  },
  {
    bg: "bg-blue-100 dark:bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-400",
    bar: "#3b82f6",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-400",
    bar: "#10b981",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-400",
    bar: "#f59e0b",
  },
  {
    bg: "bg-rose-100 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-400",
    bar: "#f43f5e",
  },
  {
    bg: "bg-sky-100 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-400",
    bar: "#0ea5e9",
  },
];
function Avatar({ name, index }) {
  const initials = (name ?? "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

export {
  AVATAR_COLORS,
  Avatar,
  getFullYear,
  getMonth,
  CustomTooltip,
  bestMonth,
  thisMonthEarnings,
  buildCategoryData,
  buildMonthlyData,
  CATEGORY_COLORS,
  MONTH_NAMES,
};

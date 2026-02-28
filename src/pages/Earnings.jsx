import { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { Wallet, TrendingUp, Clock, Trophy, Tag } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

// ── Helpers ────────────────────────────────────────────────────────────────────
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

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Earnings() {
  const { user, login } = useAuth();
  const { jobs } = useJobs();

  useEffect(() => {
    login("art_001");
  });

  // ── All derived data — computed unconditionally so hooks order never changes ──
  const completedJobs = useMemo(
    () =>
      jobs.filter((j) => j.artisanId === user?.id && j.status === "completed"),
    [jobs, user?.id],
  );

  const totalEarnings = useMemo(
    () => completedJobs.reduce((s, j) => s + j.budget, 0),
    [completedJobs],
  );

  const monthEarnings = useMemo(
    () => thisMonthEarnings(completedJobs),
    [completedJobs],
  );

  const pendingEarnings = useMemo(
    () =>
      jobs
        .filter(
          (j) =>
            j.artisanId === user?.id &&
            (j.status === "in-progress" || j.status === "accepted"),
        )
        .reduce((s, j) => s + j.budget, 0),
    [jobs, user?.id],
  );

  const monthlyData = useMemo(
    () => buildMonthlyData(completedJobs),
    [completedJobs],
  );
  const categoryData = useMemo(
    () => buildCategoryData(completedJobs),
    [completedJobs],
  );
  const best = useMemo(() => bestMonth(monthlyData), [monthlyData]);

  const sortedJobs = useMemo(
    () =>
      [...completedJobs].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      ),
    [completedJobs],
  );

  // ── Safe early return AFTER all hooks ──
  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-8 animate-enter">
      {/* ── Header ── */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-subtle">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Earnings
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mt-1">
          A full breakdown of your income, trends, and job categories.
        </p>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Earnings */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/20">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Total Earned
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              GH₵{totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* This Month */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-400 shadow-lg shadow-blue-500/20">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              This Month
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              GH₵{monthEarnings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 shadow-lg shadow-amber-500/20">
            <Clock size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Pending
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              GH₵{pendingEarnings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ── Chart + Best Month + Category ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart — spans 2 cols */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400">
              <TrendingUp size={13} className="text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
              Monthly Earnings
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 ml-8 mb-5">
            Last 6 months income from completed jobs
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={monthlyData}
              margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="rgba(148,163,184,0.2)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "currentColor", opacity: 0.45 }}
                axisLine={false}
                tickLine={false}
                width={52}
                tickFormatter={(v) =>
                  v >= 1000 ? `GH₵${v / 1000}k` : `GH₵${v}`
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(148,163,184,0.08)", radius: 6 }}
              />
              <Bar dataKey="Earnings" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {monthlyData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.month === best.month && best.Earnings > 0
                        ? "url(#bestGrad)"
                        : "url(#normalGrad)"
                    }
                  />
                ))}
              </Bar>
              <defs>
                <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="bestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#fcd34d" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>

          {/* Best month legend note */}
          {best.Earnings > 0 && (
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {best.month}
              </span>
              &nbsp;was your best month — GH₵{best.Earnings.toLocaleString()}
            </p>
          )}
        </div>

        {/* Right column — Best Month + Categories stacked */}
        <div className="flex flex-col gap-6">
          {/* Best Month Highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 shadow-lg shadow-amber-500/20 text-white flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Trophy size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-100">
                Best Month
              </p>
              <p className="text-2xl font-black mt-0.5">
                {best.Earnings > 0 ? best.month : "—"}
              </p>
              <p className="text-sm font-semibold text-amber-100 mt-0.5">
                {best.Earnings > 0
                  ? `GH₵${best.Earnings.toLocaleString()} earned`
                  : "No data yet"}
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="flex-1 p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-400">
                <Tag size={13} className="text-white" />
              </div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                By Category
              </h2>
            </div>

            {categoryData.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-zinc-500 italic">
                No completed jobs yet.
              </p>
            ) : (
              <div className="space-y-3">
                {categoryData.slice(0, 5).map((item, i) => {
                  const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                  return (
                    <div key={item.cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}
                        >
                          {item.cat}
                        </span>
                        <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                          {item.pct}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${item.pct}%`,
                            backgroundColor: color.bar,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Earnings Table ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/[0.07]">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Completed Jobs
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Every job you've been paid for, most recent first.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.07] bg-slate-50/80 dark:bg-white/[0.02]">
                {["Customer", "Job Title", "Category", "Amount", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {sortedJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center text-slate-400 dark:text-zinc-500 italic text-sm"
                  >
                    No completed jobs yet. Finish a job to see your earnings
                    here.
                  </td>
                </tr>
              ) : (
                sortedJobs.map((job, idx) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    {/* Customer */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          name={
                            job.customerName ?? job.customerId ?? "Customer"
                          }
                          index={idx}
                        />
                        <span className="font-semibold text-slate-800 dark:text-white text-sm">
                          {job.customerName ?? job.customerId ?? "Anonymous"}
                        </span>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-700 dark:text-zinc-200">
                      {job.title ?? job.jobTitle ?? "Untitled"}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                        {job.category ?? "—"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                        GH₵{job.budget?.toLocaleString() ?? "—"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400 dark:text-zinc-500">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Footer total */}
            {sortedJobs.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
                  <td
                    colSpan={3}
                    className="px-5 py-4 text-sm font-black text-slate-600 dark:text-zinc-300 uppercase tracking-wider"
                  >
                    Total
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-black">
                      GH₵{totalEarnings.toLocaleString()}
                    </span>
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

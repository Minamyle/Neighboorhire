import { BriefcaseBusiness, Clock, Wallet, TrendingUp } from "lucide-react";
import GlassTable from "../components/recentActivityTable";
import StatCard from "../components/statCard";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ── Helpers ───────────────────────────────────────────────────────────────────

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

/**
 * Buckets jobs by calendar month (last 6 months) and returns chart-ready data.
 * Each entry: { month, Earnings, Completed, Pending }
 */
function buildChartData(jobs) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      label: MONTH_NAMES[d.getMonth()],
    };
  });

  return months.map(({ year, month, label }) => {
    const monthJobs = jobs.filter((job) => {
      const d = new Date(job.createdAt);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    return {
      month: label,
      Earnings: monthJobs
        .filter((j) => j.status === "completed")
        .reduce((sum, j) => sum + j.budget, 0),
      Completed: monthJobs.filter((j) => j.status === "completed").length,
      Pending: monthJobs.filter((j) => j.status === "pending").length,
    };
  });
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-bold text-slate-700 dark:text-white mb-2">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          style={{ color: entry.color }}
          className="font-medium"
        >
          {entry.name}:{" "}
          {entry.name === "Earnings"
            ? `$${entry.value.toLocaleString()}`
            : entry.value}
        </p>
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ArtisanDashboardOverview() {
  const { user, login } = useAuth();
  const { jobs } = useJobs();

  useEffect(() => {
    login("art_001");
  });

  if (!user) return <p>Loading...</p>;

  const myJobs = jobs.filter((job) => job.artisanId === user.id);

  const stats = {
    totalEarnings: myJobs
      .filter((job) => job.status === "completed")
      .reduce((sum, job) => sum + job.budget, 0),
    completedCount: myJobs.filter((job) => job.status === "completed").length,
    pendingCount: myJobs.filter((job) => job.status === "pending").length,
    inProgressCount: myJobs.filter((job) => job.status === "in-progress")
      .length,
  };

  const recentJobs = [...myJobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const chartData = buildChartData(myJobs);

  return (
    <div className="space-y-8 animate-enter">
      {/* ── Welcome Section ── */}
      <div className="p-6 flex flex-col gap-2 rounded-2xl shadow-subtle border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome, {user.name}
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
          Here is what's happening with your business today.
        </p>
      </div>

      {/* ── Overview Cards Grid ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatCard
          title="Total Earnings"
          value={stats.totalEarnings}
          icon={Wallet}
          color="text-emerald-500"
          glowGradient="bg-gradient-to-br from-emerald-500 to-green-300"
          isCurrency
        />
        <StatCard
          title="Pending Jobs"
          value={stats.pendingCount}
          icon={Clock}
          color="text-orange-500"
          glowGradient="bg-gradient-to-br from-orange-500 to-yellow-300"
        />
        <StatCard
          title="Completed Jobs"
          value={stats.completedCount}
          icon={BriefcaseBusiness}
          color="text-blue-500"
          glowGradient="bg-gradient-to-br from-blue-600 to-blue-300"
        />
      </div>

      {/* ── Bar Chart Section ── */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-subtle">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-400">
                <TrendingUp size={14} className="text-white" />
              </div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
                Performance Overview
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 ml-8">
              Last 6 months · Earnings, completed & pending jobs
            </p>
          </div>

          {/* Legend pills */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              <span className="text-slate-600 dark:text-zinc-300">
                Earnings
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
              <span className="text-slate-600 dark:text-zinc-300">
                Completed
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-400 inline-block" />
              <span className="text-slate-600 dark:text-zinc-300">Pending</span>
            </span>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
            barCategoryGap="28%"
            barGap={4}
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
              width={48}
              tickFormatter={(v) => (v >= 1000 ? `$${v / 1000}k` : v)}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148,163,184,0.08)", radius: 6 }}
            />

            {/* Earnings bar */}
            <Bar
              dataKey="Earnings"
              fill="url(#earningsGrad)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />

            {/* Completed bar */}
            <Bar
              dataKey="Completed"
              fill="url(#completedGrad)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />

            {/* Pending bar */}
            <Bar
              dataKey="Pending"
              fill="url(#pendingGrad)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />

            {/* SVG gradient defs */}
            <defs>
              <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Table Section ── */}
      <GlassTable title="Recent Activity" data={recentJobs} />
    </div>
  );
}

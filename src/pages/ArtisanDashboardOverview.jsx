import { BriefcaseBusiness, Clock, Wallet } from "lucide-react";
import GlassTable from "../components/recentActivityTable";
import StatCard from "../components/statCard";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useEffect } from "react";

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

  return (
    <div className="space-y-8 animate-enter">
      {/* Welcome Section */}
      <div className="p-6 flex flex-col gap-2 rounded-2xl shadow-subtle border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome, {user.name}
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
          Here is what's happening with your business today.
        </p>
      </div>

      {/* Overview Cards Grid */}
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

      {/* Table Section */}
      <GlassTable title="Recent Activity" data={recentJobs} />
    </div>
  );
}

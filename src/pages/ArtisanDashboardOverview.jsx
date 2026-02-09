import { BriefcaseBusiness, Clock, Wallet } from "lucide-react";
import GlassTable from "../components/recentActivityTable";
import StatCard from "../components/statCard";

const recentActions = [
  {
    customer: "Ama Mensah",
    service: "Pipe Repair",
    status: "Completed",
    price: 45,
  },
  {
    customer: "Kofi Arhin",
    service: "House Wiring",
    status: "Pending",
    price: 120,
  },
  {
    customer: "John Doe",
    service: "Roof Leak",
    status: "Completed",
    price: 85,
  },
];

export default function ArtisanDashboardOverview() {
  return (
    <div className="space-y-8 animate-enter">
      {/* Welcome Section */}
      <div className="p-6 flex flex-col gap-2 rounded-2xl shadow-subtle border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome, Samuel
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
          Here is what's happening with your business today.
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatCard
          title="Total Earnings"
          value="$257"
          icon={Wallet}
          color="text-emerald-500"
          glowGradient="bg-gradient-to-br from-emerald-500 to-green-300"
        />
        <StatCard
          title="Pending Jobs"
          value="12"
          icon={Clock}
          color="text-orange-500"
          glowGradient="bg-gradient-to-br from-orange-500 to-yellow-300"
        />
        <StatCard
          title="Available Jobs"
          value="17"
          icon={BriefcaseBusiness}
          color="text-purple-500"
          glowGradient="bg-gradient-to-br from-purple-500 to-indigo-300"
        />
      </div>

      {/* Table Section */}
      <GlassTable title="Recent Activity" data={recentActions} />
    </div>
  );
}

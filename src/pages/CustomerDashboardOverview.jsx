import {
  Briefcase,
  Clock,
  CheckCircle2,
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import StatCard from "../components/statCard";
import { useEffect } from "react";

export default function CustomerDashboardOverview() {
  const { user, login } = useAuth();
  const { jobs } = useJobs();

  useEffect(() => login("cust_001"));

  // Logic to derive stats from the user's jobs
  const myJobs = jobs.filter((j) => j.customerId === user?.id);
  const activeJobs = myJobs.filter(
    (j) => j.status === "in-progress" || j.status === "accepted",
  ).length;
  const completedJobs = myJobs.filter((j) => j.status === "completed").length;
  const totalSpent = myJobs.reduce(
    (sum, j) => sum + (Number(j.budget) || 0),
    0,
  );

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* --- Welcome Header --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Hello,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {user?.name?.split(" ")[0]}
              </span>{" "}
              👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Everything looks good at your home in{" "}
              <span className="underline decoration-blue-500/30 font-bold">
                {user?.location}
              </span>
              .
            </p>
          </div>
        </header>

        {/* --- Stats Grid using your StatCard --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Spent"
            value={totalSpent.toLocaleString()}
            icon={CreditCard}
            color="text-emerald-500"
            glowGradient="bg-emerald-500/20"
            isCurrency={true}
          />
          <StatCard
            title="Active Tasks"
            value={activeJobs}
            icon={Clock}
            color="text-blue-500"
            glowGradient="bg-blue-500/20"
          />
          <StatCard
            title="Completed"
            value={completedJobs}
            icon={CheckCircle2}
            color="text-violet-500"
            glowGradient="bg-violet-500/20"
          />
          <StatCard
            title="Total Requests"
            value={myJobs.length}
            icon={Briefcase}
            color="text-amber-500"
            glowGradient="bg-amber-500/20"
          />
        </div>

        {/* --- Content Grid: Active Jobs & Recent Artisans --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Job Tracker */}
          <div className="lg:col-span-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Active Progress
              </h3>
              <button className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:underline">
                View History <ArrowRight size={16} />
              </button>
            </div>

            {myJobs.filter((j) => j.status !== "completed").length > 0 ? (
              <div className="space-y-4">
                {myJobs
                  .filter((j) => j.status !== "completed")
                  .slice(0, 3)
                  .map((job) => (
                    <div
                      key={job.id}
                      className="group flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">
                            {job.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50">
                          {job.status}
                        </span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                          GH₵{job.budget}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium italic">
                  No active tasks at the moment.
                </p>
              </div>
            )}
          </div>

          {/* Quick Support / Feedback Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-blue-900/20">
            <div>
              <h3 className="text-2xl font-black mb-4">FixIt Premium</h3>
              <p className="text-blue-100 leading-relaxed font-medium">
                Did you know? You can get a{" "}
                <span className="text-white font-bold">FixIt Guarantee</span> on
                all jobs above GH₵500.
              </p>
            </div>
            <div className="mt-8">
              <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                Upgrade Account
              </button>
              <p className="text-center text-blue-200 text-xs mt-4">
                Terms and conditions apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

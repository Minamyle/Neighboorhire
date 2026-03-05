import {
  Briefcase,
  Clock,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  Star,
  X,
  StarHalf,
  MessageSquarePlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import StatCard from "../components/statCard";
import { useEffect, useState } from "react";
import StatusBadge from "../components/status-badge";
import StarDisplay from "../components/star-display";
import ReviewModal from "../components/review-modal";

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function CustomerDashboardOverview() {
  const { user, login } = useAuth();
  const { jobs, rateJob } = useJobs();
  const [reviewTarget, setReviewTarget] = useState(null);

  useEffect(() => login("cust_001"));

  const myJobs = jobs.filter((j) => j.customerId === user?.id);
  const activeJobs = myJobs.filter(
    (j) => j.status === "in-progress" || j.status === "accepted",
  ).length;
  const completedJobs = myJobs.filter((j) => j.status === "completed").length;
  const totalSpent = myJobs.reduce(
    (sum, j) => sum + (Number(j.budget) || 0),
    0,
  );

  // Jobs awaiting a review nudge
  const pendingReviews = myJobs.filter(
    (j) => j.status === "completed" && !j.rating,
  ).length;

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ── Welcome Header ── */}
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

          {/* Pending reviews nudge */}
          {pendingReviews > 0 && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 self-start">
              <MessageSquarePlus size={16} className="text-blue-500 shrink-0" />
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {pendingReviews} job{pendingReviews > 1 ? "s" : ""} awaiting
                your review
              </p>
            </div>
          )}
        </header>

        {/* ── Stats Grid ── */}
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

        {/* ── Active Progress + Premium Card ── */}
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

          {/* FixIt Premium Card */}
          <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl shadow-blue-900/20">
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

        {/* ── My Jobs Table ── */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-[2.5rem] p-8">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                My Jobs
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                All your requests — rate any completed job below.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/80 dark:bg-slate-900/40">
                  {[
                    "Job Title",
                    "Category",
                    "Amount",
                    "Status",
                    "Your Rating",
                    "Date",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {myJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-14 text-center text-slate-400 dark:text-slate-500 italic"
                    >
                      You haven't posted any jobs yet.
                    </td>
                  </tr>
                ) : (
                  myJobs
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .map((job) => {
                      const isCompleted = job.status === "completed";
                      const hasRated = !!job.rating;

                      return (
                        <tr
                          key={job.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors"
                        >
                          {/* Title */}
                          <td className="px-5 py-4 whitespace-nowrap font-bold text-slate-800 dark:text-white">
                            {job.title ?? "Untitled"}
                          </td>

                          {/* Category */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                              {job.category ?? "—"}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="px-5 py-4 whitespace-nowrap font-bold text-emerald-600 dark:text-emerald-400">
                            GH₵{job.budget?.toLocaleString() ?? "—"}
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <StatusBadge status={job.status} />
                          </td>

                          {/* Rating */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <StarDisplay rating={job.rating} />
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )
                              : "—"}
                          </td>

                          {/* Action */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isCompleted && !hasRated ? (
                              <button
                                onClick={() => setReviewTarget(job)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-500/20 transition-colors"
                              >
                                <Star
                                  size={12}
                                  className="fill-blue-500 text-blue-500"
                                />
                                Rate Job
                              </button>
                            ) : hasRated ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                <CheckCircle2 size={13} />
                                Reviewed
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                                Not completed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Review Modal ── */}
      {reviewTarget && (
        <ReviewModal
          job={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSubmit={(jobId, data) => {
            rateJob(jobId, data);
            setReviewTarget(null);
          }}
        />
      )}
    </div>
  );
}

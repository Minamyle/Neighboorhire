import { Star, StarHalf, BadgeCheck, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useEffect } from "react";

// ── Star Display ───────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  if (!rating)
    return (
      <span className="text-xs italic text-slate-400 dark:text-zinc-500">
        No rating yet
      </span>
    );
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span key={i}>
            {filled ? (
              <Star size={14} className="text-amber-400 fill-amber-400" />
            ) : half ? (
              <StarHalf size={14} className="text-amber-400 fill-amber-400" />
            ) : (
              <Star size={14} className="text-slate-300 dark:text-zinc-600" />
            )}
          </span>
        );
      })}
      <span className="ml-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400">
        {rating.toFixed(1)}
      </span>
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
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
    >
      {initials}
    </div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    pending:
      "bg-amber-100  text-amber-700  dark:bg-amber-500/15  dark:text-amber-400",
    "in-progress":
      "bg-blue-100  text-blue-700   dark:bg-blue-500/15   dark:text-blue-400",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Ratings() {
  const { user, login } = useAuth();
  const { jobs } = useJobs();

  useEffect(() => {
    login("art_001");
  });

  if (!user) return <p>Loading...</p>;

  const myJobs = jobs
    .filter((job) => job.artisanId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Only average over jobs that have actually been rated by customers
  const ratedJobs = myJobs.filter((j) => j.rating);
  const avgRating =
    ratedJobs.length > 0
      ? (
          ratedJobs.reduce((s, j) => s + j.rating, 0) / ratedJobs.length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-8 animate-enter">
      {/* ── Header ── */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Ratings & Reviews
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
            A full breakdown of jobs completed and customer feedback.
          </p>
        </div>

        {/* Average rating pill */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 self-start sm:self-auto">
          <Star size={20} className="text-amber-400 fill-amber-400" />
          <div>
            <p className="text-xl font-black text-amber-600 dark:text-amber-400 leading-none">
              {avgRating ?? "—"}
            </p>
            <p className="text-xs text-amber-500/80 font-medium mt-0.5">
              avg · {ratedJobs.length}{" "}
              {ratedJobs.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
                {[
                  "Customer",
                  "Job Title",
                  "Description",
                  "Amount Paid",
                  "Rating",
                  "Review",
                  "Status",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {myJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-slate-400 dark:text-zinc-500 text-sm"
                  >
                    No jobs yet. Once customers rate your work it will show up
                    here.
                  </td>
                </tr>
              ) : (
                myJobs.map((job, idx) => (
                  <tr
                    key={job.id}
                    className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.03]"
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

                    {/* Job Title */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <BadgeCheck
                          size={14}
                          className="text-blue-400 shrink-0"
                        />
                        <span className="font-medium text-slate-700 dark:text-zinc-200">
                          {job.title ?? job.jobTitle ?? "Untitled Job"}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-4 max-w-[160px]">
                      <p className="text-slate-500 dark:text-zinc-400 truncate text-xs">
                        {job.description ?? "—"}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 whitespace-nowrap font-bold text-emerald-600 dark:text-emerald-400">
                      ${job.budget?.toLocaleString() ?? "—"}
                    </td>

                    {/* Rating — reads real data from rateJob() */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StarRating rating={job.rating} />
                    </td>

                    {/* Review text */}
                    <td className="px-5 py-4 max-w-[180px]">
                      {job.review ? (
                        <div className="flex items-start gap-1.5">
                          <MessageSquare
                            size={12}
                            className="text-slate-400 mt-0.5 shrink-0"
                          />
                          <p className="text-xs text-slate-500 dark:text-zinc-400 truncate italic">
                            "{job.review}"
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 dark:text-zinc-600 italic">
                          No comment
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge status={job.status} />
                    </td>

                    {/* Date — prefer ratedAt, fall back to createdAt */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400 dark:text-zinc-500">
                      {(job.ratedAt ?? job.createdAt)
                        ? new Date(
                            job.ratedAt ?? job.createdAt,
                          ).toLocaleDateString("en-US", {
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
          </table>
        </div>
      </div>
    </div>
  );
}

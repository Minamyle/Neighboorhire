import React, { useState, useMemo, useCallback } from "react";
import {
  MapPin,
  CheckCircle2,
  User,
  Play,
  Handshake,
  ShieldAlert,
} from "lucide-react";
import { JobDetailsModal } from "./jodDetailsModal";
import { useJobs } from "../context/JobsContext";
import { useAuth } from "../context/AuthContext";

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateJobStatus, acceptJob } = useJobs();
  const { user } = useAuth();

  // OPTIMIZATION: Memoize action logic to prevent re-calculation on every render
  const action = useMemo(() => {
    const { status, artisanId } = job;

    if (!artisanId || (artisanId === user?.id && status === "pending")) {
      return {
        label: artisanId ? "Confirm Invite" : "Accept",
        color: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/40 text-white",
        icon: <Handshake size={14} />,
        actionType: "accept",
      };
    }

    const states = {
      accepted: {
        label: "Start Operation",
        color:
          "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/40 text-white",
        icon: <Play size={14} />,
        nextStatus: "in-progress",
        actionType: "status",
      },
      "in-progress": {
        label: "Mark Finished",
        color:
          "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/40 text-white",
        icon: <CheckCircle2 size={14} />,
        nextStatus: "completed",
        actionType: "status",
      },
    };

    return (
      states[status] || {
        label: "Operation Done",
        color:
          "bg-slate-800 dark:bg-white/10 text-slate-100 dark:text-zinc-400 cursor-not-allowed",
        icon: <CheckCircle2 size={14} />,
        nextStatus: null,
        actionType: null,
      }
    );
  }, [job.status, job.artisanId, user?.id]);

  // OPTIMIZATION: Memoize callback to keep referential identity stable
  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (action.actionType === "accept") {
        acceptJob(job.id, user.id);
      } else if (action.actionType === "status" && action.nextStatus) {
        updateJobStatus(job.id, action.nextStatus);
      }
    },
    [action, job.id, user?.id, acceptJob, updateJobStatus],
  );

  return (
    <>
      <div className="group relative rounded-4xl p-4 md:p-6 transition-all duration-700 bg-white/90 dark:bg-white/5 backdrop-blur-2xl border-[1.5px] border-slate-200 dark:border-white/20 hover:border-blue-400 dark:hover:border-white/40 shadow-sm overflow-hidden h-full flex flex-col justify-between">
        {/* GPU OPTIMIZATION: will-change-transform for smoother animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-4xl will-change-transform">
          <div className="absolute -inset-full rotate-35 bg-linear-to-r from-transparent via-blue-400/10 dark:via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>

        <div
          className="cursor-pointer z-10"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex justify-between items-start gap-2 mb-4">
            <div className="flex flex-col gap-1">
              <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full border border-slate-200 dark:border-white/20 w-fit">
                {job.category}
              </span>
              {job.artisanId === user?.id && job.status === "pending" && (
                <span className="flex items-center gap-1 text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter italic">
                  <ShieldAlert size={10} /> Direct Invitation
                </span>
              )}
            </div>
            <p className="text-base md:text-lg font-black tracking-tighter text-blue-600 dark:text-blue-300 whitespace-nowrap">
              GH₵{job.budget}
            </p>
          </div>

          <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-tight mb-3 line-clamp-2">
            {job.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-300 mb-4">
            <MapPin size={14} className="text-blue-500 shrink-0" />
            <p className="text-[11px] font-bold truncate tracking-wide uppercase italic">
              {job.location}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-white">
              <User size={16} />
            </div>
            <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-white opacity-90 truncate">
              {job.customerId?.replace("cust_", "ID-") || "Client"}
            </p>
          </div>

          <button
            disabled={!action.actionType}
            onClick={handleButtonClick}
            className={`${action.color} w-full sm:w-auto px-5 py-2.5 rounded-xl md:rounded-2xl transition-all 
                        hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg font-black text-[10px] uppercase tracking-wider backdrop-blur-md`}
          >
            <span>{action.label}</span>
            {action.icon}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <JobDetailsModal job={job} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default React.memo(JobCard);

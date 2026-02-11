import React, { useState } from "react";
import { MapPin, CheckCircle2, User, Play, Sparkles } from "lucide-react";
import { useData } from "../context/ArtisanContext";
import { JobDetailsModal } from "./jodDetailsModal";

const JobCard = ({ job }) => {
  const { updateJobStatus } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusAction = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Start Job",
          color: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/40 text-white",
          icon: <Play size={16} />,
          nextStatus: "in-progress",
        };
      case "in-progress":
        return {
          label: "Complete",
          color:
            "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/40 text-white",
          icon: <CheckCircle2 size={16} />,
          nextStatus: "completed",
        };
      default:
        // Fixed: Darker background and clearer text for light mode visibility
        return {
          label: "Finished",
          color:
            "bg-slate-800 dark:bg-white/10 text-slate-100 dark:text-zinc-400 cursor-not-allowed border border-white/10",
          icon: <CheckCircle2 size={16} />,
          nextStatus: null,
        };
    }
  };

  const action = getStatusAction(job.status);

  return (
    <>
      <div
        className="group relative rounded-[2.5rem] p-6 transition-all duration-700 
                   bg-white/90 dark:bg-white/5 backdrop-blur-2xl 
                   border-[1.5px] border-slate-200 dark:border-white/20
                   hover:border-blue-400 dark:hover:border-white/40
                   shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
                   hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                   overflow-hidden h-full flex flex-col justify-between"
      >
        {/* Mirror Reflection Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
          <div className="absolute -inset-[100%] rotate-[35deg] bg-gradient-to-r from-transparent via-blue-400/10 dark:via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Content Area */}
        <div
          className="cursor-pointer z-10"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex justify-between items-start mb-6">
            {/* Tag: Dark text on light background, White on dark */}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full border border-slate-200 dark:border-white/20">
              {job.category}
            </span>
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-300">
              <p className="text-lg font-black tracking-tighter">
                {job.budget}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-tight truncate mb-4">
            {job.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-300 mb-6">
            <MapPin size={14} className="text-blue-500" />
            <p className="text-xs font-bold truncate tracking-wide">
              {job.location}
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="relative z-10 pt-5 border-t border-slate-100 dark:border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* User Icon: Darker BG for light mode */}
            <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-white">
              <User size={18} />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-white opacity-90">
              {job.customer}
            </p>
          </div>

          <button
            disabled={!action.nextStatus}
            onClick={(e) => {
              e.stopPropagation();
              if (action.nextStatus) updateJobStatus(job.id, action.nextStatus);
            }}
            className={`${action.color} px-5 py-2.5 rounded-2xl transition-all 
                        hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg font-black text-[11px] uppercase tracking-wider backdrop-blur-md`}
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

export default JobCard;

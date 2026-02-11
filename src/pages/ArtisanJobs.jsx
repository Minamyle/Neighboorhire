import React, { useState } from "react";
import JobCard from "../components/artisanJobCard";
import { useData } from "../context/ArtisanContext";

export default function ArtisanJobs() {
  const [activeTab, setActiveTab] = useState("pending");
  const { postedJobs } = useData();

  const filteredJobs = postedJobs.filter((job) => job.status === activeTab);

  const tabs = [
    { id: "pending", label: "Newly Jobs" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Container: Changed from max-w-7xl to max-w-[1600px] to occupy more screen */}
      <div className="max-w-[1600px] mx-auto w-full px-3 md:px-6 flex flex-col h-full overflow-hidden">
        {/* Header: Reduced vertical padding */}
        <header className="flex-shrink-0 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-0.5">
              <h1 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tighter uppercase italic">
                Project{" "}
                <span className="text-slate-900 dark:text-white">
                  Workspace
                </span>
              </h1>
              <p className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                {postedJobs.length} Operations Registered
              </p>
            </div>

            <nav className="flex p-1 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-xl border border-white dark:border-white/10 shadow-sm overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-500 dark:text-zinc-400 hover:text-blue-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Grid: Reduced gap from 8 to 4/6 to fit more cards */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-6">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 rounded-[2rem] bg-white/30 dark:bg-white/5 backdrop-blur-md border-2 border-dashed border-slate-200 dark:border-white/10">
              <p className="text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                No {activeTab} Records
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

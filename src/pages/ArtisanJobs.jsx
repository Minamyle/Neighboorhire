import React, { useState } from "react";
import JobCard from "../components/artisanJobCard";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";

// Define the tabs outside the component
const tabs = [
  { id: "available", label: "Marketplace" }, // Finding work
  { id: "accepted", label: "Accepted" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

export default function ArtisanJobs() {
  const [activeTab, setActiveTab] = useState("available");
  const { user } = useAuth();
  const { jobs } = useJobs();

  if (!user) return null;

  /**
   * FIXED FILTER LOGIC:
   * 1. Marketplace: Show jobs that are 'pending' AND (have no artisan OR are specifically for YOU).
   * 2. Other Tabs: Match the specific status AND ensure they belong to YOU.
   */
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "available") {
      const isPublic = !job.artisanId;
      const isDirectInvite = job.artisanId === user.id;
      return job.status === "pending" && (isPublic || isDirectInvite);
    }

    // For Accepted, In-Progress, and Completed tabs
    return job.artisanId === user.id && job.status === activeTab;
  });

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-400 mx-auto w-full px-3 md:px-6 flex flex-col h-full overflow-hidden">
        {/* --- Header & Tab Navigation --- */}
        <header className="shrink-0 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-0.5">
              <h1 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tighter uppercase italic">
                Project{" "}
                <span className="text-slate-900 dark:text-white">
                  Workspace
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-slate-500 dark:text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  {filteredJobs.length} Operations Found
                </p>
              </div>
            </div>

            <nav className="flex p-1 bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border border-white dark:border-white/10 shadow-sm overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105"
                      : "text-slate-500 dark:text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* --- Jobs Grid Container --- */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-white/30 dark:bg-white/5 backdrop-blur-md border-2 border-dashed border-slate-200 dark:border-white/10 transition-all">
              <div className="h-16 w-16 mb-4 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest text-[11px]">
                Zero {activeTab} Operations
              </p>
              <p className="text-slate-400 dark:text-zinc-600 text-[9px] mt-2 font-medium">
                Check other tabs or wait for new postings.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

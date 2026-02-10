import React from "react";
import {
  X,
  MapPin,
  Phone,
  Mail,
  User,
  Info,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  const isCompleted = job.status === "completed";
  const whatsappNumber = job.phone?.replace(/\D/g, "");
  const acceptMessage = encodeURIComponent(
    `Hello ${job.customer}, I'm reaching out regarding the "${job.title}" job. I'm ready to get started!`,
  );
  const whatsappUrl = `https://wa.me{whatsappNumber}?text=${acceptMessage}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
      {/* Backdrop - Visible only on Desktop to show depth */}
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl hidden md:block"
        onClick={onClose}
      />

      {/* Modal Content - Full screen on Mobile, Max-width on Desktop */}
      <div
        className="relative w-full h-full md:h-auto md:max-w-4xl lg:max-w-5xl 
                      bg-white dark:bg-[#0c0c0c] md:bg-white/95 md:dark:bg-[#0c0c0c]/90 md:backdrop-blur-3xl 
                      rounded-none md:rounded-[3rem] border-none md:border border-white/50 dark:border-white/10 
                      shadow-none md:shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] 
                      overflow-hidden flex flex-col animate-in slide-in-from-bottom md:zoom-in-95 duration-300"
      >
        {/* Mirror Reflection Overlay (Desktop Only) */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none hidden md:block" />

        {/* Header - Sticky with safe area padding for mobile */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/40 backdrop-blur-md px-6 py-8 md:px-10 md:py-8 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
                {job.category}
              </span>
              {isCompleted && (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                  Closed
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter uppercase italic leading-tight">
              {job.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 active:scale-90 transition-transform"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Project Details */}
            <div className="lg:col-span-3 space-y-8">
              <section>
                <h4 className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Info size={16} className="text-blue-500" /> Project Briefing
                </h4>
                <div className="p-8 rounded-[2.5rem] bg-slate-50/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 leading-relaxed text-slate-700 dark:text-zinc-300">
                  <p className="text-base md:text-lg font-medium leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </section>

              <div className="flex items-start gap-5 p-2">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">
                    {job.location}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest italic">
                    Posted on {job.postedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar (Contacts & Budget) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 dark:bg-blue-600 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <User size={32} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase opacity-60 tracking-[0.2em]">
                        Customer
                      </p>
                      <p className="text-2xl font-bold tracking-tight">
                        {job.customer}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {!isCompleted ? (
                      <>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 transition-all border border-emerald-400/30"
                        >
                          <div className="flex items-center gap-4">
                            <MessageSquare size={20} className="text-white" />
                            <span className="text-[11px] font-black uppercase tracking-wider">
                              Accept via WhatsApp
                            </span>
                          </div>
                          <ExternalLink size={16} className="opacity-60" />
                        </a>

                        <a
                          href={`tel:${job.phone}`}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <Phone size={20} className="text-blue-300" />
                            <div className="flex flex-col text-left">
                              <span className="text-[10px] font-black uppercase opacity-50">
                                Direct Call
                              </span>
                              <span className="text-base font-bold tracking-tight">
                                {job.phone}
                              </span>
                            </div>
                          </div>
                          <ExternalLink size={16} className="opacity-40" />
                        </a>
                      </>
                    ) : (
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <ShieldCheck
                          size={24}
                          className="mx-auto mb-2 text-emerald-400 opacity-60"
                        />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                          Archived Record
                        </p>
                      </div>
                    )}

                    <a
                      href={`mailto:${job.email}`}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <Mail size={18} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-300 truncate max-w-[180px]">
                          {job.email}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="p-6 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    Payout
                  </p>
                  <p className="text-3xl font-black text-emerald-600 tracking-tighter">
                    {job.budget}
                  </p>
                </div>
                <Sparkles className="text-emerald-500 opacity-40" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

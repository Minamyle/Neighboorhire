import { ShieldCheck, Sparkles, CircleCheck } from "lucide-react";

// ── Step 3: Success Screen ─────────────────────────────────────────────────────
export default function SuccessScreen({ job, total }) {
  const ref = `FX-${Date.now().toString(36).toUpperCase()}`;
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-2">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
          <CircleCheck size={48} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
          <Sparkles size={14} className="text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Payment Successful!
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-xs mx-auto leading-relaxed">
          Your job has been booked and the artisan has been notified.
        </p>
      </div>

      {/* Receipt */}
      <div className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 text-left space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          Receipt
        </p>
        <div className="flex justify-between text-sm gap-4">
          <span className="text-slate-500 dark:text-zinc-400 shrink-0">
            Job
          </span>
          <span className="font-bold text-slate-800 dark:text-white text-right truncate">
            {job?.title ?? "Service Job"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-zinc-400">Amount Paid</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400">
            GH₵{total.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm gap-4">
          <span className="text-slate-500 dark:text-zinc-400 shrink-0">
            Reference
          </span>
          <span className="font-mono font-bold text-slate-700 dark:text-zinc-300 text-xs truncate">
            {ref}
          </span>
        </div>
        <div className="h-px bg-slate-100 dark:bg-white/10" />
        <div className="flex items-start gap-2">
          <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold text-left">
            Protected by FixIt Guarantee — funds released only on completion.
          </p>
        </div>
      </div>

      {/* What's next */}
      <div className="w-full space-y-2 text-left">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          What Happens Next?
        </p>
        {[
          "The artisan reviews and accepts the job",
          "Work begins on your scheduled date",
          "You confirm completion to release payment",
        ].map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05]"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-black flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium">
              {s}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.history.back()}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

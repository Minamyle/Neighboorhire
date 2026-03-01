import {
  ShieldCheck,
  ChevronRight,
  Briefcase,
  MapPin,
  User,
} from "lucide-react";

// ── Step 1: Order Summary ──────────────────────────────────────────────────────
export default function OrderSummary({ job, subtotal, fee, total, onNext }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Review Your Order
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Confirm the job details before proceeding to payment.
        </p>
      </div>

      {/* Job card */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 sm:p-5 space-y-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/15 shrink-0">
            <Briefcase size={20} className="text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
              {job?.category ?? "Service"}
            </span>
            <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg mt-1.5 leading-tight">
              {job?.title ?? "Service Job"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {job?.description ?? "Professional service booking."}
            </p>
          </div>
        </div>

        {/* Info pills — stack on very small screens */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-1">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] min-w-0">
            <MapPin size={13} className="text-blue-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Location
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-zinc-200 truncate">
                {job?.location ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] min-w-0">
            <User size={13} className="text-violet-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Client
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-zinc-200 truncate">
                {job?.customerId?.replace("cust_", "Client #") ?? "You"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 sm:p-5 space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          Price Breakdown
        </p>
        <div className="flex justify-between text-sm text-slate-600 dark:text-zinc-300">
          <span>Subtotal</span>
          <span className="font-semibold">GH₵{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600 dark:text-zinc-300">
          <span>Service Fee (5%)</span>
          <span className="font-semibold">GH₵{fee.toLocaleString()}</span>
        </div>
        <div className="h-px bg-slate-100 dark:bg-white/10" />
        <div className="flex justify-between font-black text-slate-900 dark:text-white">
          <span>Total</span>
          <span className="text-blue-600 dark:text-blue-400 text-base sm:text-lg">
            GH₵{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* FixIt Guarantee */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/20">
        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 shrink-0 mt-0.5">
          <ShieldCheck
            size={18}
            className="text-emerald-600 dark:text-emerald-400"
          />
        </div>
        <div>
          <p className="font-black text-sm text-emerald-700 dark:text-emerald-400">
            FixIt Guarantee
          </p>
          <p className="text-xs text-emerald-600/80 dark:text-emerald-500 mt-0.5 leading-relaxed">
            Your payment is held securely and only released once the job is
            completed to your satisfaction.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        Proceed to Payment <ChevronRight size={17} />
      </button>
    </div>
  );
}

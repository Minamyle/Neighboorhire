import {
  ShieldCheck,
  Briefcase,
  MapPin,
  Lock,
  CircleCheck,
} from "lucide-react";
export default function CheckoutSidebar({ job, subtotal, fee, total }) {
  return (
    <div className="space-y-4">
      {/* Price summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-5 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          Order Summary
        </p>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/15 shrink-0">
            <Briefcase size={16} className="text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-900 dark:text-white text-sm leading-tight truncate">
              {job?.title ?? "Service Job"}
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {job?.category ?? "Service"}
            </p>
          </div>
        </div>
        <div className="h-px bg-slate-100 dark:bg-white/10" />
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm text-slate-600 dark:text-zinc-300">
            <span>Subtotal</span>
            <span className="font-semibold">
              GH₵{subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 dark:text-zinc-300">
            <span>Service Fee (5%)</span>
            <span className="font-semibold">GH₵{fee.toLocaleString()}</span>
          </div>
          <div className="h-px bg-slate-100 dark:bg-white/10" />
          <div className="flex justify-between font-black text-slate-900 dark:text-white">
            <span>Total</span>
            <span className="text-blue-600 dark:text-blue-400 text-lg">
              GH₵{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* FixIt Guarantee */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-500/20">
        <div className="flex items-center gap-2 mb-2.5">
          <ShieldCheck size={19} className="text-white shrink-0" />
          <h3 className="font-black">FixIt Guarantee</h3>
        </div>
        <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
          Payment held in escrow — released only after you confirm the job is
          done.
        </p>
        <div className="mt-3.5 space-y-2">
          {[
            "Funds held in escrow",
            "Full refund if job fails",
            "24/7 dispute support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs text-emerald-100 font-semibold"
            >
              <CircleCheck size={13} className="text-emerald-200 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      {job?.location && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-500/15 shrink-0">
            <MapPin size={15} className="text-violet-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Service Location
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5 truncate">
              {job.location}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500 py-1">
        <Lock size={11} className="shrink-0" />
        <span>256-bit SSL · Powered by FixIt Pay</span>
      </div>
    </div>
  );
}

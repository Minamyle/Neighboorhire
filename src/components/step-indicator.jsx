import { CheckCircle2 } from "lucide-react";

// ── Step Indicator ─────────────────────────────────────────────────────────────
// On mobile: show only circle + short label. Connector line scales down too.
export default function StepIndicator({ step }) {
  const steps = ["Order", "Payment", "Done"];
  return (
    <div className="flex items-center justify-center">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-300
                  ${
                    done
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                        : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-zinc-500"
                  }`}
              >
                {done ? <CheckCircle2 size={15} /> : idx}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wide
                ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : done
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400 dark:text-zinc-500"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-10 sm:w-20 h-0.5 mx-2 sm:mx-3 mb-4 rounded-full transition-all duration-500
                ${step > idx ? "bg-emerald-400" : "bg-slate-200 dark:bg-white/10"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

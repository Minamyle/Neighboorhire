import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { Lock } from "lucide-react";
import StepIndicator from "../components/step-indicator";
import SuccessScreen from "../components/success-screen";
import OrderSummary from "../components/order-summary";
import PaymentStep from "../components/payment";
import CheckoutSidebar from "../components/checkout-sidebar";

// ── Constants ──────────────────────────────────────────────────────────────────
const SERVICE_FEE_RATE = 0.05;

// ── Main Checkout Page ─────────────────────────────────────────────────────────
export default function Checkout() {
  const { user, login } = useAuth();
  const { jobs } = useJobs();
  const [step, setStep] = useState(1);

  useEffect(() => {
    login("cust_001");
  });

  const job =
    jobs.find(
      (j) =>
        j.customerId === user?.id &&
        (j.status === "pending" || j.status === "accepted"),
    ) ??
    jobs.find((j) => j.customerId === user?.id) ??
    null;

  const subtotal = job?.budget ?? 0;
  const fee = Math.round(subtotal * SERVICE_FEE_RATE);
  const total = subtotal + fee;

  return (
    <div className="w-full min-h-screen p-3 sm:p-5 md:p-8 overflow-y-auto ">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* ── Page header ── */}
        <div className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
              Secure payment powered by FixIt
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 shrink-0">
            <Lock
              size={12}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
              SSL Secured
            </span>
          </div>
        </div>

        {/* ── Step indicator ── */}
        {step < 3 && (
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl">
            <StepIndicator step={step} />
          </div>
        )}

        {/* ── Content ── */}
        {step === 3 ? (
          <div className="w-full max-w-xl mx-auto rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-xl p-5 sm:p-8">
            <SuccessScreen job={job} total={total} />
          </div>
        ) : (
          /* On mobile: sidebar goes BELOW the form. On lg: side by side. */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 items-start">
            {/* Main form */}
            <div className="lg:col-span-3 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-2xl shadow-lg p-5 sm:p-7 md:p-9">
              {step === 1 && (
                <OrderSummary
                  job={job}
                  subtotal={subtotal}
                  fee={fee}
                  total={total}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <PaymentStep
                  total={total}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
            </div>

            {/* Sidebar — below form on mobile, sticky on desktop */}
            <div className="lg:col-span-2 lg:sticky lg:top-6">
              <CheckoutSidebar
                job={job}
                subtotal={subtotal}
                fee={fee}
                total={total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

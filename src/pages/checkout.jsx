import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Briefcase,
  MapPin,
  User,
  Lock,
  Sparkles,
  CircleCheck,
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────
const SERVICE_FEE_RATE = 0.05;

const MOMO_PROVIDERS = [
  {
    id: "mtn",
    name: "MTN MoMo",
    color: "from-yellow-400 to-amber-500",
    border: "border-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    text: "text-yellow-700 dark:text-yellow-400",
    prefix: "024, 054, 055, 059",
  },
  {
    id: "telecel",
    name: "Telecel Cash",
    color: "from-red-500 to-rose-600",
    border: "border-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-700 dark:text-red-400",
    prefix: "020, 050",
  },
  {
    id: "at",
    name: "AT Money",
    color: "from-blue-500 to-indigo-600",
    border: "border-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    prefix: "027, 057",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatCard(val) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
function formatExpiry(val) {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

// ── Step Indicator ─────────────────────────────────────────────────────────────
// On mobile: show only circle + short label. Connector line scales down too.
function StepIndicator({ step }) {
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

// ── Reusable Input ─────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    />
  );
}

// ── Step 1: Order Summary ──────────────────────────────────────────────────────
function OrderSummary({ job, subtotal, fee, total, onNext }) {
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

// ── Step 2: Payment ────────────────────────────────────────────────────────────
function PaymentStep({ total, onNext, onBack }) {
  const [method, setMethod] = useState("card");
  const [momoProvider, setMomoProvider] = useState("mtn");
  const [momoNumber, setMomoNumber] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length < 16)
        e.number = "Enter a valid 16-digit card number.";
      if (card.expiry.length < 5) e.expiry = "Enter a valid expiry date.";
      if (card.cvv.length < 3) e.cvv = "CVV must be 3–4 digits.";
      if (!card.name.trim()) e.name = "Cardholder name is required.";
    } else {
      if (momoNumber.replace(/\D/g, "").length < 10)
        e.momoNumber = "Enter a valid 10-digit MoMo number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Payment Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Choose your preferred payment method.
        </p>
      </div>

      {/* Method toggle */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "card", label: "Card", icon: <CreditCard size={16} /> },
          { id: "momo", label: "Mobile Money", icon: <Smartphone size={16} /> },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all
              ${
                method === m.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 hover:border-slate-300"
              }`}
          >
            {m.icon}
            <span className="truncate">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Card form */}
      {method === "card" && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 sm:p-5">
          <Field label="Card Number" error={errors.number}>
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: formatCard(e.target.value) })
                }
              />
              <CreditCard
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-zinc-600 pointer-events-none"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry Date" error={errors.expiry}>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: formatExpiry(e.target.value) })
                }
              />
            </Field>
            <Field label="CVV" error={errors.cvv}>
              <Input
                type="password"
                inputMode="numeric"
                placeholder="•••"
                maxLength={4}
                value={card.cvv}
                onChange={(e) =>
                  setCard({
                    ...card,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                  })
                }
              />
            </Field>
          </div>

          <Field label="Cardholder Name" error={errors.name}>
            <Input
              type="text"
              placeholder="Full name on card"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />
          </Field>

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 pt-1">
            <Lock size={12} className="shrink-0" />
            <span>Your card details are encrypted and never stored.</span>
          </div>
        </div>
      )}

      {/* MoMo form */}
      {method === "momo" && (
        <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 sm:p-5">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Select Provider
            </p>
            <div className="grid grid-cols-3 gap-2">
              {MOMO_PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setMomoProvider(p.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-xl border-2 transition-all
                    ${momoProvider === p.id ? `${p.border} ${p.bg}` : "border-slate-200 dark:border-white/10 hover:border-slate-300"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shadow-sm`}
                  >
                    <Smartphone size={13} className="text-white" />
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-black text-center leading-tight ${momoProvider === p.id ? p.text : "text-slate-500 dark:text-zinc-400"}`}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Field label="MoMo Number" error={errors.momoNumber}>
            <Input
              type="tel"
              inputMode="numeric"
              placeholder={`e.g. ${MOMO_PROVIDERS.find(
                (p) => p.id === momoProvider,
              )
                ?.prefix.split(",")[0]
                .trim()}XXXXXXX`}
              value={momoNumber}
              onChange={(e) =>
                setMomoNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            />
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              Prefixes:{" "}
              {MOMO_PROVIDERS.find((p) => p.id === momoProvider)?.prefix}
            </p>
          </Field>

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500">
            <Lock size={12} className="shrink-0" />
            <span>A prompt will be sent to your phone to approve.</span>
          </div>
        </div>
      )}

      {/* Total reminder */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
        <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
          Amount to pay
        </span>
        <span className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
          GH₵{total.toLocaleString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={15} /> Back
        </button>
        <button
          onClick={() => {
            if (validate()) onNext();
          }}
          className="flex items-center justify-center gap-1.5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          Pay Now <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Success Screen ─────────────────────────────────────────────────────
function SuccessScreen({ job, total }) {
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

// ── Sidebar ────────────────────────────────────────────────────────────────────
function CheckoutSidebar({ job, subtotal, fee, total }) {
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

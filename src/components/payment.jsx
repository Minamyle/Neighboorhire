import {
  CreditCard,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  Lock,
} from "lucide-react";

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

// ── Step 2: Payment ────────────────────────────────────────────────────────────
export default function PaymentStep({ total, onNext, onBack }) {
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

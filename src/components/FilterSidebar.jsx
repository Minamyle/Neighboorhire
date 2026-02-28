import {Star} from "lucide-react";

export default function FilterSidebar() {
  const categories = [
    {label: "All Services", count: null},
    {label: "Generator Repair", count: null},
    {label: "AC Technician", count: null},
    {label: "Tailoring/Fashion", count: null},
    {label: "Catering Services", count: null},
    {label: "Plumbing & Electrical", count: null},
  ];

  return (
    <aside className="w-full space-y-8">
      {/* Service Category */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Service Category
        </h3>
        <ul className="space-y-3">
          {categories.map((cat, i) => (
            <li
              key={cat.label}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  i === 0
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 dark:border-zinc-700"
                }`}
              >
                {i === 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span
                className={`text-[13px] font-medium transition-colors ${
                  i === 0
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-zinc-400 group-hover:text-blue-600"
                }`}
              >
                {cat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="px-2">
          <input
            type="range"
            min="2000"
            max="50000"
            step="1000"
            className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-3">
            <span className="text-[11px] font-bold text-slate-500">₦2,000</span>
            <span className="text-[11px] font-bold text-slate-500">
              ₦50,000+
            </span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Rating
        </h3>
        <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200 dark:border-zinc-800 cursor-pointer hover:border-blue-400 transition-colors">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} className="fill-blue-500 text-blue-500" />
            ))}
            <Star size={14} className="text-slate-300 dark:text-zinc-700" />
          </div>
          <span className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">
            & Up
          </span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Availability
        </h3>
        <select className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
          <option>Anytime</option>
          <option>Weekends Only</option>
          <option>Weekdays Only</option>
        </select>
      </div>
    </aside>
  );
}

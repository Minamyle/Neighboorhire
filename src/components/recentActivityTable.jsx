export default function GlassTable({ title, data }) {
  // Only take the first 5 items from the data array
  const latestData = data.slice(0, 5);

  return (
    <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300">
      {/* Title Header */}
      <div className="p-5 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full uppercase font-black">
            Live Updates
          </span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-tighter">
            Show 5 of {data.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header Row */}
          <thead className="bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-zinc-500 text-[10px] uppercase tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Budget</th>
            </tr>
          </thead>

          {/* Table Body - Mapping only sliced data */}
          <tbody className="text-sm text-slate-600 dark:text-zinc-300">
            {latestData.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                  {item.customer}
                </td>
                <td className="px-6 py-4 italic">{item.title}</td>
                <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {item.category}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : item.status === "in-progress"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {item.status.replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                  {item.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

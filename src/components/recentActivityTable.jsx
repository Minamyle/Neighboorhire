export default function GlassTable({ title, data }) {
  return (
    /* Changed bg-white/5 to bg-white/70 (light) and bg-white/5 (dark) */
    <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300">
      {/* Title Header */}
      <div className="p-5 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <span className="text-[10px] bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full uppercase font-black">
          Live Updates
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header Row */}
          <thead className="bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-zinc-500 text-[10px] uppercase tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm text-slate-600 dark:text-zinc-300">
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                  {item.customer}
                </td>
                <td className="px-6 py-4">{item.service}</td>
                <td
                  className={`px-6 py-4 font-black ${
                    item.status === "Completed"
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                  ${item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

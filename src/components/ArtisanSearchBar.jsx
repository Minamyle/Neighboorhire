import {Search, MapPin} from "lucide-react";

export default function ArtisanSearchBar() {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 p-2 bg-white dark:bg-zinc-900 rounded-3xl md:rounded-full shadow-xl md:shadow-lg border border-slate-200 dark:border-zinc-800">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800">
          <Search size={20} className="text-blue-500 shrink-0" />
          <input
            type="text"
            placeholder="Search for a service..."
            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 text-sm py-2 font-medium"
          />
        </div>

        <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2">
          <MapPin size={20} className="text-blue-500 shrink-0" />
          <input
            type="text"
            placeholder="Location in Nigeria"
            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 text-sm py-2 font-medium"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-3 rounded-2xl md:rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/25">
          Search
        </button>
      </div>
    </div>
  );
}

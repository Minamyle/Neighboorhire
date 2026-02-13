import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onLogout, onToggleSidebar }) {
  const { user } = useAuth();
  const displayName = user?.name?.split(" ")[0] || "Guest";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between pt-4 px-6 md:justify-end ">
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2.5 rounded-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 shadow-subtle active:scale-90 transition-transform"
      >
        <Menu size={20} className="text-slate-600 dark:text-zinc-400" />
      </button>

      {/* Compact User Pill */}
      <div
        className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full 
                      bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl 
                      border border-white/20 dark:border-zinc-800/50 
                      shadow-subtle transition-all duration-300"
      >
        <div className="flex items-center gap-2.5 pl-1.5 py-0.5">
          <div className="relative">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full 
                            bg-linear-to-br from-blue-500 to-blue-600 
                            text-white text-[10px] font-bold shadow-sm"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                firstLetter
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white dark:border-zinc-900 rounded-full" />
          </div>

          <div className="flex flex-col pr-1">
            <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-100 leading-none">
              {displayName}
            </span>
            <span className="text-[8px] font-medium text-blue-500 dark:text-blue-400 uppercase tracking-tighter">
              {user?.role || "User"}
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800" />

        <button
          onClick={onLogout}
          className="p-2 rounded-full text-slate-400 dark:text-zinc-500
                     hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 
                     transition-all active:scale-90 group"
        >
          <LogOut
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </header>
  );
}

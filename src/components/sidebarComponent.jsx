import { NavLink } from "react-router-dom";

export default function DashboardSidebar({ linkData, title = "Dashboard" }) {
  return (
    <aside className="h-full px-4 py-8 flex flex-col space-y-8 bg-transparent">
      {/* Branding Section */}
      <div className="flex flex-col items-center gap-2 group cursor-default">
        <div className="relative">
          <img
            src="/images/logoNeb.png"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-lift relative z-10"
          />
          {/* Modern Glow Effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Dynamic Dashboard Title */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500">
            NeighborHire
          </span>
          <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1">
        <ul className="space-y-1.5">
          {linkData.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <NavLink to={link.path} end>
                  {({ isActive }) => (
                    <div
                      className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-zinc-100"
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      <div
                        className={`absolute left-0 w-1 h-4 rounded-r-full bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-center
                        ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"}`}
                      />

                      <Icon
                        size={18}
                        className={isActive ? "animate-pulse" : ""}
                      />
                      <span>{link.label}</span>
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

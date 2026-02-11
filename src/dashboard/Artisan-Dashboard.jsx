import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";
import DashboardSidebar from "../components/sidebarComponent";
import Topbar from "../components/topbarComponent";
import { dashboardNavigation } from "../config/DashboardNavigation";

const currentUser = {
  name: "Samuel Mensah",
  role: "Lead Artisan",
  image: null,
};

export default function ArtisanDashboard() {
  const { artisan } = dashboardNavigation;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define the title for this specific dashboard
  const dashboardTitle = "Artisan Dashboard";

  const handleLogout = () => {
    console.log("Cleaning up artisan session...");
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {/* 1. MOBILE SIDEBAR (Drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-500 md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
        {/* Pass the dynamic title here */}
        <DashboardSidebar linkData={artisan} title={dashboardTitle} />
      </div>

      {/* 2. MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden animate-fade"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 3. DESKTOP SIDEBAR (Static) */}
      <aside className="hidden md:block w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        {/* Pass the dynamic title here */}
        <DashboardSidebar linkData={artisan} title={dashboardTitle} />
      </aside>

      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="w-auto">
          <Topbar
            user={currentUser}
            onLogout={handleLogout}
            onToggleSidebar={() => setIsMobileMenuOpen(true)}
          />
        </header>

        <div className="p-6 md:p-10 animate-enter flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

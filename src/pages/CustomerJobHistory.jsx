import { useState } from "react";
import {
  UserCheck,
  Globe,
  MapPin,
  Briefcase,
  Star,
  Search,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CreateJobModal from "../components/createJobModal";

export default function JobHistory() {
  const { user, allArtisans } = useAuth();
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const artisans =
    allArtisans?.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  // Helper to generate a unique gradient based on name
  const getAvatarGradient = (name) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-violet-500 to-purple-600",
      "from-rose-500 to-pink-600",
      "from-amber-500 to-orange-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const openHireModal = (artisan = null) => {
    setSelectedArtisan(artisan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Find an{" "}
              <span className="text-blue-600 dark:text-blue-400">Artisan</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Verified professionals in Kumasi • {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3.5 w-full sm:w-72 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white shadow-sm"
              />
            </div>
            <button
              onClick={() => openHireModal(null)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              <Globe size={18} />
              <span>Public Post</span>
            </button>
          </div>
        </header>

        {/* --- Artisan Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artisans.map((artisan) => (
            <div
              id={`card-${artisan.id}`}
              key={artisan.id}
              onMouseMove={(e) => handleMouseMove(e, artisan.id)}
              className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-blue-900/20"
            >
              {/* Glow Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(37,99,235,0.12)_0%,transparent_45%)]] pointer-events-none" />

              <div className="relative z-10">
                {/* Top Bar: Letter Avatar & Badges */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    {/* Letter Avatar Implementation */}
                    <div
                      className={`h-16 w-16 rounded-2xl bg-linear-to-br ${getAvatarGradient(artisan.name)} flex items-center justify-center text-white text-2xl font-black shadow-lg border-2 border-white dark:border-slate-700`}
                    >
                      {artisan.name.charAt(0).toUpperCase()}
                    </div>

                    {artisan.isVerified && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full border-2 border-white dark:border-slate-800 shadow-md">
                        <CheckCircle
                          size={12}
                          fill="white"
                          className="text-blue-600"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-400/10 px-2 py-1 rounded-lg text-amber-600 dark:text-amber-400 font-black text-xs border border-amber-100 dark:border-amber-400/20">
                      <Star size={12} fill="currentColor" />
                      {artisan.rating}
                    </div>
                    {artisan.isWhatsApp && (
                      <div className="bg-green-50 dark:bg-green-400/10 p-1.5 rounded-lg text-green-600 dark:text-green-400 border border-green-100 dark:border-green-400/20">
                        <MessageCircle
                          size={14}
                          fill="currentColor"
                          className="opacity-80"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Body: Name & Business */}
                <div className="space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {artisan.businessName || artisan.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} />
                    {artisan.category}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm mt-2">
                    <MapPin size={14} />
                    <span>{artisan.location}</span>
                  </div>
                </div>

                {/* Info Row: Rate & Experience */}
                <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-700/50 mb-6">
                  <div className="text-center border-r border-slate-100 dark:border-slate-700/50 flex-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      Rate
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {artisan.baseRate}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      Exp
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {artisan.yearsExperience} yrs
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openHireModal(artisan)}
                  className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-slate-700 text-white font-bold text-sm transition-all hover:bg-blue-600 dark:hover:bg-blue-500 shadow-xl hover:shadow-blue-500/30 active:scale-95"
                >
                  Direct Hire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Banner --- */}
        <footer className="mt-16 p-8 rounded-[2.5rem] bg-linear-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-900/20">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-lg font-bold">Verified Professionals</p>
              <p className="text-blue-100 text-sm">
                All artisans are background-checked for your safety.
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            Our Standards
          </button>
        </footer>
      </div>

      {isModalOpen && (
        <CreateJobModal
          artisan={selectedArtisan}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

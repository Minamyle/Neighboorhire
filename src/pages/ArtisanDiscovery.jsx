import {useState, useEffect} from "react";
import ArtisanSearchBar from "../components/ArtisanSearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ArtisanCard from "../components/ArtisanCard";
import SkeletonArtisanCard from "../components/SkeletonArtisanCard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

const MOCK_ARTISANS = [
  {
    id: 1,
    name: "David Thomas",
    profession: "Generator Repair Expert",
    rating: 4.9,
    reviews: 128,
    bio: "Specializing in Mikano, Perkins and portable generator maintenance. Over 10 years experience...",
    price: 5500,
    isVerified: true,
    isOnline: true,
    image: null,
  },
  {
    id: 2,
    name: "Amina Bello",
    profession: "Catering & Pastry Chef",
    rating: 5.0,
    reviews: 84,
    bio: "Professional catering for events in Abuja. Expert in local Nigerian delicacies and international...",
    price: 12000,
    isVerified: true,
    isOnline: true,
    image: null,
  },
  {
    id: 3,
    name: "Chidubem Okafor",
    profession: "AC & Fridge Technician",
    rating: 4.8,
    reviews: 215,
    bio: "Certified technician for domestic and industrial cooling systems. Fast and reliable service...",
    price: 4500,
    isVerified: true,
    isOnline: false,
    image: null,
  },
  {
    id: 4,
    name: "Blessing Effiong",
    profession: "Tailoring & Fashion Design",
    rating: 4.7,
    reviews: 92,
    bio: "Bespoke tailoring for men and women. Specialist in Senator wears, Ankara, and corporate outfits...",
    price: 3000,
    isVerified: true,
    isOnline: true,
    image: null,
  },
  {
    id: 5,
    name: "Tunde Balogun",
    profession: "Master Electrician",
    rating: 4.9,
    reviews: 156,
    bio: "Inverter installation, house wiring, and industrial electrical maintenance. Quality guaranteed...",
    price: 6000,
    isVerified: true,
    isOnline: true,
    image: null,
  },
];

export default function ArtisanDiscovery() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      <main className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-8">
            Find Skilled Local <br className="hidden md:block" /> Artisans in
            Nigeria
          </h1>
          <ArtisanSearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl font-black text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all"
            >
              <SlidersHorizontal size={16} className="text-blue-600" />
              Filters
            </button>

            <div className="flex items-center gap-1 text-xs font-black text-slate-900 dark:text-white uppercase italic">
              Sort: Most Relevant
              <ChevronDown size={14} className="text-blue-600" />
            </div>
          </div>

          {/* Sidebar - Desktop & Mobile Overlay */}
          <div
            className={`
            fixed inset-0 z-[60] lg:relative lg:inset-auto lg:z-auto lg:block
            ${showMobileFilters ? "block" : "hidden"}
          `}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* Content */}
            <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-zinc-950 p-8 overflow-y-auto lg:p-0 lg:bg-transparent lg:static lg:w-64 lg:max-w-none shadow-2xl lg:shadow-none transition-transform">
              <div className="flex items-center justify-between mb-8 lg:hidden">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar - Desktop only */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <p className="text-sm font-bold text-slate-500">
                Showing{" "}
                <span className="text-slate-900 dark:text-white">124</span>{" "}
                verified Nigerian artisans
              </p>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Sort By:
                </span>
                <div className="flex items-center gap-1 text-xs font-black text-slate-900 dark:text-white uppercase italic">
                  Most Relevant
                  <ChevronDown size={14} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {isLoading ? (
                Array.from({length: 6}).map((_, i) => (
                  <SkeletonArtisanCard key={i} />
                ))
              ) : (
                <>
                  {MOCK_ARTISANS.map((artisan) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                  ))}
                  {/* Just for UI demo, repeating one as skeleton like in the image */}
                  <div className="bg-slate-100/50 dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 opacity-50">
                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-800 animate-pulse" />
                    <div className="w-1/2 h-3 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="w-3/4 h-3 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="w-full h-8 bg-slate-200 dark:bg-zinc-800 rounded-xl mt-4 animate-pulse" />
                  </div>
                </>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-all">
                <ChevronLeft size={20} className="text-slate-400" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                    page === 1
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "border border-slate-200 dark:border-zinc-800 text-slate-500 hover:bg-white dark:hover:bg-zinc-900"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="text-slate-400 font-bold px-2">...</span>

              <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 font-black hover:bg-white dark:hover:bg-zinc-900">
                12
              </button>

              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-all text-slate-900 dark:text-white">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const mainNavigation = [
  { label: "Home", path: "/" },
  { label: "Find Artisans", path: "/artisans" },
  { label: "How It Works", path: "#how-it-works" },
  { label: "Services", path: "/services" },
  { label: "Get Started", path: "/auth/register", variant: "button" },
];

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-700 ${
        isScrolled ? "pt-4" : "pt-0"
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            isScrolled
              ? "w-[92%] md:w-[85%] lg:w-[70%] px-6 py-2 rounded-full bg-white/70 dark:bg-zinc-900/70 shadow-2xl border border-white/40 dark:border-zinc-800/50 backdrop-blur-2xl"
              : "w-full px-10 py-6 bg-transparent border-transparent"
          }`}
      >
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative">
            <img
              src="/images/logoNeb.png"
              alt="Logo"
              className="w-10 h-10 rounded-full z-10 relative"
            />
            <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">
            Neighbor
            <span className="text-blue-600 dark:text-blue-500">Hire</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2">
          {mainNavigation.map((link) => (
            <li key={link.label}>
              {link.variant === "button" ? (
                <NavLink
                  to={link.path}
                  className="relative ml-4 group overflow-hidden px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white text-sm font-bold transition-all duration-300 active:scale-95 flex items-center gap-2"
                >
                  {/* Button Shimmer Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />

                  {/* Explicitly forced text-white to fix hover conflict */}
                  <span className="relative z-10 text-white group-hover:text-white">
                    {link.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 text-white group-hover:text-white group-hover:translate-x-1 transition-transform"
                  />
                </NavLink>
              ) : (
                <NavLink
                  to={link.path}
                  className="px-4 py-2 rounded-full text-sm font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/5 transition-all"
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-blue-600" />
          ) : (
            <Menu size={24} className="dark:text-white" />
          )}
        </button>
      </nav>

      {/* Advanced Mobile Menu Overlay */}
      <div
        className={`absolute top-full inset-x-6 mt-4 p-8 rounded-[2.5rem] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border border-white/20 dark:border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 md:hidden
        ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {mainNavigation.map((link, i) => (
            <li
              key={link.label}
              className={`transition-all duration-500 ${
                isMobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <NavLink
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-2xl text-xl font-black transition-all ${
                  link.variant === "button"
                    ? "bg-blue-600 text-white hover:text-white shadow-xl shadow-blue-500/20 active:scale-95"
                    : "text-slate-900 dark:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-900"
                }`}
              >
                {link.label}
                <ArrowRight size={20} opacity={0.5} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

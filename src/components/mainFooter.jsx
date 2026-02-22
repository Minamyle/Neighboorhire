import { NavLink, useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="mt-20 border-t border-slate-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Section 1: Logo & Mission */}
          <div className="col-span-2 md:col-span-1">
            <NavLink to="/" className="flex items-center gap-2 group mb-4">
              <img
                src="/images/logoNeb.png"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">
                Neighbor
                <span className="text-blue-600 dark:text-blue-500">Hire</span>
              </span>
            </NavLink>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Connecting you with trusted artisans for all your home needs.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-4">
              {["Plumbing", "Electrical", "Carpentry", "Cleaning"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                      onClick={() => navigate("/artisans")}
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Section 3: Company */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              {["About Us", "Careers", "Contact", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Social & Subscribe */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4 mb-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-subtle transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group hover:underline">
              Join Newsletter{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 dark:text-zinc-600">
          <p>&copy; {currentYear} NeighborHire. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/home" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Services", path: "/services" },
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isActive);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isActive]);

  return (
    <nav className="fixed md:relative top-0 w-full bg-white z-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-6 md:px-20 py-3">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="/images/logoNeb.png"
            alt="NeighborHire logo"
            className="h-10"
          />
          <h1 className="text-2xl font-semibold">NeighborHire</h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm md:text-base after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-current after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <X /> : <AlignJustify />}
        </button>
      </div>

      {/* Mobile menu */}
      {isActive && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-[#2C2C2C] text-white text-xl font-semibold md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsActive(false)}
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-current after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

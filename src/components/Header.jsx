import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="py-3 px-20 items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] z-50 bg-white fixed md:relative w-full">
      <div className="flex justify-between items-center px-6 md:px-20">
        <div className="flex items-center ">
          <a href="#">
            <img src="/images/logoNeb.png" alt="logo" className="h-10" />
          </a>
          <h1 className="text-2xl">NeighborHire</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            to="/home"
            className="relative no-underline after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full text-sm md:text-base"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="relative no-underline after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="relative no-underline after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full text-sm md:text-base"
          >
            <span className="border-amber-300">Register</span>
          </Link>
          <Link
            to="/services"
            className="relative no-underline after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full text-sm md:text-base"
          >
            Services
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

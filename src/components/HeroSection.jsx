// Import React to create React components
import React from "react";

// Import useNavigate hook from react-router-dom
// This allows us to navigate to different pages programmatically
import { useNavigate } from "react-router-dom";

// HeroSection component represents the main hero/banner section of the homepage
const HeroSection = () => {
  // Initialize navigation function
  const navigate = useNavigate();

  return (
    // Main container controlling width, padding, and background color
    <div className="w-full bg-white px-8 md:px-12 lg:px-24 py-12 2xl:px-40">
      {/* Flex container for hero content */}
      {/* On small screens it stacks vertically, on large screens it becomes side-by-side */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-around gap-5">
        {/* ================= LEFT CONTENT ================= */}
        {/* This section contains the text and call-to-action buttons */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* Main headline */}
          {/* Responsive line breaks control how the text appears on different screen sizes */}
          <h1 className="text-3xl text-[#007bff] sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-extrabold leading-tight mb-6">
            Find a Helpful <br className="hidden sm:block" />
            neighbor <br className="hidden lg:block xl:hidden" />
            for <br className="hidden xl:block " /> any task
          </h1>

          {/* Supporting description explaining the service */}
          <p className="text-gray-600 mb-6 text-base sm:text-lg 2xl:text-3xl">
            From plumbing to cleaning, connect with trusted
            <br className="hidden lg:block" /> locals ready to help you get the
            job done efficiently <br className="hidden " />
            and safely.
          </p>

          {/* Buttons container */}
          {/* Stacks vertically on small screens and horizontally on larger screens */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* Primary Call-To-Action button */}
            {/* Navigates users to the services page */}
            <button
              className="bg-[#dc3545] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
              onClick={() => navigate("/services")}
            >
              Find a Service
            </button>

            {/* Secondary Call-To-Action button */}
            {/* Encourages users to sign up as a helper */}
            <button className="border border-[#dc3545] px-6 py-3 rounded-lg hover:bg-[#dc3545] hover:text-white transition">
              Become a Helper
            </button>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        {/* Displays a hero image representing the service platform */}
        <div className="w-full lg:w-1/2 flex justify-center">
          {/* Hero image */}
          <img
            src="/images/gardener.jpg"
            alt="gardener"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default HeroSection;

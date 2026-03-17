// Import React to create React components
import React from "react";

// Import useNavigate hook from react-router-dom
// This hook allows us to programmatically navigate to different pages
import { useNavigate } from "react-router-dom";

// FeaturedSection component displays highlighted services on the homepage
const FeaturedSection = () => {
  // Initialize navigation function using useNavigate hook
  const navigate = useNavigate();

  return (
    // Main container that controls spacing and responsive padding
    <div className="w-full bg-gray-100 px-6 md:px-12 lg:px-24 py-16 2xl:px-40">
      {/* ================= HEADER SECTION ================= */}
      {/* This section contains the title and link to view all services */}
      <div className="mb-12 text-center lg:text-left ">
        {/* Section title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#007bff] mb-3">
          Featured Services
        </h2>

        {/* Flex container for description and "View all services" button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Short description explaining the services */}
          <p className="text-gray-600">Most requested help in your area</p>

          {/* Button that navigates users to the services page */}
          <button
            className="self-center sm:self-auto flex items-center gap-2 underline font-medium hover:text-[#007bff] transition"
            onClick={() => navigate("/services")} // Navigates to the services page
          >
            View all services
            {/* Arrow icon indicating navigation */}
            <img src="/images/right-arrow.png" alt="arrow" className="w-3" />
          </button>
        </div>
      </div>

      {/* ================= FEATURED SERVICE CARDS ================= */}
      {/* Grid layout that displays featured service cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* ================= CARD 1 ================= */}
        {/* Clicking this card redirects users to login page */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          {/* Icon container */}
          <div className="flex items-center justify-center h-24 rounded-xl bg-[#7bb1eb] mb-4">
            {/* Service icon */}
            <img src="/images/mop.png" alt="mop" className="w-12" />
          </div>

          {/* Service title */}
          <h3 className="text-xl font-semibold mb-1">Home Cleaning</h3>

          {/* Rating and number of completed jobs */}
          <small className="text-gray-500">⭐ 4.9 (120+ jobs)</small>

          {/* Short description of the service */}
          <p className="text-gray-600 mt-3">
            Sparkling clean homes by trusted neighbors.
          </p>
        </div>

        {/* ================= CARD 2 ================= */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          {/* Icon container */}
          <div className="flex items-center justify-center h-24 rounded-xl bg-green-200 mb-4">
            {/* Service icon */}
            <img src="/images/flowers.png" alt="flower" className="w-12" />
          </div>

          {/* Service title */}
          <h3 className="text-xl font-semibold mb-1">Gardening</h3>

          {/* Service rating */}
          <small className="text-gray-500">⭐ 4.8 (85 jobs)</small>

          {/* Service description */}
          <p className="text-gray-600 mt-3">
            Lawn mowing, weeding, and planting help.
          </p>
        </div>

        {/* ================= CARD 3 ================= */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          {/* Icon container */}
          <div className="flex items-center justify-center h-24 rounded-xl bg-yellow-200 mb-4">
            {/* Service icon */}
            <img src="/images/plumber.png" alt="plumber" className="w-12" />
          </div>

          {/* Service title */}
          <h3 className="text-xl font-semibold mb-1">Handyman</h3>

          {/* Rating information */}
          <small className="text-gray-500">⭐ 5.0 (200 jobs)</small>

          {/* Short description */}
          <p className="text-gray-600 mt-3">
            Quick fixes for repairs and installation.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default FeaturedSection;

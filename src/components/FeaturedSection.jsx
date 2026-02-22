import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-100 px-6 md:px-12 lg:px-24 py-16 2xl:px-40">
      {/* Header */}
      <div className="mb-12 text-center lg:text-left ">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#007bff] mb-3">
          Featured Services
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-600">Most requested help in your area</p>

          <button
            className="self-center sm:self-auto flex items-center gap-2 underline font-medium hover:text-[#007bff] transition"
            onClick={() => navigate("/services")}
          >
            View all services
            <img src="/images/right-arrow.png" alt="arrow" className="w-3" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          <div className="flex items-center justify-center h-24 rounded-xl bg-[#7bb1eb] mb-4">
            <img src="/images/mop.png" alt="mop" className="w-12" />
          </div>

          <h3 className="text-xl font-semibold mb-1">Home Cleaning</h3>
          <small className="text-gray-500">⭐ 4.9 (120+ jobs)</small>

          <p className="text-gray-600 mt-3">
            Sparkling clean homes by trusted neighbors.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          <div className="flex items-center justify-center h-24 rounded-xl bg-green-200 mb-4">
            <img src="/images/flowers.png" alt="flower" className="w-12" />
          </div>

          <h3 className="text-xl font-semibold mb-1">Gardening</h3>
          <small className="text-gray-500">⭐ 4.8 (85 jobs)</small>

          <p className="text-gray-600 mt-3">
            Lawn mowing, weeding, and planting help.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/auth/login")}
        >
          <div className="flex items-center justify-center h-24 rounded-xl bg-yellow-200 mb-4">
            <img src="/images/plumber.png" alt="plumber" className="w-12" />
          </div>

          <h3 className="text-xl font-semibold mb-1">Handyman</h3>
          <small className="text-gray-500">⭐ 5.0 (200 jobs)</small>

          <p className="text-gray-600 mt-3">
            Quick fixes for repairs and installation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;

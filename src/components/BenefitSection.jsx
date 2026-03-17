// Import React so we can create React components
import React from "react";

// BenefitSection component highlights the advantages of using the platform
const BenefitSection = () => {
  return (
    // Main container controlling section width, background color, and padding
    <div className="w-full bg-white px-6 md:px-12 lg:px-24 py-16 2xl:px-40">
      {/* ================= HEADING SECTION ================= */}
      {/* Displays the section title and a small label above it */}
      <div className="flex flex-col items-center text-center mb-14">
        {/* Small label used as a category indicator */}
        <h3 className="bg-[#ffb012] px-3 py-1 font-semibold rounded-lg mb-4 text-sm">
          BENEFITS
        </h3>

        {/* Main section title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#dc3545]">
          Why Choose NeighborHire?
        </h1>
      </div>

      {/* ================= BENEFIT CARDS ================= */}
      {/* Responsive grid layout for the benefit cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* ================= CARD 1 ================= */}
        {/* Highlights trust and security of the platform */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          {/* Icon representing trust/security */}
          <img src="/images/shield.png" alt="trusted" className="w-12 mb-4" />

          {/* Benefit title */}
          <h3 className="text-xl font-semibold mb-2 text-[#dc3545]">
            Trusted & Vetted
          </h3>

          {/* Description explaining the benefit */}
          <p className="text-gray-600">
            Every helper goes through a strict
            <br className="block lg:hidden" /> background check.
          </p>
        </div>

        {/* ================= CARD 2 ================= */}
        {/* Explains the local community advantage */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          {/* Icon representing local services */}
          <img
            src="/images/placeholder.png"
            alt="local"
            className="w-12 mb-4"
          />

          {/* Benefit title */}
          <h3 className="text-xl font-semibold mb-2 text-[#dc3545]">
            Truly Local
          </h3>

          {/* Description explaining the benefit */}
          <p className="text-gray-600">
            Support your community by hiring
            <br className="block lg:hidden" /> neighbors right next door.
          </p>
        </div>

        {/* ================= CARD 3 ================= */}
        {/* Highlights ease of use of the platform */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          {/* Icon representing simplicity */}
          <img src="/images/tap.png" alt="easy" className="w-12 mb-4" />

          {/* Benefit title */}
          <h3 className="text-xl font-semibold mb-2 text-[#dc3545]">
            Simple & Easy
          </h3>

          {/* Description explaining the benefit */}
          <p className="text-gray-600">
            Post a task, view offers, and book
            <br className="block lg:hidden" /> help in just a few clicks.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be imported and used in other parts of the app
export default BenefitSection;

import React from "react";

const BenefitSection = () => {
  return (
    <div className="w-full bg-white px-6 md:px-12 lg:px-60 py-16">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-14">
        <h3 className="bg-[#ffb012] px-3 py-1 font-semibold rounded-lg mb-4 text-sm">
          BENEFITS
        </h3>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#dc3545]">
          Why Choose NeighborHire?
        </h1>
      </div>

      {/* Benefit Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <img src="/images/shield.png" alt="trusted" className="w-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2  text-[#dc3545]">
            Trusted & Vetted
          </h3>
          <p className="text-gray-600">
            Every helper goes through a strict <br /> background check.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <img
            src="/images/placeholder.png"
            alt="local"
            className="w-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2  text-[#dc3545]">
            Truly Local
          </h3>
          <p className="text-gray-600">
            Support your community by hiring <br /> neighbors right next door.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <img src="/images/tap.png" alt="easy" className="w-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2  text-[#dc3545]">
            Simple & Easy
          </h3>
          <p className="text-gray-600">
            Post a task, view offers, and book <br /> help in just a few clicks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitSection;

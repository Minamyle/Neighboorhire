import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full  bg-white px-8 md:px-12 lg:px-24 py-12 2xl:px-40">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-around gap-5">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl text-[#007bff] sm:text-4xl lg:text-6xl  font-extrabold leading-tight mb-6">
            Find a Helpful <br className="hidden sm:block" />
            neighbor <br className="hidden lg:block xl:hidden" />
            for <br className="hidden xl:block " /> any task
          </h1>

          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            From plumbing to cleaning, connect with trusted
            <br className="hidden lg:block" /> locals ready to help you get the
            job done efficiently <br className="hidden " />
            and safely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-[#dc3545] text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
              Find a Service
            </button>

            <button className="border border-[#dc3545] px-6 py-3 rounded-lg hover:bg-[#dc3545] hover:text-white transition">
              Become a Helper
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/images/gardener.jpg"
            alt="gardener"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

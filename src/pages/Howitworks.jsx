import React from "react";

const Howitworks = () => {
  return (
    <div>
      <section className="flex flex-col w-full items-center px-10 justify-center sm:px-20 ">
        <div className=" text-center ">
          <h1 className="text-2xl font-bold mb-2 sm:text-5xl">
            Building community through <br />
            <span className="text-[#ffb012]">craftsmanship.</span>
          </h1>
          <p className=" mb-7">
            NeighborHire connects skilled local creators with neighbors looking
            for unique, high- <br /> quality artisans and services. Here is how
            our ecosystem works.
          </p>
          <div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row 
           "
          >
            <button className="bg-[#dc3545] text-white rounded-xl px-2 py-2 font-semibold hover:bg-[#c82333] transition sm:px-5 sm:py-5">
              Looking for Artisan
            </button>
            <button className="bg-[#ffb012] text-white rounded-xl px-2 py-2 font-semibold hover:bg-[#c82333] transition sm:px-5 sm:py-5">
              Looking for Customers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Howitworks;

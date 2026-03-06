import React from "react";

const forCustomer = [
  {
    img: "/images/discover.png",
    subheading: "Discover Local Talent",
    text: "Browse a curated selection of artisans in your neighborhood. From custom woodowrk to hand-poured candles, find exactly what you need.",
  },
  {
    img: "/images/secure.png",
    subheading: "Secure Booking",
    text: "Communicate directly with creators, request customizations, and pay securely through our platform. your payment is held until you're satisfied",
  },
  {
    img: "/images/enjoy.png",
    subheading: "Enjoy your Piece",
    text: "Receive your unique creation via local pick up or delivery. Share your experience by leaving a review to help the community grow.",
  },
];

const Howitworks = () => {
  return (
    <div>
      <section className=" bg-amber-100 py-50 flex flex-col w-full items-center px-10 justify-center sm:px-20 md:px-10 lg:px-5">
        <div className=" text-center ">
          <h1 className="text-2xl font-bold mb-2 sm:text-5xl md:text-5xl lg:text-6xl">
            Building community through <br />
            <span className="text-[#ffb012]">craftsmanship.</span>
          </h1>
          <p className=" mb-7 lg:text-[20px]">
            NeighborHire connects skilled local creators with neighbors looking
            for unique, high- <br /> quality artisans and services. Here is how
            our ecosystem works.
          </p>
          <div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row 
           "
          >
            <button className="bg-[#dc3545] text-white rounded-xl px-2 py-2 font-semibold hover:bg-[#ffb012] transition sm:px-5 sm:py-5">
              Looking for Artisan
            </button>
            <button className="bg-[#ffb012] text-white rounded-xl px-2 py-2 font-semibold hover:bg-[#c82333] transition sm:px-5 sm:py-5">
              Looking for Customers
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-3xl text-[#dc3545] sm:text-4xl font-bold text-center mb-14">
            For Customers
          </h1>

          {/* Cards */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-5">
            {forCustomer.map((customer) => (
              <div
                key={customer.id}
                className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 text-left mb-10"
              >
                <img
                  src={customer.img}
                  alt={customer.subheading}
                  className="w-full rounded-2xl mb-6"
                />

                <h3 className="text-xl font-semibold mb-3">
                  {customer.subheading}
                </h3>

                <p className="text-gray-600 leading-relaxed">{customer.text}</p>
              </div>
            ))}
          </div>
          <button className="bg-[#ffb012] px-6 py-4 rounded-4xl font-bold text-white cursor-pointer">
            Find an Artisan Now
          </button>
        </div>
      </section>
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-10">
            <h1 className="text-2xl font-bold">For Artisans</h1>
            <div className="flex gap-6">
              <h1 className="w-10 h-10 flex items-center justify-center rounded-4xl bg-[#ffb012] text-white font-bold">
                1
              </h1>
              <div>
                <h2 className="text-xl font-semibold mb-2">Set Up Your Shop</h2>
                <p className="text-gray-600">
                  Create a professional profile in minutes. Showcase your
                  portfolio, set your rates, and define your service area.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <h1 className="w-10 h-10 flex items-center justify-center rounded-4xl bg-[#ffb012] text-white font-bold">
                2
              </h1>
              <div>
                <h2 className="text-xl font-semibold mb-2">Manage Requests</h2>
                <p className="text-gray-600">
                  Get notified of new leads and project requests. Use our
                  integrated chat to finalize details and confirm orders.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <h1 className="w-10 h-10 flex items-center justify-center rounded-4xl bg-[#ffb012] text-white font-bold">
                3
              </h1>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Get Paid Promptly
                </h2>
                <p className="text-gray-600">
                  Complete the work and mark the project as delivered. Funds are
                  transferred to your account automatically upon completion.
                </p>
              </div>
            </div>

            <button className="bg-[#dc3545] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#ffb012] transition">
              Find Customers Now
            </button>
          </div>

          <div className="lg:w-1/2">
            <img
              src="/images/forartisan.png"
              alt="for artisan"
              className="w-full rounded-3xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Howitworks;

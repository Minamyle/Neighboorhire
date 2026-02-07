import React from "react";

const chooseUS = [
  {
    id: 1,
    image: "/images/checked.png",
    headline: "Trusted & Vetted",
    content: "Every helper goes through a strict background check",
  },
  {
    id: 2,
    image: "/images/placeholder.png",
    headline: "Truly Local",
    content: "Support your community by hiring neighbors right next door.",
  },

  {
    id: 3,
    image: "/images/tap.png",
    headline: "Simple & Easy",
    content: "Post a task, view offer and book help in just a few click",
  },
];

const FeatServices = [
  {
    id: 1,
    img: "/images/mop.png",
    job: "Home Cleaning",
    rating: "4.9(120+ jobs)",
    comment: "Sparkling clean homes by trusted neighbors",
  },
  {
    id: 2,
    img: "/images/flowers.png",
    job: "Home Cleaning",
    rating: "4.9(120+ jobs)",
    comment: "Sparkling clean homes by trusted neighbors",
  },
  {
    id: 3,
    img: "/images/plumber.png",
    job: "Home Cleaning",
    rating: "4.9(120+ jobs)",
    comment: "Sparkling clean homes by trusted neighbors",
  },
];

const Home = () => {
  return (
    <div className="flex pt-10 flex-col items-center justify-center md:pt-0 overflow-x-hidden">
      <section className="w-full py-14 px-6 bg-[#dc3545]">
        <div>
          <h1>
            Find a helpful <br /> neighbor for <br /> any task
          </h1>
          <p>
            from plumbing to cleaning, connect with trusted <br /> locals ready
            to help you get the job done efficiently <br /> and safely
          </p>
          <div>
            <button>Find a Service</button>
            <button>Become a Helper</button>
          </div>
        </div>
        <div>
          <img src="/images/gardener.jpg" alt="gardener" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full py-14 px-6 bg-[#007bff]">
        <div>
          <p>BENEFITS</p>
          <h2>Why Choose NeighborHire</h2>

          <ul className="grid gap-6 md:grid-cols-3 mt-8">
            {chooseUS.map((section, id) => {
              return (
                <li key={id} className="text-center md:text-left">
                  <img src={section.image} alt="images" />
                  <h3 className="text-2xl font-semibold mb-4">
                    {section.headline}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {section.content}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Section 3 */}

      <section>
        <div>
          <h2>Featured Services</h2>
          <p>Most requested help in your area</p>
          <ul className="grid gap-6 md:grid-cols-3 mt-8">
            {FeatServices.map((sec, id) => {
              return (
                <li key={id} className="text-center md:text-left">
                  <img src={sec.img} alt="images" />
                  <h3 className="text-2xl font-semibold mb-4">{sec.job}</h3>
                  <small>{sec.rating}</small>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {sec.comment}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <div>
          <h2>How it works</h2>
          <p>Getting help is as easy as 1-2-3</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

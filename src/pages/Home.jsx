const chooseUs = [
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
    content: "Post a task, view offers and book help in just a few clicks",
  },
];

const featuredServices = [
  {
    id: 1,
    image: "/images/mop.png",
    job: "Home Cleaning",
    rating: " ⭐ 4.9 (120+ jobs)",
    comment: "Sparkling clean homes by trusted neighbors",
  },
  {
    id: 2,
    image: "/images/flowers.png",
    job: "Gardening",
    rating: " ⭐ 4.8 (85 jobs)",
    comment: "Lawn mowing, weeding and planting help.",
  },
  {
    id: 3,
    image: "/images/plumber.png",
    job: "Handyman",
    rating: " ⭐ 5.0 (200+ jobs)",
    comment: "Quick fixes for repairs and installations.",
  },
];

const howItWorks = [
  {
    id: 1,
    image: "/images/list.png",
    headline: "Post a Task",
    remark:
      "Describe what you need help with, from gardening to moving, and set your budget.",
  },
  {
    id: 2,
    image: "/images/user-avatar.png",
    headline: "Choose a Neighbor",
    remark:
      "Browse profiles, ratings, and reviews to pick the best person for the job.",
  },
  {
    id: 3,
    image: "/images/checked.png",
    headline: "Get it Done",
    remark:
      "Relax while the task is completed, then pay securely through the platform.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-10 md:pt-0 overflow-x-hidden">
      {/* Section 1 */}
      <section className="w-full py-30 px-13 bg-[#dc3545] justify-center flex flex-col md:flex-row items-center gap-8 md:px-50">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-white md:text-7xl">
            Find a helpful <br /> neighbor for <br /> any task
          </h1>
          <p className="mb-6 text-2xl">
            From plumbing to cleaning, connect with trusted <br /> locals ready
            to help you get the job done efficiently <br /> and safely.
          </p>
          <div className="flex gap-4">
            <button className="px-3 py-2 bg-white text-black rounded md:px-6">
              Find a Service
            </button>
            <button className="px-3 py-2 border border-white text-white rounded md:px-6">
              Become a Helper
            </button>
          </div>
        </div>

        <img
          src="/images/gardener.jpg"
          alt="Gardener working"
          className="w-[600px] h-[400px] object-cover md:w-1/2 rounded md:object-contain"
        />
      </section>

      {/* Section 2 */}
      <section className="w-full py-30 px-13 bg-[#007bff] flex flex-col item-center text-white md:flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-bold mb-2 bg-white text-black rounded px-2 py-1">
            BENEFITS
          </p>
          <h2 className="text-4xl font-bold mb-8">Why Choose NeighborHire?</h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {chooseUs.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center justify-center text-center"
            >
              <img
                src={item.image}
                alt={item.headline}
                className=" w-10 mx-auto md:mx-0 mb-4 items-center"
              />
              <h3 className="text-2xl font-semibold mb-2">{item.headline}</h3>
              <p className="">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section className="w-full py-30 px-13 bg-white md:px-50">
        <div className="flex flex-row items-center justify-between text-center md:px-40">
          <div className="">
            <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
            <p className="mb-8">Most requested help in your area</p>
          </div>
          <div className="hidden flex-row items-center md:flex">
            <p>
              <a href="#" className="underline mr-2">
                View all Services
              </a>
            </p>
            <img
              src="/images/right-arrow.png"
              alt="arrow right"
              className="h-3"
            />
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <li
              key={service.id}
              className="text-center md:text-center flex flex-col items-center"
            >
              <img
                src={service.image}
                alt={service.job}
                className="w-11 mx-auto md:mx-0 mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{service.job}</h3>
              <small className="block mb-2">{service.rating}</small>
              <p className="max-w-prose text-gray-600 leading-relaxed text-2xl">
                {service.comment}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className="w-full py-30 px-13 bg-gray-100 md:px-50">
        <div className="flex flex-col items-center text-center md:px-50">
          <h2 className="text-3xl font-bold mb-2">How it works</h2>
          <p className="mb-8">Getting help is as easy as 1-2-3</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => (
            <li
              key={step.id}
              className="text-center md:text-center flex flex-col items-center"
            >
              <img
                src={step.image}
                alt={step.headline}
                className=" w-10 mx-auto md:mx-0 mb-4 items-center"
              />
              <h3 className="text-2xl font-semibold mb-2">{step.headline}</h3>
              <p className="text-gray-600">{step.remark}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

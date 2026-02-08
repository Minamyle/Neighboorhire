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
    rating: "4.9 (120+ jobs)",
    comment: "Sparkling clean homes by trusted neighbors",
  },
  {
    id: 2,
    image: "/images/flowers.png",
    job: "Gardening",
    rating: "4.8 (85 jobs)",
    comment: "Lawn mowing, weeding and planting help.",
  },
  {
    id: 3,
    image: "/images/plumber.png",
    job: "Handyman",
    rating: "5.0 (200+ jobs)",
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
      <section className="w-full py-14 px-6 bg-[#dc3545] flex flex-col md:flex-row items-center gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Find a helpful <br /> neighbor for <br /> any task
          </h1>
          <p className="mb-6">
            From plumbing to cleaning, connect with trusted locals ready to help
            you get the job done efficiently and safely.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-black rounded">
              Find a Service
            </button>
            <button className="px-6 py-2 border border-white text-white rounded">
              Become a Helper
            </button>
          </div>
        </div>

        <img
          src="/images/gardener.jpg"
          alt="Gardener working"
          className="w-full md:w-1/2 rounded"
        />
      </section>

      {/* Section 2 */}
      <section className="w-full py-14 px-6 bg-[#007bff] text-white">
        <p className="text-sm mb-2">BENEFITS</p>
        <h2 className="text-3xl font-bold mb-8">Why Choose NeighborHire</h2>

        <ul className="grid gap-6 md:grid-cols-3">
          {chooseUs.map((item) => (
            <li key={item.id} className="text-center md:text-left">
              <img
                src={item.image}
                alt={item.headline}
                className="mx-auto md:mx-0 mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{item.headline}</h3>
              <p className="text-gray-200">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section className="w-full py-14 px-6">
        <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
        <p className="mb-8">Most requested help in your area</p>

        <ul className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <li key={service.id} className="text-center md:text-left">
              <img src={service.image} alt={service.job} className="mb-4" />
              <h3 className="text-2xl font-semibold">{service.job}</h3>
              <small className="block mb-2">{service.rating}</small>
              <p className="text-gray-600">{service.comment}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className="w-full py-14 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-2">How it works</h2>
        <p className="mb-8">Getting help is as easy as 1-2-3</p>

        <ul className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => (
            <li key={step.id} className="text-center md:text-left">
              <img src={step.image} alt={step.headline} className="mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{step.headline}</h3>
              <p className="text-gray-600">{step.remark}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

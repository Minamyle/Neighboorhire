import React from "react";
import { Phone } from "lucide-react";

const Services = () => {
  const services = [
    {
      img: "/images/capentry.jpg",
      heading: "Wood and Furniture Repair",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "View Services",
    },
    {
      img: "/images/plumer.jpg",
      heading: "Plumbing Services",
      description: "Professional plumbing solutions for homes and offices.",
      button: "View Services",
    },
    {
      img: "/images/electricc.jpg",
      heading: "Electrical Repairs",
      description: "Safe and reliable electrical repair services.",
      button: "View Services",
    },
    {
      img: "/images/capentry.jpg",
      heading: "Wood and Furniture Repair",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "View Services",
    },
    {
      img: "/images/cleaning.jpg",
      heading: "Cleaning Services",
      description: "Professional Cleaning solutions for homes and offices.",
      button: "View Services",
    },
    {
      img: "/images/electrical.jpg",
      heading: "Electrical Repairs",
      description: "Safe and reliable electrical repair services.",
      button: "View Services",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-gray-50 justify-center text-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Our Services</h1>

      <p className="max-w-2xl text-gray-600 mb-10">
        We provide trusted home services with professional experts ready to help
        you anytime.
      </p>

      <div className="grid pb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={service.img}
              alt={service.heading}
              className="w-full h-50 object-cover"
            />

            <div className="p-6 text-left">
              <h2 className="text-xl font-semibold mb-2 text-red-500">
                {service.heading}
              </h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className="text-blue-600 font-medium hover:underline">
                {service.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col pl-1 pr-1  pt-8 pb-8 text-center bg-[#007bff] lg:flex-row items-center gap-10 mt-16 w-full max-w-6xl">
        <div className="w-full lg:w-1/2">
          <img
            src="/images/contractor.png"
            alt="contractor"
            className="rounded-xl mt-8 md:mx-auto lg:-mb-8"
          />
        </div>

        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Having a problem? <br /> We'll fix it today!
          </h2>

          <p className="text-white mb-6">
            Our team is ready to assist you quickly and professionally.
          </p>

          <div className="flex flex-col  items-center gap-4 lg:flex-row">
            <p className="font-bold flex gap-1.5 text-white">
              <Phone />
              (234) 231-2123
            </p>
            <span className="text-white">or</span>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

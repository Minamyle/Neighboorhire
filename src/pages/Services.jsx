import React from "react";

// Import the Phone icon from lucide-react for use in the contact section
import { Phone } from "lucide-react";

// Services component that displays available services and a contact section
const Services = () => {
  // Array containing all service data
  // Each object represents one service card displayed on the page
  const services = [
    {
      img: "/images/capentry.jpg", // Image representing the service
      heading: "Wood and Furniture Repair", // Title of the service
      description: "Professional furniture solutions for homes and offices.", // Short description
      button: "View Services", // Text displayed on the button
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
      img: "/images/cobbler-1.jpg",
      heading: "Shoes making and Repair",
      description: "Professional shoe making solution at it best.",
      button: "View Services",
    },
    {
      img: "/images/cleaning.jpg",
      heading: "Cleaning Services",
      description: "Professional Cleaning solutions for homes and offices.",
      button: "View Services",
    },
    {
      img: "/images/images.jpg",
      heading: "Autos Repairs",
      description: "Safe and reliable motor repair services.",
      button: "View Services",
    },
  ];

  return (
    // Main container that centers all content vertically and horizontally
    <div className="flex flex-col w-full min-h-screen items-center bg-gray-50 justify-center text-center px-6 py-12">
      {/* Section title */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Our Services</h1>

      {/* Short introduction explaining the services offered */}
      <p className="max-w-2xl text-gray-600 mb-10">
        We provide trusted home services with professional experts ready to help
        you anytime.
      </p>

      {/* ================= SERVICES GRID ================= */}
      {/* Responsive grid layout for service cards */}
      <div className="grid pb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Loop through the services array and render a card for each service */}
        {services.map((service, index) => (
          <div
            key={index} // unique key for React rendering
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Service image */}
            <img
              src={service.img}
              alt={service.heading}
              className="w-full h-50 object-cover"
            />

            {/* Card content */}
            <div className="p-6 text-left">
              {/* Service title */}
              <h2 className="text-xl font-semibold mb-2 text-red-500">
                {service.heading}
              </h2>

              {/* Service description */}
              <p className="text-gray-600 mb-4">{service.description}</p>

              {/* Button for viewing service details */}
              <button className="text-blue-600 font-medium hover:underline">
                {service.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CONTACT / CTA SECTION ================= */}
      {/* This section encourages users to contact the company if they need help */}
      <div className="flex flex-col pl-1 pr-1 pt-8 pb-8 text-center bg-[#007bff] lg:flex-row items-center gap-10 mt-16 w-full max-w-6xl">
        {/* Left side image showing a contractor */}
        <div className="w-full lg:w-1/2">
          <img
            src="/images/contractor.png"
            alt="contractor"
            className="rounded-xl mt-8 md:mx-auto lg:-mb-8"
          />
        </div>

        {/* Right side content containing text and contact information */}
        <div className="text-center lg:text-left">
          {/* Headline encouraging users to request help */}
          <h2 className="text-3xl font-bold mb-4 text-white">
            Having a problem? <br /> We'll fix it today!
          </h2>

          {/* Supporting message */}
          <p className="text-white mb-6">
            Our team is ready to assist you quickly and professionally.
          </p>

          {/* Contact details and call-to-action button */}
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            {/* Phone contact with icon */}
            <p className="font-bold flex gap-1.5 text-white">
              <Phone />
              (234) 231-2123
            </p>

            {/* Alternative option text */}
            <span className="text-white">or</span>

            {/* Button for requesting a service quote */}
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default Services;

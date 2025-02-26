import React from "react";
import { FaBed, FaUtensils, FaSpa } from "react-icons/fa";

const services = [
  {
    title: "Accommodation",
    icon: <FaBed className="text-4xl text-blue-600 mb-3" />,
    description:
      "We offer luxurious rooms and suites with premium amenities for your comfort.",
  },
  {
    title: "Dining Experience",
    icon: <FaUtensils className="text-4xl text-yellow-600 mb-3" />,
    description:
      "We serve exquisite cuisine across our restaurants with 24-hour room service.",
  },
  {
    title: "Wellness Center",
    icon: <FaSpa className="text-4xl text-green-600 mb-3" />,
    description:
      "We provide spa treatments, fitness facilities, and a swimming pool for relaxation.",
  },
];

const OurServices = () => {
  return (
    <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Our Services
      </h2>
      <div className="h-1 w-20 bg-yellow-400 mx-auto mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              {service.icon}
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;

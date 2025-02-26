import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import {
  FaBed,
  FaTags,
  FaRegCreditCard,
  FaUserShield,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaLanguage,
  FaLock,
  FaUsers,
} from "react-icons/fa";

// ServiceCard Component with Icon
const ServiceCard = ({ title, description, icon }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-600 text-center">{title}</h3>
    <p className="text-gray-600 mt-2 text-center">{description}</p>
  </div>
);

const Services = () => {
  return (
    <React.Fragment>
      <Header />
      <header className="bg-blue-600 text-white py-12 mt-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-3 text-lg">
            Discover the unique offerings of our hotel reservation platform.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        {/* Core Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Core Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Hotel Search & Booking"
              description="Easily search, compare, and book hotels with user-friendly filters."
              icon={<FaBed className="text-4xl text-blue-600" />}
            />
            <ServiceCard
              title="Nearby Hotel Recommendations"
              description="Find the best hotels near your location for convenience."
              icon={<FaMapMarkedAlt className="text-4xl text-yellow-600" />}
            />
            <ServiceCard
              title="Special Deals & Offers"
              description="Enjoy discounts, exclusive packages, and promotional deals."
              icon={<FaTags className="text-4xl text-green-600" />}
            />
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Additional Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Flexible Booking Options"
              description="Book with ease and enjoy hassle-free cancellations or changes."
              icon={<FaRegCreditCard className="text-4xl text-orange-600" />}
            />
            <ServiceCard
              title="Loyalty Programs"
              description="Earn rewards with every booking you make."
              icon={<FaUserShield className="text-4xl text-red-600" />}
            />
            <ServiceCard
              title="Multilingual Support"
              description="Our platform is available in multiple languages for global users."
              icon={<FaLanguage className="text-4xl text-purple-600" />}
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Trusted by Thousands"
              description="We have a track record of satisfied customers worldwide."
              icon={<FaUsers className="text-4xl text-teal-600" />}
            />
            <ServiceCard
              title="Secure Payments"
              description="Your transactions are encrypted and secure."
              icon={<FaLock className="text-4xl text-indigo-600" />}
            />
            <ServiceCard
              title="24/7 Customer Support"
              description="We’re here to help you at any time, day or night."
              icon={<FaPhoneAlt className="text-4xl text-pink-600" />}
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-blue-600 text-white rounded-lg">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Stay?</h2>
          <p className="text-lg mb-6">Start exploring the best hotels now!</p>
          <a
            href="#"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Book Now
          </a>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Services;

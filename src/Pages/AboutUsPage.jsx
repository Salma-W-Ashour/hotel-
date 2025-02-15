import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import classNames from "classnames";
import { FaBed, FaRegStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// مكون إحصائيات
const Statistic = ({ icon, count, label }) => (
  <div className="text-center p-6 rounded-lg text-yellow-400 hover:text-white hover:bg-yellow-400 transition duration-300 ease-in-out">
    {icon}
    <div className="text-4xl font-bold">{count}</div>
    <div className="mt-2">{label}</div>
  </div>
);

// مكون خدمة
const ServiceCard = ({ service, index }) => (
  <div
    className={classNames(
      "text-center p-8 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105",
      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
    )}
  >
    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
      <img
        src={`imgs/${service.icon}`}
        alt={`${service.title} Icon`}
        className="w-8 h-8"
      />
    </div>
    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
    <p className="text-gray-600">{service.description}</p>
  </div>
);

const About = () => {
  const services = [
    {
      icon: "home (1).png",
      title: "Luxury Accommodations",
      description:
        "Experience world-class comfort in our carefully designed rooms and suites.",
    },
    {
      icon: "clock.png",
      title: "24/7 Service",
      description:
        "Round-the-clock support to ensure your stay is perfect at every moment.",
    },
    {
      icon: "icons8-checkmark-100.png",
      title: "Best Price Guarantee",
      description: "We promise the best rates for your luxury stay experience.",
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="relative text-white py-20 pt-20">
        <img
          src="imgs/PLS+copia.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <div className="relative z-20 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">About Us</h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Enjoy a luxurious stay at our hotel where comfort and elegance blend
            seamlessly with exceptional service. We offer stylish rooms with
            breathtaking views, 24/7 customer service, and exclusive deals
            tailored to meet your every need. Book your room now and experience
            an unforgettable stay!
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="bg-gray-100 shadow-lg overflow-hidden mb-10 md:mb-0 relative rounded xl:rounded-tl-none xl:rounded-bl-none">
            <img
              src="imgs/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg"
              alt="Luxury Hotel Room"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          </div>

          <div className="w-full md:w-1/2 h-full px-4 md:px-10 flex flex-col justify-center relative z-20">
            <h1 className="text-4xl font-bold mb-4">
              Experience Luxury Living!
            </h1>
            <ul className="space-y-4 text-lg">
              {[
                // { icon: <FaBed />, text: "Premium Room Service" },
                // { icon: <FaClock />, text: "24/7 Concierge Support" },
                // { icon: <FaRegStar />, text: "Luxury Amenities" },
                {
                  icon: (
                    <img
                      src="imgs/icons8-premium-100.png"
                      alt="Premium Room Service Icon"
                      class="mr-2 w-6 h-6"
                    />
                  ),
                  text: "Premium Room Service",
                },
                {
                  icon: (
                    <img
                      src="imgs/clock.png"
                      alt="Concierge Support Icon"
                      class="mr-2 w-6 h-6"
                    />
                  ),
                  text: "24/7 Concierge Support",
                },
                {
                  icon: (
                    <img
                      src="imgs/sparkles.509x512.png"
                      alt="Luxury Amenities Icon"
                      class="mr-2 w-6 h-6"
                    />
                  ),
                  text: "Luxury Amenities",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center transition-all duration-300 ease-in-out transform hover:scale-[1.05] hover:text-yellow-400"
                >
                  {item.icon}
                  <span className="ml-2">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 bg-blue-900 py-8 px-8">
        {[
          {
            icon: <FaBed className="text-4xl mb-2 text-white" />,
            count: "500+",
            label: "Premium Rooms",
          },
          {
            icon: <FaRegStar className="text-4xl mb-2 text-white" />,
            count: "4.8",
            label: "Guest Rating",
          },
          {
            icon: <FaMapMarkerAlt className="text-4xl mb-2 text-white" />,
            count: "50+",
            label: "Locations",
          },
          {
            icon: <FaClock className="text-4xl mb-2 text-white" />,
            count: "15+",
            label: "Years Experience",
          },
        ].map((stat, index) => (
          <Statistic key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-10 px-4">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default About;

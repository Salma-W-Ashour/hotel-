import React from "react";
import { motion } from "framer-motion";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { useAuth } from "../context/AuthContext";
import {
  FaBed,
  FaRegStar,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
} from "react-icons/fa";
import {
  IoSparklesSharp,
  IoCheckmarkCircle,
  IoTime,
  IoMedal,
} from "react-icons/io5";

// Animation configurations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const Statistic = ({ icon, count, label }) => (
  <motion.div
    variants={slideUp}
    className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group"
  >
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-4xl text-amber-400 group-hover:text-amber-300">
        {icon}
      </div>
      <div className="text-5xl font-bold text-white">{count}</div>
      <div className="text-lg font-medium text-amber-100">{label}</div>
    </div>
  </motion.div>
);

const ServiceCard = ({ service, index }) => (
  <motion.div
    variants={slideUp}
    className="relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-amber-400 rounded-2xl flex items-center justify-center mb-6">
        {service.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  </motion.div>
);

const FAQAccordion = ({ questions }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="my-20 px-6 py-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {questions.map((q, index) => (
          <motion.div
            key={index}
            variants={slideUp}
            className="group bg-white/90 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white"
          >
            <details className="cursor-pointer">
              <summary className="flex items-center justify-between p-6 text-xl font-semibold text-gray-800 group-open:text-amber-600">
                {q.question}
                <FaChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-amber-500" />
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-100">
                {q.answer}
              </div>
            </details>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => {
  const { user } = useAuth();

  const services = [
    {
      icon: <IoSparklesSharp className="w-10 h-10 text-white" />,
      title: "Luxury Accommodations",
      description:
        "Experience world-class comfort in our meticulously designed rooms and suites with premium amenities.",
    },
    {
      icon: <IoTime className="w-10 h-10 text-white" />,
      title: "24/7 Service",
      description:
        "Round-the-clock concierge service ensuring your every need is met with precision and care.",
    },
    {
      icon: <IoCheckmarkCircle className="w-10 h-10 text-white" />,
      title: "Best Price Guarantee",
      description:
        "Enjoy exclusive rates with our price match promise for unmatched value.",
    },
  ];

  const faqQuestions = [
    {
      question: "What are the check-in/check-out times?",
      answer:
        "Check-in is available from 3:00 PM, and check-out is until 12:00 PM. Late check-out available upon request.",
    },
    {
      question: "Do you offer room service?",
      answer:
        "Enjoy 24/7 gourmet room service with our award-winning culinary team.",
    },
    {
      question: "How can I modify my booking?",
      answer:
        "Manage reservations directly through our portal or contact our support team for assistance.",
    },
  ];

  return (
    <React.Fragment>
      <Header />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="relative h-[600px] flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="imgs/PLS+copia.jpg"
            alt="Luxury hotel interior"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
        </div>

        <motion.div
          variants={fadeIn}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Redefining Luxury Hospitality
          </h1>
          <div className="h-1.5 w-24 bg-amber-400 mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            At the pinnacle of luxury accommodation, we blend timeless elegance
            with modern innovation to create unforgettable experiences. Discover
            a world where every detail is crafted to perfection.
          </p>
        </motion.div>
      </motion.section>

      {/* Image + Text Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
          <motion.div
            variants={slideUp}
            className="w-full md:w-1/2 h-96 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="imgs/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg"
              alt="Hotel Facilities"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            variants={slideUp}
            className="w-full md:w-1/2 px-4 md:px-8 flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Exceptional Amenities & Services
            </h2>
            <ul className="space-y-4 text-lg">
              {[
                "24/7 concierge service",
                "Premium spa facilities",
                "Gourmet dining experiences",
                "State-of-the-art fitness center",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={slideUp}
                  className="flex items-center transition-all duration-300 ease-in-out transform hover:translate-x-2"
                >
                  <IoCheckmarkCircle className="text-amber-500 mr-2 text-xl" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Statistics Grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="py-20 bg-gradient-to-br from-blue-900 to-blue-800"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            {
              icon: <FaBed className="w-12 h-12" />,
              count: "500+",
              label: "Premium Suites",
            },
            {
              icon: <IoMedal className="w-12 h-12" />,
              count: "4.9",
              label: "Guest Rating",
            },
            {
              icon: <FaMapMarkerAlt className="w-12 h-12" />,
              count: "50+",
              label: "Global Locations",
            },
            {
              icon: <FaClock className="w-12 h-12" />,
              count: "15+",
              label: "Years Excellence",
            },
          ].map((stat, index) => (
            <Statistic key={index} {...stat} />
          ))}
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={slideUp}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Unmatched Hospitality Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {user && (
        <motion.section
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4"
        >
          <FAQAccordion questions={faqQuestions} />
        </motion.section>
      )}

      <Footer />
    </React.Fragment>
  );
};

export default About;

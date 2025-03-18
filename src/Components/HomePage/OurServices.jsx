import React from "react";
import { motion } from "framer-motion";
import { FaBed, FaUtensils, FaSpa, FaChevronRight } from "react-icons/fa";

const services = [
  {
    title: "Luxury Accommodation",
    icon: <FaBed />,
    description:
      "Experience premium comfort in our elegantly designed rooms and suites with smart amenities.",
    color: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      gradientFrom: "from-blue-400",
      gradientTo: "to-blue-600",
      hoverText: "text-blue-700",
    },
  },
  {
    title: "Gourmet Dining",
    icon: <FaUtensils />,
    description:
      "Savor world-class cuisine crafted by award-winning chefs in our themed restaurants.",
    color: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-yellow-600",
      hoverText: "text-yellow-700",
    },
  },
  {
    title: "Wellness Retreat",
    icon: <FaSpa />,
    description:
      "Rejuvenate with holistic spa treatments and state-of-the-art fitness facilities.",
    color: {
      bg: "bg-green-100",
      text: "text-green-600",
      gradientFrom: "from-green-400",
      gradientTo: "to-green-600",
      hoverText: "text-green-700",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const OurServices = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            Exclusive Services
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            // className="h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 w-32 mx-auto rounded-full"
            className="h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 w-32 mx-auto rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative space-y-6 text-center">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: [0, -10, 8, -5, 0] }}
                  className={`inline-block p-5 rounded-2xl ${service.color.bg} ${service.color.text} group-hover:${service.color.hoverText} transition-all duration-300`}
                >
                  <service.icon.type className="text-4xl" />
                </motion.span>

                <h3 className="text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                <motion.div
                  whileHover={{ x: 5 }}
                  className={`inline-flex items-center ${service.color.text} font-medium cursor-pointer`}
                >
                  <span>Learn More</span>
                  <FaChevronRight className="ml-2 text-sm" />
                </motion.div>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color.gradientFrom} ${service.color.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurServices;

import React from "react";
import { motion } from "framer-motion";
import HotelCard from "./HotelCard";

const rooms = [
  {
    roomNum: "Luxury Suite",
    description:
      "Spacious suite with panoramic city views and premium amenities",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "Executive Room",
    description: "Modern design with dedicated workspace and smart controls",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "Family Apartment",
    description: "Two-bedroom unit with kitchenette and play area",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "Honeymoon Package",
    description: "Romantic retreat with champagne service and spa access",
    img: "imgs/bedroom-5664221_640.jpg",
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
  hidden: { y: 50, opacity: 0 },
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

const CardsLayout = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Exclusive Offers
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 w-32 mx-auto rounded-full"
          />
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Discover our curated collection of premium accommodations with
            guaranteed best rates and exclusive member benefits
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
        >
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="w-full"
            >
              <HotelCard
                roomNum={room.roomNum}
                description={room.description}
                img={room.img}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="group flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Rooms
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CardsLayout;

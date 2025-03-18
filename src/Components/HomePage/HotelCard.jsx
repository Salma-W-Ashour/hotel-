import React from "react";
import { motion } from "framer-motion";
import {
  FaBed,
  FaWifi,
  FaSwimmingPool,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

const HotelCard = ({ roomNum, description, img }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative group max-w-sm rounded-xl overflow-hidden shadow-2xl bg-white transform transition-all duration-300"
    >
      {/* Image Section with Overlay */}
      <div className="relative overflow-hidden">
        <motion.img
          className="w-full h-48 object-cover rounded-t-xl"
          src={img}
          alt="Hotel Room"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">
            Best Value
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-bold text-2xl text-gray-800">{roomNum}</h2>
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex gap-3 mb-4 text-blue-900">
          <div className="flex items-center gap-1">
            <FaBed className="w-5 h-5" />
            <span className="text-sm">King Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <FaWifi className="w-5 h-5" />
            <span className="text-sm">WiFi</span>
          </div>
          <div className="flex items-center gap-1">
            <FaSwimmingPool className="w-5 h-5" />
            <span className="text-sm">Pool</span>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-base mb-4 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-blue-900">$299</span>
          <span className="text-gray-500">/ night</span>
        </div>

        {/* Book Button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-yellow-400 hover:to-yellow-300 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          href="#"
        >
          Book Now
          <FaChevronRight className="transform group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-20 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45" />
      </div>
    </motion.div>
  );
};

export default HotelCard;

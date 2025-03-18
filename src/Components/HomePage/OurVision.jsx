import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const OurVision = ({ handleBookNow, user }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('imgs/OIP.jpeg')",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <motion.div
        className="relative flex items-center justify-center min-h-screen text-center px-6 py-24"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.3, delayChildren: 0.4 },
          },
        }}
      >
        <div className="z-10 max-w-4xl">
          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
          >
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Crafting Memories
            </span>{" "}
            <br className="hidden md:block" />
            Through Shared Adventures
          </motion.h1>

          <motion.div
            variants={textVariants}
            className="h-1 w-32 bg-yellow-400 mx-auto mb-8 rounded-full"
          />

          <motion.p
            variants={textVariants}
            className="text-lg sm:text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto leading-relaxed text-gray-300"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            Experience bespoke luxury escapes for couples and families, blending
            exhilarating activities with serene private retreats in nature's
            embrace.
          </motion.p>

          <motion.div variants={textVariants}>
            <motion.button
              onClick={handleBookNow}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              className="group bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-blue-700 hover:to-blue-600 text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <span className="mr-3">
                {user ? "Explore Resorts" : "Begin Journey"}
              </span>
              <FaChevronRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400 rounded-full"
            style={{
              width: "4px",
              height: "4px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default OurVision;

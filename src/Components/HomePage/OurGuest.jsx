import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaChevronRight, FaCrown, FaGem } from "react-icons/fa";

const OurGuest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    navigate(user ? "/hotels" : "/sign-up");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-2xl p-6 md:p-12 mx-auto mt-16 max-w-7xl"
      whileHover={{ scale: 1.005 }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTAgMzJIMzJWNjRIMFYzMnpNMzIgMEg2NFYzMkgzMlYweiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-10" />

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="imgs/pexels-thorsten-technoman-109353-338504.jpg"
            alt="Luxury experience"
            className="rounded-xl w-full h-[400px] object-cover shadow-xl"
          />
          <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
            <FaGem className="text-3xl text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <FaCrown className="text-3xl text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Exclusive Benefits
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed"
          >
            As a valued member, enjoy instant recognition across our global
            network. Earn DISCOVERY Dollars (D$), access premium experiences,
            and unlock local adventures from your very first interaction with
            any GHA property.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{user ? "Explore Properties" : "Unlock Privileges"}</span>
              <FaChevronRight className="transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 mt-6 text-blue-900"
          >
            <div className="p-4 bg-white rounded-xl shadow-md">
              <h3 className="font-bold text-lg">Instant Rewards</h3>
              <p className="text-sm">From first interaction</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md">
              <h3 className="font-bold text-lg">Global Access</h3>
              <p className="text-sm">800+ properties</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-400 rounded-full"
          style={{
            width: "6px",
            height: "6px",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default OurGuest;

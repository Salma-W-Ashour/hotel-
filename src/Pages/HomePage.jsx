import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { FaArrowUp, FaCrown, FaRegGem } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import enhanced components
import CardsLayout from "../Components/HomePage/CardsLayout";
import Header from "../Components/Layout/Header";
import OurGuest from "../Components/HomePage/OurGuest";
import OurServices from "../Components/HomePage/OurServices";
import OurVision from "../Components/HomePage/OurVision";
import Footer from "../Components/Layout/Footer";

const Advantage = ({ imgSrc, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-4 p-4 bg-blue-50 rounded-full">
        <img
          src={imgSrc}
          alt={title}
          className="w-16 h-16 object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </motion.div>
  );
};

const advantages = [
  {
    imgSrc: "imgs/jar.png",
    title: "Smart Savings",
    description: "Earn booking credits through referrals and wallet rewards",
  },
  {
    imgSrc: "imgs/deal.png",
    title: "Premium Deals",
    description: "Access members-only offers and seasonal promotions",
  },
  {
    imgSrc: "imgs/discount (1).png",
    title: "Elite Discounts",
    description: "Exclusive rates for loyal members and repeat guests",
  },
  {
    imgSrc: "imgs/clock.png",
    title: "Instant Booking",
    description: "One-click reservations with saved preferences",
  },
  {
    imgSrc: "imgs/online.png",
    title: "Digital Convenience",
    description: "Manage bookings and invoices through our portal",
  },
];

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!user) {
      toast.info("Sign in to access exclusive booking benefits", {
        position: "top-right",
        autoClose: 3000,
        className: "toast-message",
      });
      setTimeout(() => navigate("/sign-in"), 3000);
    } else {
      navigate("/hotels");
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer
        toastClassName="toast-container"
        progressClassName="toast-progress"
      />

      <Header />

      <main className="overflow-hidden">
        <OurVision handleBookNow={handleBookNow} user={user} />

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Membership Benefits
                </span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 w-32 mx-auto rounded-full"
              />
              <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
                Unlock premium features and exclusive rewards with our loyalty
                program
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {advantages.map((adv, index) => (
                <Advantage key={index} index={index} {...adv} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-16"
            >
              <button className="group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <FaCrown className="text-xl" />
                Join Elite Club
                <FaRegGem className="transform group-hover:rotate-180 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <CardsLayout />
            <OurGuest />
            <OurServices />
          </div>
        </section>
      </main>

      {/* <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <FaArrowUp className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence> */}

      <Footer />
    </div>
  );
};

export default HomePage;

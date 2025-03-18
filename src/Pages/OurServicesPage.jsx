import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
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

// Animation variants
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

// Enhanced ServiceCard Component
const ServiceCard = ({ title, description, icon, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="offscreen"
      animate={isInView ? "onscreen" : "offscreen"}
      variants={cardVariants}
      className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div
          className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center ${color} text-white`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Hotel Search & Booking",
      description:
        "Advanced search with real-time availability checks and instant confirmation",
      icon: <FaBed className="text-2xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Smart Recommendations",
      description:
        "AI-powered suggestions based on your preferences and history",
      icon: <FaMapMarkedAlt className="text-2xl" />,
      color: "bg-emerald-500",
    },
    {
      title: "Exclusive Deals",
      description: "Member-only discounts and flash sales updated hourly",
      icon: <FaTags className="text-2xl" />,
      color: "bg-amber-500",
    },
    {
      title: "Flexible Payments",
      description:
        "Multiple payment options including crypto and installment plans",
      icon: <FaRegCreditCard className="text-2xl" />,
      color: "bg-violet-500",
    },
    {
      title: "Premium Security",
      description: "Military-grade encryption for all transactions and data",
      icon: <FaUserShield className="text-2xl" />,
      color: "bg-rose-500",
    },
    {
      title: "Global Support",
      description: "24/7 multilingual assistance in 15+ languages",
      icon: <FaLanguage className="text-2xl" />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow"
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-emerald-600 pt-32 pb-24 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Premium Hospitality Services
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Experience next-generation hotel booking with AI-powered features
              and exclusive benefits
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </motion.div>
        </section>

        {/* Value Proposition */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Why We Stand Out
              </h2>
              <p className="text-slate-600 text-lg">
                Our platform combines cutting-edge technology with unparalleled
                hospitality expertise
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time price monitoring",
                  "Virtual hotel tours",
                  "Personalized travel planner",
                  "Sustainability filters",
                  "Group booking management",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden"
            >
              <img
                src="/imgs/innovative_features.png"
                alt="Futuristic Hotel Booking"
                className="w-full h-auto object-contain rounded-xl mb-6 shadow-md" // h-64 w-[500px] h-[300px]
              />
              {/* <div className="aspect-video bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl mb-6" /> */}
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Innovative Features
              </h3>
              <p className="text-slate-600">
                Experience our interactive map view, augmented reality previews,
                and smart itinerary builder - all designed to revolutionize your
                travel planning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots-slate-500/30" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join millions of travelers enjoying stress-free bookings and
                exclusive rewards
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-emerald-600 transition-colors"
              >
                Explore Premium Hotels →
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Services;

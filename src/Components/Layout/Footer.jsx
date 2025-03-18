import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 opacity-5 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto py-16 px-6 md:px-12 relative z-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 text-center lg:text-left"
        >
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                BookIn
              </span>
            </motion.div>
            <p className="text-gray-300 leading-relaxed">
              Redefining luxury hospitality through exceptional experiences and
              unparalleled service excellence.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5 }}
                  className="p-2 bg-blue-800 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Explore</h4>
            <ul className="space-y-3 text-gray-300">
              {["Rooms", "Dining", "Spa", "Gallery"].map((link, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors justify-center lg:justify-start"
                  >
                    <FaChevronRight className="text-xs" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Connect</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaMapMarkerAlt />
                <span>123 Luxury Avenue, Hospitality City</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaPhoneAlt />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaEnvelope />
                <span>info@bookinluxury.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="text-xl font-bold mb-4">Luxury Updates</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to receive exclusive offers and premium content
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-blue-800 border border-blue-700 focus:outline-none focus:border-yellow-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-8 right-8 p-4 bg-yellow-400 text-blue-900 rounded-full shadow-xl hover:shadow-2xl transition-all z-20"
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      </div>

      {/* Copyright */}
      {/* <div className="container mx-auto py-6 text-center text-gray-400 border border-red-500"> */}
      <div className="border-t border-blue-800 relative z-10 w-full">
        <div className="container mx-auto py-6 text-center text-gray-400 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 w-full max-w-screen-xl mx-auto">
            <div className="w-full md:w-auto">
              © {new Date().getFullYear()} BookIn. All rights reserved.
            </div>
            <div className="flex gap-6 w-full md:w-auto justify-center md:justify-start">
              <Link to="/privacy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-yellow-400">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

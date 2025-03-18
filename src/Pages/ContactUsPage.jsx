import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formik configuration
  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      message: Yup.string()
        .min(20, "Minimum 20 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitted(true);

        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));

        const messages =
          JSON.parse(localStorage.getItem("contactMessages")) || [];
        const newMessage = {
          id: Date.now(),
          ...values,
          status: "new",
          createdAt: new Date().toISOString(),
          replies: [],
        };

        // Save form data to localStorage
        // localStorage.setItem("contactForm", JSON.stringify(values));

        localStorage.setItem(
          "contactMessages",
          JSON.stringify([...messages, newMessage])
        );

        // Show success toast
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetForm();
        setIsSubmitted(true);
      } catch (error) {
        toast.error("Failed to send message", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    },
  });

  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Luxury Hotel"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 text-center text-white px-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
              Contact Us
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              className="h-1 bg-amber-500 mx-auto mb-8 rounded-full"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto font-light">
              Experience seamless communication with our luxury concierge team
            </p>
            <Link
              to="/support-tickets"
              className="mt-6 inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition"
            >
              Go to Support Tickets
            </Link>
          </motion.div>
        </motion.section>

        {/* Contact Grid */}
        <section className="relative z-10 -mt-32 px-4 sm:px-6">
          <div className="container mx-auto grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <div className="p-3 md:p-4 bg-amber-500 rounded-xl">
                  <FiSend className="text-2xl md:text-3xl text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Send Message
                </h2>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 md:space-y-8"
              >
                {/* Form fields */}
                <div className="space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <label className="block text-slate-600 mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      name="name"
                      className="w-full p-3 md:p-4 border-2 rounded-lg focus:outline-none focus:border-amber-500 transition"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                        <FaCheckCircle /> {formik.errors.name}
                      </p>
                    )}
                  </motion.div>

                  {/* Repeat similar structure for email and message fields */}

                  {/* Email Field */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-slate-600 mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="w-full p-3 md:p-4 border-2 rounded-lg focus:outline-none focus:border-amber-500 transition"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                        <FaCheckCircle /> {formik.errors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-slate-600 mb-2 font-medium">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      className="w-full p-3 md:p-4 border-2 rounded-lg focus:outline-none focus:border-amber-500 transition"
                      {...formik.getFieldProps("message")}
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                        <FaCheckCircle /> {formik.errors.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-amber-500 text-white py-3 md:py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  {formik.isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <FaPaperPlane className="text-xl" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 text-white"
            >
              <div className="space-y-8 md:space-y-12">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-400">
                  Contact Info
                </h2>

                {/* Contact details */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-amber-500/20 rounded-lg">
                      <FaMapMarkerAlt className="text-xl md:text-2xl text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1">
                        Our Headquarters
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base">
                        123 Luxury Avenue
                      </p>
                      <p className="text-slate-300 text-sm md:text-base">
                        Marina Bay, Singapore 098765
                      </p>
                    </div>
                  </div>
                  {/* Repeat for phone and email */}

                  {/* Phone Section */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-amber-500/20 rounded-lg">
                      <FaPhone className="text-xl md:text-2xl text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1">
                        Phone Numbers
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base">
                        +65 6123 4567 (Main)
                      </p>
                      <p className="text-slate-300 text-sm md:text-base">
                        +65 6878 9012 (24/7 Support)
                      </p>
                    </div>
                  </div>
                  {/* Email Section */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-amber-500/20 rounded-lg">
                      <FaEnvelope className="text-xl md:text-2xl text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1">
                        Email Addresses
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base">
                        reservations@luxuryhotel.com
                      </p>
                      <p className="text-slate-300 text-sm md:text-base">
                        support@luxuryhotel.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div className="pt-6 md:pt-8 border-t border-slate-700">
                  <h3 className="text-base md:text-lg font-bold mb-4 text-amber-400">
                    Follow Us
                  </h3>
                  <div className="flex gap-4 md:gap-6">
                    {/* Social media icons */}
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="#"
                      className="p-3 bg-slate-700 rounded-lg hover:bg-amber-500 transition"
                    >
                      <FaInstagram className="text-2xl" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="#"
                      className="p-3 bg-slate-700 rounded-lg hover:bg-amber-500 transition"
                    >
                      <FaFacebookF className="text-2xl" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="#"
                      className="p-3 bg-slate-700 rounded-lg hover:bg-amber-500 transition"
                    >
                      <FaTwitter className="text-2xl" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px] md:h-[500px]">
            <iframe
              title="Hotel Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.797825676327!2d103.85839431475398!3d1.295514999054797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1904937e1633%3A0x62099677b59fca76!2sMarina%20Bay%20Sands!5e0!3m2!1sen!2ssg!4v1658901234567!5m2!1sen!2ssg"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="container mx-auto px-4 sm:px-6 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -right-40 -bottom-40 w-64 h-64 bg-white/10 rounded-full" />

            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Luxury Updates
              </h2>
              <p className="text-amber-100 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
                Subscribe to receive exclusive offers, VIP access, and curated
                luxury experiences
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  if (!/\S+@\S+\.\S+/.test(email)) {
                    toast.error("Please enter a valid email address");
                    return;
                  }
                  toast.success(
                    "Successfully subscribed! Welcome to our luxury community"
                  );
                  e.target.reset();
                }}
                className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-3 md:p-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-amber-100 focus:outline-none focus:border-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-white text-amber-600 px-6 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe Now
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
        {/* Toast Notifications Container - Add at root level */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;

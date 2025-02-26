import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  FaPhone,
  FaFax,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Contact = () => {
  // Formik Setup
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      message: Yup.string().required("Message cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Message Sent Successfully!");
        resetForm();
        setIsSubmitting(false);
      }, 1000);
      // Perform action after form submission (e.g., send message to API)
    },
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }
    setMessage("✅ Subscription successful! Thank you for joining.");
    setEmail(""); // Clear input after submission
  };

  return (
    <React.Fragment>
      <Header />

      {/* Banner Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('imgs/room-interior-hotel-bedroom_23-2150683421.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-5xl text-white text-4xl font-bold mb-6">
              Contact Us
            </h2>
            <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          {/* Form */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg animate-fadeIn">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Love to hear from you. Get in touch!
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-gray-700 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition"
                  placeholder="Your Name"
                  {...formik.getFieldProps("name")}
                  // autoFocus
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm" aria-live="assertive">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-gray-700 font-medium"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm" aria-live="assertive">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-gray-700 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition"
                  {...formik.getFieldProps("message")}
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-sm" aria-live="assertive">
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-blue-900 text-white px-5 py-3 rounded-md hover:bg-yellow disabled:opacity-50 flex items-center justify-center text-lg font-semibold transition duration-300 ${
                  formik.isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-400 hover:text-black"
                }`}
                disabled={isSubmitting || !formik.isValid}
                aria-busy={isSubmitting}
              >
                {formik.isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info Section with Image */}
          <div className="w-full md:w-1/2">
            <img
              src="imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg"
              alt="Hotel Room"
              className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Map (Larger Column) */}
          <div className="md:col-span-2 relative">
            <iframe
              title="Google Map Location"
              className="w-full h-80 rounded-lg shadow-lg border border-gray-300"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508576!2d144.95373631531577!3d-37.81627977975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df8f18d71%3A0x2b2f3b153c64e621!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1633072801604!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            {/* Button to open map */}
            <a
              href="https://www.google.com/maps?q=Melbourne,Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-yellow-500 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 hover:bg-blue-900 transition"
            >
              View on Google Maps <FaExternalLinkAlt />
            </a>
          </div>

          {/* Contact Info (Smaller Column) */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500" /> Info & Locations
            </h3>

            <div className="space-y-3 text-gray-600 text-sm md:text-base">
              <p className="flex items-center gap-2">
                <FaClock className="text-blue-500" />{" "}
                <span>Open Hours: Monday – Sunday</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-green-500" />{" "}
                <span>Telephone: +12345678999</span>
              </p>
              <p className="flex items-center gap-2">
                <FaFax className="text-gray-500" />{" "}
                <span>Fax: +12345678999</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />{" "}
                <span>Email: BookIn@email.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive the latest updates and offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-white px-6 py-3 rounded hover:bg-blue-900 transition-all"
            >
              📩 Subscribe
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default Contact;

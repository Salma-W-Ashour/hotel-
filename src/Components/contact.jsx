import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
  console.log("Text");
  return (
    <>
      <Header />
      <section
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            " url('imgs/room-interior-hotel-bedroom_23-2150683421.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Contact Us</h1>
        </div>
      </section>

      {
        //Contact Form Section
      }
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
          {
            // Form
          }
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Love to hear from you. Get in touch!
            </h2>
            <form className="space-y-7">
              <div>
                <label for="name" className="block text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div>
                <label for="email" className="block text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div>
                <label for="message" className="block text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                ></textarea>
              </div>
              <button className="bg-blue-900 text-white px-56 py-3 rounded hover:bg-yellow-400 items-center justify-center">
                Send Message
              </button>
            </form>
          </div>

          {
            // Info Section
          }
          <div className="space-y-6">
            <img
              src="imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg"
              alt="Hotel Room"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {
        // Map Section
      }
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509384!2d-122.4210137!3d37.7792808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c622d1d2b%3A0x3a5041430f740a64!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1616460569239!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
          ></iframe> */}

          <div>
            <h3 className="text-xl font-semibold mb-3">Info & Locations</h3>
            <p>Open Hours: Monday – Sunday</p>
            <p>Telephone: +12345678999</p>
            <p>Fax: +12345678999</p>
            <p>Email: BookIn@email.com</p>
          </div>
        </div>
      </section>

      {
        // Newsletter Section
      }
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Join Our Newsletter</h2>
          <form className="flex justify-center space-x-4">
            <input
              type="email"
              placeholder="Enter your mail"
              className="w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-white px-6 py-3 rounded hover:bg-blue-900">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

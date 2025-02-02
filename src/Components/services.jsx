import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Services() {
  return (
    <>
      <Header />
      <header class="bg-blue-600 text-white py-10 mt-20">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl font-bold">Our Services</h1>
          <p class="mt-2 text-lg">
            Explore what makes our hotel reservation platform unique.
          </p>
        </div>
      </header>

      <main class="container mx-auto py-10 px-4">
        {
          //<!-- Core Services Section -->
        }
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Core Services</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Hotel Search and Booking
              </h3>
              <p class="text-gray-600 mt-2">
                Easily search, compare, and book hotels with user-friendly
                filters.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Nearby Hotel Recommendations
              </h3>
              <p class="text-gray-600 mt-2">
                Find the best hotels near your location for convenience.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Special Deals and Offers
              </h3>
              <p class="text-gray-600 mt-2">
                Enjoy discounts, exclusive packages, and promotional deals.
              </p>
            </div>
          </div>
        </section>

        {
          // <!-- Additional Features Section -->
        }
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Additional Features
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Flexible Booking Options
              </h3>
              <p class="text-gray-600 mt-2">
                Book with ease and enjoy hassle-free cancellations or changes.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Loyalty Programs
              </h3>
              <p class="text-gray-600 mt-2">
                Earn rewards with every booking you make.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Multilingual Support
              </h3>
              <p class="text-gray-600 mt-2">
                Our platform is available in multiple languages for global
                users.
              </p>
            </div>
          </div>
        </section>

        {
          //<!-- Why Choose Us Section -->
        }
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Trusted by Thousands
              </h3>
              <p class="text-gray-600 mt-2">
                We have a track record of satisfied customers worldwide.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                Secure Payments
              </h3>
              <p class="text-gray-600 mt-2">
                Your transactions are encrypted and secure.
              </p>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h3 class="text-xl font-semibold text-blue-600">
                24/7 Customer Support
              </h3>
              <p class="text-gray-600 mt-2">
                We’re here to help you at any time, day or night.
              </p>
            </div>
          </div>
        </section>

        {
          // <!-- Call to Action -->
        }
        <section class="text-center py-10 bg-blue-600 text-white rounded-lg">
          <h2 class="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p class="text-lg mb-6">Start exploring the best hotels now!</p>
          <a
            href="#"
            class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100"
          >
            Book Now
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

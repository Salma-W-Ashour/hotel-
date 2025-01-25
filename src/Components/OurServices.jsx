import React from "react";

export default function OurServices() {
  return (
    <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Accommodation</h3>
          <p>
            We offer luxurious rooms and suites with premium amenities for your
            comfort.
          </p>
        </div>
        <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Dining Experience</h3>
          <p>
            We serve exquisite cuisine across our restaurants with 24-hour room
            service.
          </p>
        </div>
        <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Wellness Center</h3>
          <p>
            We provide spa treatments, fitness facilities, and a swimming pool
            for relaxation.
          </p>
        </div>
      </div>
    </section>
  );
}

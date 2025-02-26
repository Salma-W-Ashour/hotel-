import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold mb-4">About Our Company</h4>
            <p className="text-gray-300">
              Luxury accommodations for discerning travelers seeking the finest
              in comfort and service.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Opening Hours</h4>
            <p className="text-gray-300">24/7 - Always Open</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 pl-4">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Rooms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Booking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Location
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <button className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 hover:scale-105 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto py-4 text-center text-gray-300">
          Copyright © 2025 BookIn. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

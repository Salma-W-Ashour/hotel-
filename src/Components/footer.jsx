import React from "react";

export default function footer() {
  return (
    <footer class="bg-blue-900 text-white">
      <div class="container mx-auto py-12 px-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 class="text-xl font-bold mb-4">About Our Company</h4>
            <p class="text-gray-400">
              Luxury accommodations for discerning travelers seeking the finest
              in comfort and service.
            </p>
          </div>
          <div>
            <h4 class="text-xl font-bold mb-4">Opening Hours</h4>
            <p class="text-gray-400">24/7 - Always Open</p>
          </div>
          <div>
            <h4 class="text-xl font-bold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li>
                <a href="#" class="hover:text-yellow-400">
                  Rooms
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-yellow-400">
                  Booking
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-yellow-400">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-yellow-400">
                  Location
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-xl font-bold mb-4">Contact Us</h4>
            <button class="bg-yellow-400 text-navy-800 px-6 py-2 rounded-lg hover:bg-yellow-500">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800">
        <div class="container mx-auto py-4 text-center text-gray-400">
          Copyright © 2025 BookIn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React from "react";

export default function Header() {
  return (
    <nav class="absolute top-0 left-0 right-0 z-10 bg-transparent text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold text-blue-900 w-1/4">
          <a href="#">BookIn</a>
        </div>

        <div class="flex justify-center space-x-8 w-2/4">
          <a
            href="home.html"
            class="border-b-4 rounded-md border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="about.html"
            class="border-b-4 border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            class="border-b-4 border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          >
            Hotels
          </a>
          <a
            href="#"
            class="border-b-4 border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          >
            Blog
          </a>
          <a
            href="#"
            class="border-b-4 border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        <div class="flex justify-end w-1/4">
          <button class="bg-blue-900 text-white-800 px-6 py-2 rounded-lg hover:bg-yellow-400">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

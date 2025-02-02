import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Hotels() {
  return (
    <>
      <Header />
      <main class="flex-grow container mx-auto px-4 py-24">
        <div class="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-8">
          <h1 class="text-4xl font-bold text-center">Global Hotels Explorer</h1>
          <div class="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Search destinations..."
              class="w-full max-w-md px-4 py-2 rounded-l-lg text-gray-800"
            />
            <button class="bg-blue-900 px-4 py-2 rounded-r-lg hover:bg-yellow-400">
              Search
            </button>
          </div>
        </div>

        <div class="flex mb-6 justify-center space-x-4">
          <select class="px-4 py-2 border rounded-lg bg-white">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
          </select>
          <select class="px-4 py-2 border rounded-lg bg-white">
            <option>All Regions</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Africa</option>
            <option>North America</option>
          </select>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <div class="relative">
              <img
                src="imgs/seaside.jpg"
                alt="Seaside Resort"
                class="w-full h-50 object-cover"
              />
              <div class="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                Top Pick
              </div>
            </div>

            <div class="p-5">
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-800">
                  Seaside Resort
                </h2>
                <div class="flex items-center text-yellow-500">4.8</div>
              </div>

              <div class="flex items-center text-gray-600 mb-3">
                Location: Bali, Indonesia
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4">
                <span class="flex items-center justify-center rounded-md bg-gray-50 px-2 py-1 text-md text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                  WiFi
                </span>
                <span class="flex items-center justify-center rounded-md bg-red-50 px-2 py-1 text-md text-red-700 ring-1 ring-red-600/10 ring-inset">
                  Pool
                </span>
                <span class="flex items-center justify-center rounded-md bg-yellow-50 px-2 py-1 text-md text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                  Spa
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="text-xl font-bold text-blue-900">$250/night</div>

                <div class="flex space-x-2">
                  <button class="bg-blue-900 text-white px-3 py-2 rounded hover:bg-yellow-900">
                    Book
                  </button>
                  <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <div class="relative">
              <img
                src="imgs/20230121145837475619000000-o.jpg"
                alt="Mountain Lodge"
                class="w-full h-50 object-cover"
              />
              <div class="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full font-bold">
                Eco Friendly
              </div>
            </div>

            <div class="p-5">
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-800">
                  Mountain Lodge
                </h2>
                <div class="flex items-center text-yellow-500">4.6</div>
              </div>

              <div class="flex items-center text-gray-600 mb-3">
                Location: Swiss Alps, Switzerland
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4">
                <span class="flex items-center justify-center rounded-md bg-blue-50 px-2 py-1 text-md text-blue-600 ring-1 ring-blue-500/10 ring-inset">
                  WiFi
                </span>
                <span class="flex items-center justify-center rounded-md bg-red-50 px-2 py-1 text-md text-red-700 ring-1 ring-red-600/10 ring-inset">
                  View
                </span>
                <span class="flex items-center justify-center rounded-md bg-purple-50 px-2 py-1 text-md text-purple-800 ring-1 ring-purple-600/20 ring-inset">
                  Ski
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="text-xl font-bold text-blue-900">$320/night</div>

                <div class="flex space-x-2">
                  <button class="bg-blue-900 text-white px-3 py-2 rounded hover:bg-yellow-400">
                    Book
                  </button>
                  <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <div class="relative">
              <img
                src="imgs/image3.jpg"
                alt="Urban Luxury Hotel"
                class="w-full h-50 object-cover"
              />
              <div class="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 rounded-full font-bold">
                Popular
              </div>
            </div>

            <div class="p-5">
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-800">
                  Urban Luxury Hotel
                </h2>
                <div class="flex items-center text-yellow-500">4.9</div>
              </div>

              <div class="flex items-center text-gray-600 mb-3">
                Location: Tokyo, Japan
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4">
                <span class="flex items-center justify-center rounded-md bg-red-50 px-2 py-1 text-md text-red-700 ring-1 ring-red-600/10 ring-inset">
                  WiFi
                </span>
                <span class="flex items-center justify-center rounded-md bg-green-50 px-2 py-1 text-md text-green-700 ring-1 ring-green-600/10 ring-inset">
                  City
                </span>
                <span class="flex items-center justify-center rounded-md bg-pink-50 px-2 py-1 text-md text-pink-800 ring-1 ring-pink-600/20 ring-inset">
                  Food
                </span>
              </div>

              <div class="flex justify-between items-center">
                <div class="text-xl font-bold text-blue-900">$400/night</div>

                <div class="flex space-x-2">
                  <button class="bg-blue-900 text-white px-3 py-2 rounded hover:bg-yellow-400">
                    Book
                  </button>
                  <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <button class="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-400">
            Load More Hotels
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
// export default Hotels;

import React from "react";

export default function About() {
  return (
    <>
      <div class="relative text-white py-20">
        {
          // <!-- Background Image -->
        }
        <img
          src="imgs/PLS+copia.jpg"
          alt="Background"
          class="absolute inset-0 w-full h-full object-cover"
        />

        {
          //<!-- Overlay Content -->
        }
        <div class="relative bg-navy-900 bg-opacity-70 py-20">
          <div class="container mx-auto text-center">
            <h1 class="text-5xl font-bold mb-6">About Us</h1>
            <div class="h-1 w-20 bg-yellow-400 mx-auto"></div>
          </div>
        </div>
      </div>

      {
        // <!-- Main Content -->
      }
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto flex items-center justify-between gap-10">
          {
            //<!-- Left Content -->
          }
          <div class="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <img
              src="imgs/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg"
              alt="Luxury Hotel Room"
              class="w-50 h-full object-cover rounded-lg"
            />
          </div>

          {
            //<!-- Right Image -->
          }
          <div class="w-1/2 h-full pl-10 flex flex-col justify-center">
            <h1 class="text-4xl font-bold mb-4">Experience Luxury Living!</h1>
            <ul class="space-y-4 text-lg">
              <li class="flex items-center">
                <img
                  src="imgs/icons8-premium-100.png"
                  alt="Premium Room Service Icon"
                  class="mr-2 w-6 h-6"
                />
                Premium Room Service
              </li>
              <li class="flex items-center">
                <img
                  src="imgs/clock.png"
                  alt="Concierge Support Icon"
                  class="mr-2 w-6 h-6"
                />
                24/7 Concierge Support
              </li>
              <li class="flex items-center">
                <img
                  src="imgs/sparkles.509x512.png"
                  alt="Luxury Amenities Icon"
                  class="mr-2 w-6 h-6"
                />
                Luxury Amenities
              </li>
            </ul>
          </div>
        </div>
      </section>

      {
        //<!-- Stats Section -->
      }
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 bg-blue-900">
        <div class="text-center p-6 text-white rounded-lg">
          <div class="text-4xl font-bold text-yellow-400">500+</div>
          <div class="mt-2">Premium Rooms</div>
        </div>
        <div class="text-center p-6 text-white rounded-lg">
          <div class="text-4xl font-bold text-yellow-400">4.8</div>
          <div class="mt-2">Guest Rating</div>
        </div>
        <div class="text-center p-6 text-white rounded-lg">
          <div class="text-4xl font-bold text-yellow-400">50+</div>
          <div class="mt-2">Locations</div>
        </div>
        <div class="text-center p-6 text-white rounded-lg">
          <div class="text-4xl font-bold text-yellow-400">15+</div>
          <div class="mt-2">Years Experience</div>
        </div>
      </div>

      {
        // <!-- Services Section -->
      }
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div class="text-center p-8 bg-white rounded-lg shadow-lg">
          <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="imgs/home (1).png" alt="Home Icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold mb-4">Luxury Accommodations</h3>
          <p class="text-gray-600">
            Experience world-class comfort in our carefully designed rooms and
            suites.
          </p>
        </div>
        <div class="text-center p-8 bg-white rounded-lg shadow-lg">
          <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="imgs/clock.png" alt="Clock Icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold mb-4">24/7 Service</h3>
          <p class="text-gray-600">
            Round-the-clock support to ensure your stay is perfect at every
            moment.
          </p>
        </div>
        <div class="text-center p-8 bg-white rounded-lg shadow-lg">
          <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <img
              src="imgs/icons8-checkmark-100.png"
              alt="Check Icon"
              class="w-8 h-8"
            />
          </div>
          <h3 class="text-xl font-bold mb-4">Best Price Guarantee</h3>
          <p class="text-gray-600">
            We promise the best rates for your luxury stay experience.
          </p>
        </div>
      </div>
    </>
  );
}

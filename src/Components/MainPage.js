import CardsLayout from "./CardsLayout";
import Header from "./Header";
import OurGuest from "./OurGuest";
import OurServices from "./OurServices";
import OurVision from "./OurVision";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <div className="bg-gray-100">
          <OurVision />
          <section class="py-16 px-4 text-center">
            <h2 class="text-3xl font-bold mb-8">
              Advantages of booking with us
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {
                // <!-- Make Reserving Money -->
              }
              <div class="flex flex-col items-center">
                <div class="text-blue-600 mb-4">
                  <img
                    src="imgs/jar.png"
                    alt="Savings Icon"
                    class="w-12 h-12"
                  />
                </div>
                <h3 class="font-semibold text-lg mb-2">Make Reserving Money</h3>
                <p class="text-gray-600">
                  With Invite a friend and My Wallet you will save on your
                  bookings
                </p>
              </div>

              {
                //<!-- deals -->
              }
              <div class="flex flex-col items-center">
                <div class="text-blue-600 mb-4">
                  <img
                    src="imgs/deal.png"
                    alt="Exclusive Deals Icon"
                    class="w-12 h-12"
                  />
                </div>
                <h3 class="font-semibold text-lg mb-2">Exclusive deals</h3>
                <p class="text-gray-600">
                  Get the best deals and offers straight to your inbox.
                </p>
              </div>

              {
                //<!-- discounts -->
              }
              <div class="flex flex-col items-center">
                <div class="text-blue-600 mb-4">
                  <img
                    src="imgs/discount (1).png"
                    alt="Exclusive Discounts Icon"
                    class="w-12 h-12"
                  />
                </div>
                <h3 class="font-semibold text-lg mb-2">Exclusive deals</h3>
                <p class="text-gray-600">Great discounts for members</p>
              </div>

              {
                //<!-- Book faster -->
              }
              <div class="flex flex-col items-center">
                <div class="text-blue-600 mb-4">
                  <img
                    src="imgs/clock.png"
                    alt="Book Faster Icon"
                    class="w-12 h-12"
                  />
                </div>
                <h3 class="font-semibold text-lg mb-2">Book faster</h3>
                <p class="text-gray-600">
                  No need to fill in your details and use One-Click payment
                </p>
              </div>

              {
                // <!-- processing -->
              }
              <div class="flex flex-col items-center">
                <div class="text-blue-600 mb-4">
                  <img
                    src="imgs/online.png"
                    alt="Easy Online Processing Icon"
                    class="w-12 h-12"
                  />
                </div>
                <h3 class="font-semibold text-lg mb-2">
                  Easy online processing
                </h3>
                <p class="text-gray-600">
                  Process booking requests, personal data, and invoices easily
                </p>
              </div>
            </div>

            <button class="mt-8 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-yellow-400">
              Join the Reserving Club
            </button>
          </section>
          <div className="p-6">
            <CardsLayout />
            <OurGuest />
            <OurServices />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

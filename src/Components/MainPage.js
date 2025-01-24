import NavBar from "./Navbar";
export default function MainPage() {
  return (
    <div>
      <div className="min-h-screen">
        <NavBar />
        <div className="bg-gray-100">
          <section
            className="relative bg-cover bg-center h-screen"
            style={{
              backgroundImage: "url('/imgs/pexels-pixabay-258154.jpg')",
            }}
          >
            {/* <header className="relative w-full z-50 bg-transparent text-white p-4 hover:bg-opacity-75">
              <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-semibold">Logo</h1>

                <nav className="flex-1 flex justify-center gap-8">
                  <ul className="flex justify-between gap-8">
                    <li>
                      <a
                        href="#"
                        className="text-white hover:text-yellow-400 duration-300 opacity-75 transition-opacity"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white hover:text-yellow-400 transition duration-300 opacity-75 transition-opacity"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white hover:text-yellow-400 transition duration-300 opacity-75 transition-opacity"
                      >
                        Our Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white hover:text-yellow-400 transition duration-300 opacity-75 transition-opacity"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </nav>
                <button className="bg-blue-900 px-4 py-2 rounded hover:bg-yellow-400 transition duration-300 ml-auto">
                  Login
                </button>
              </div>
            </header> */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Our vision is all about making memories with people who love to
                PLAY.
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Whether you re a couple or a family, come join us in a luxury
                dream vacation, <br />
                and enjoy some much-needed private relaxation.
              </p>
              <a
                href="#"
                className="bg-yellow-400 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 hover:scale-110 transition-transform duration-300"
              >
                Book Now
              </a>
            </div>
          </section>

          <div className="p-6">
            <h2 className="text-2xl text-center font-semibold mb-4">
              Book now with the best price guarantee!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src="imgs/bedroom-5664221_640.jpg"
                  alt="Card Image"
                />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">One Bedroom</h2>
                  <p className="text-gray-700 text-base">
                    This is a description for Card .
                  </p>
                </div>
                <div className="px-6 py-4">
                  <a
                    href="#"
                    className="inline-block w-full text-center bg-blue-900 text-white font-semibold py-2 rounded hover:bg-yellow-400 transition duration-300"
                  >
                    Book Now
                  </a>
                </div>
              </div>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src="imgs/bedroom-5664221_640.jpg"
                  alt="Card Image"
                />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">Two Bedroom</h2>
                  <p className="text-gray-700 text-base">
                    This is a description for Card .
                  </p>
                </div>
                <div className="px-6 py-4">
                  <a
                    href="#"
                    className="inline-block w-full text-center bg-blue-900 text-white font-semibold py-2 rounded hover:bg-yellow-400 transition duration-300"
                  >
                    Book Now
                  </a>
                </div>
              </div>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src="imgs/bedroom-5664221_640.jpg"
                  alt="Card Image"
                />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">Three Bedroom</h2>
                  <p className="text-gray-700 text-base">
                    This is a description for Card .
                  </p>
                </div>
                <div className="px-6 py-4">
                  <a className="inline-block w-full text-center bg-blue-900 text-white font-semibold py-2 rounded hover:bg-yellow-400 transition duration-300">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row bg-blue-50 shadow-md rounded-lg p-6 md:p-10 w-full mx-auto mt-10 items-center">
              <div className="w-full md:w-1/2 mr-10">
                <img
                  src="imgs/pexels-thorsten-technoman-109353-338504.jpg"
                  alt="hotel"
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  Be Our Guest!
                </h1>
                <p className="text-gray-600 mt-4">
                  As a member of our website, you’ll be recognized and rewarded
                  across the global collection of hotels of Global Hotel
                  Alliance. We offer recognition from Day One — so our benefits,
                  DISCOVERY Dollars (D$), Experiences and Live Local are
                  available to you instantly, at all membership tiers at any of
                  our properties, at home or away, with or without a stay.
                </p>
                <button
                  className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
                  onClick="location.href='#'"
                >
                  Sign up
                </button>
              </div>
            </div>
            <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">Accommodation</h3>
                  <p>
                    We offer luxurious rooms and suites with premium amenities
                    for your comfort.
                  </p>
                </div>
                <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Dining Experience
                  </h3>
                  <p>
                    We serve exquisite cuisine across our restaurants with
                    24-hour room service.
                  </p>
                </div>
                <div className="bg-blue-200 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2">
                    Wellness Center
                  </h3>
                  <p>
                    We provide spa treatments, fitness facilities, and a
                    swimming pool for relaxation.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

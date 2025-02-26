import React, { useCallback, useState } from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { Heart } from "lucide-react";

// بيانات الفنادق
const hotelsData = [
  {
    id: 1,
    name: "Seaside Resort",
    location: "Bali, Indonesia",
    price: "$250/night",
    rating: 4.8,
    image: "imgs/seaside.jpg",
    tag: { text: "Top Pick", color: "bg-yellow-400 text-black" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "Pool", color: "bg-red-50 text-red-700 ring-red-600/10" },
      { name: "Spa", color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20" },
    ],
  },
  {
    id: 2,
    name: "Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    price: "$320/night",
    rating: 4.6,
    image: "imgs/20230121145837475619000000-o.jpg",
    tag: { text: "Eco Friendly", color: "bg-green-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-blue-50 text-blue-600 ring-blue-500/10" },
      { name: "View", color: "bg-red-50 text-red-700 ring-red-600/10" },
      { name: "Ski", color: "bg-purple-50 text-purple-800 ring-purple-600/20" },
    ],
  },
  {
    id: 3,
    name: "Urban Luxury Hotel",
    location: "Tokyo, Japan",
    price: "$400/night",
    rating: 4.9,
    image: "imgs/image3.jpg",
    tag: { text: "Popular", color: "bg-red-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-red-50 text-red-700 ring-red-600/10" },
      { name: "City", color: "bg-green-50 text-green-700 ring-green-600/10" },
      { name: "Food", color: "bg-pink-50 text-pink-800 ring-pink-600/20" },
    ],
  },
];

// مكون لعرض بطاقة الفندق
const HotelCard = ({ hotel, favorites, toggleFavorite }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 flex flex-col h-full">
    <div className="relative">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full font-bold ${hotel.tag.color}`}
      >
        {hotel.tag.text}
      </div>
    </div>

    <div className="p-4 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
        <div className="flex items-center text-yellow-500">
          <p className="mx-2">{hotel.rating}</p>
          <button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(hotel.id)}
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.includes(hotel.id) ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center text-gray-600 mb-3">
        {hotel.location}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {hotel.features.map((feature, index) => (
          <span
            key={index}
            className={`flex items-center justify-center rounded-md px-2 py-1 text-md ring-1 ring-inset ${feature.color}`}
          >
            {feature.name}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-xl font-bold text-blue-900">{hotel.price}</div>
        <div className="flex space-x-2">
          <button className="bg-blue-900 text-white px-3 py-2 rounded hover:bg-yellow-400">
            Book
          </button>
          <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">
            Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

// مكون Hotels الذي يعرض قائمة الفنادق
const Hotels = () => {
  const [hotels, setHotels] = useState(hotelsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = useCallback((hotel) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(hotel)
        ? prevFavorites.filter((fav) => fav !== hotel)
        : [...prevFavorites, hotel]
    );
  }, []);

  // فلترة الفنادق حسب النص المدخل في البحث
  const filteredHotels = hotels.filter((hotel) => {
    const queryLower = searchQuery.toLowerCase();
    const matchesSearchQuery =
      hotel.name.toLowerCase().includes(queryLower) ||
      hotel.location.toLowerCase().includes(queryLower);

    // تصفية الفنادق حسب التصفية من الأزرار
    const matchesTag = filterTag === "All" || hotel.tag.text === filterTag;

    return matchesSearchQuery && matchesTag;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return (
        parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", ""))
      );
    }
    if (sortBy === "price-high-low") {
      return (
        parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", ""))
      );
    }
    if (sortBy === "rating-high-low") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const processedHotels =
    sortedHotels.length > 0 ? sortedHotels : filteredHotels;

  return (
    <React.Fragment>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-8">
          <div className=" mb-8">
            <h2 className="text-4xl font-bold text-center mb-6">
              Global Hotels Explorer
            </h2>
            <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
            <p className="text-center text-white py-3 text-lg mt-4">
              Discover the best hotels around the world. Whether you're looking
              for relaxation in a luxury resort or adventure in unique
              destinations, we offer the finest accommodation options. Enjoy
              comfort and variety with options that suit all your needs and
              preferences. Choose your favorite destination and start searching
              now to get the best deals!
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full max-w-md px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none transition duration-300 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-900 px-4 py-2 rounded-r-lg hover:bg-yellow-400 transition duration-300 ease-in-out">
              Search
            </button>
          </div>
        </div>

        {/* Hotel Filter */}
        <div className="flex mb-6 justify-center items-center space-x-4">
          <span className="text-lg font-semibold text-gray-800">
            Filter by:
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              filterTag === "All" ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterTag("All")}
          >
            All Hotels
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filterTag === "Top Pick"
                ? "bg-yellow-400 text-black"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterTag("Top Pick")}
          >
            Top Picks
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filterTag === "Eco Friendly"
                ? "bg-green-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterTag("Eco Friendly")}
          >
            Eco Friendly
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filterTag === "Popular" ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterTag("Popular")}
          >
            Popular
          </button>
        </div>

        <div className="flex mb-6 justify-center items-center space-x-4">
          <span className="text-lg font-semibold text-gray-800">Sort by:</span>
          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating-high-low">Rating: High to Low</option>
          </select>
        </div>

        {/* Hotels Grid */}
        {/* <div className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-24">No hotels found.</div>
          ) : (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="transform transition duration-300 hover:scale-105 hover:shadow-lg max-w-xs w-full mx-auto"
              >
                <HotelCard hotel={hotel} />
              </div>
            ))
          )}
        </div> */}

        <div className="py-5 grid gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processedHotels.length === 0 ? (
            <div className="text-center py-24">No hotels found.</div>
          ) : (
            processedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="transform transition duration-300 hover:scale-105 hover:shadow-lg max-w-xs w-full mx-auto"
              >
                <HotelCard
                  hotel={hotel}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-400">
            Load More Hotels
          </button>
        </div>
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default Hotels;

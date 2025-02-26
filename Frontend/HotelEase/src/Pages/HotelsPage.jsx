import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { useAuth } from "../Auth/context/AuthContext";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

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
  {
    id: 4,
    name: "City Grand Hotel",
    location: "New York, USA",
    price: "$280/night",
    rating: 4.7,
    image: "/imgs/citygrand.jpeg",
    tag: { text: "Luxury Stay", color: "bg-blue-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "Gym", color: "bg-red-50 text-red-700 ring-red-600/10" },
      {
        name: "Business Center",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
      {
        name: "Room Service",
        color: "bg-blue-50 text-blue-700 ring-blue-600/20",
      },
      {
        name: "Free Breakfast",
        color: "bg-green-50 text-green-700 ring-green-600/10",
      },
    ],
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    price: "$500/night",
    rating: 4.8,
    image: "imgs/dubai_oasis.jpeg",
    tag: { text: "Luxury Retreat", color: "bg-gold-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Infinity Pool",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      { name: "Spa", color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20" },
      {
        name: "Private Beach",
        color: "bg-teal-50 text-teal-700 ring-teal-600/20",
      },
    ],
  },
  {
    id: 6,
    name: "Santorini Cliff Suites",
    location: "Santorini, Greece",
    price: "$350/night",
    rating: 4.9,
    image: "imgs/santorini.jpeg",
    tag: { text: "Romantic Escape", color: "bg-pink-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "Sea View", color: "bg-blue-50 text-blue-600 ring-blue-500/10" },
      { name: "Hot Tub", color: "bg-red-50 text-red-700 ring-red-600/10" },
    ],
  },
  {
    id: 7,
    name: "Safari Wilderness Lodge",
    location: "Serengeti, Tanzania",
    price: "$420/night",
    rating: 4.7,
    image: "imgs/serengeti.jpeg",
    tag: { text: "Adventure", color: "bg-orange-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Safari Tours",
        color: "bg-green-50 text-green-700 ring-green-600/10",
      },
      {
        name: "Outdoor Dining",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
    ],
  },
  {
    id: 8,
    name: "Maldives Water Villas",
    location: "Maldives",
    price: "$650/night",
    rating: 5.0,
    image: "imgs/maldives.jpeg",
    tag: { text: "Exclusive", color: "bg-blue-500 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Private Pool",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      {
        name: "Snorkeling",
        color: "bg-teal-50 text-teal-700 ring-teal-600/20",
      },
    ],
  },
  {
    id: 9,
    name: "Parisian Elegance Hotel",
    location: "Paris, France",
    price: "$370/night",
    rating: 4.6,
    image: "imgs/paris.jpeg",
    tag: { text: "Charming Stay", color: "bg-purple-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "City View", color: "bg-pink-50 text-pink-700 ring-pink-600/10" },
      {
        name: "Fine Dining",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
    ],
  },
  {
    id: 10,
    name: "Sydney Harbour Retreat",
    location: "Sydney, Australia",
    price: "$300/night",
    rating: 4.5,
    image: "imgs/sydney.jpeg",
    tag: { text: "Best View", color: "bg-cyan-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Harbour View",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      {
        name: "Rooftop Pool",
        color: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
      },
    ],
  },
  {
    id: 11,
    name: "Tokyo Skyline Hotel",
    location: "Tokyo, Japan",
    price: "$400/night",
    rating: 4.8,
    image: "imgs/tokyo.jpg",
    tag: { text: "Urban Luxury", color: "bg-red-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Skyline View",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      {
        name: "Fine Dining",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
    ],
  },
  {
    id: 12,
    name: "Swiss Alps Chalet",
    location: "Zermatt, Switzerland",
    price: "$550/night",
    rating: 4.9,
    image: "imgs/switzerland.jpg",
    tag: { text: "Mountain Retreat", color: "bg-green-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Ski Access",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      { name: "Hot Tub", color: "bg-red-50 text-red-700 ring-red-600/10" },
    ],
  },
  {
    id: 13,
    name: "New York Central Suites",
    location: "New York, USA",
    price: "$480/night",
    rating: 4.7,
    image: "imgs/newyork.jpg",
    tag: { text: "City Central", color: "bg-indigo-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "City View", color: "bg-blue-50 text-blue-600 ring-blue-500/10" },
      {
        name: "Rooftop Lounge",
        color: "bg-purple-50 text-purple-700 ring-purple-600/20",
      },
    ],
  },
  {
    id: 14,
    name: "Amazon Rainforest Lodge",
    location: "Amazon, Brazil",
    price: "$320/night",
    rating: 4.6,
    image: "imgs/amazon.jpg",
    tag: { text: "Eco Adventure", color: "bg-green-500 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Guided Tours",
        color: "bg-teal-50 text-teal-700 ring-teal-600/20",
      },
      {
        name: "Outdoor Dining",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
    ],
  },
  {
    id: 15,
    name: "Rome Heritage Hotel",
    location: "Rome, Italy",
    price: "$380/night",
    rating: 4.5,
    image: "imgs/rome.jpg",
    tag: { text: "Historic Charm", color: "bg-brown-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "City View", color: "bg-pink-50 text-pink-700 ring-pink-600/10" },
      {
        name: "Fine Dining",
        color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
      },
    ],
  },
  {
    id: 16,
    name: "Cape Town Oceanview",
    location: "Cape Town, South Africa",
    price: "$350/night",
    rating: 4.7,
    image: "imgs/capetown.jpg",
    tag: { text: "Seaside Luxury", color: "bg-cyan-400 text-white" },
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      {
        name: "Ocean View",
        color: "bg-blue-50 text-blue-600 ring-blue-500/10",
      },
      {
        name: "Outdoor Pool",
        color: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
      },
    ],
  },
];

// مكون لعرض بطاقة الفندق
const HotelCard = ({ hotel, favorites, toggleFavorite }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 flex flex-col h-full">
    <div className="relative">
      <img
        src={hotel.image}
        // src={hotel.image ? hotel.image : "/imgs/default-hotel.png"}
        // src={hotel?.image || "/imgs/default-hotel.png"}
        alt={hotel.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; // لمنع الدخول في حلقة لا نهائية
          e.target.src = "/imgs/default-hotel.png"; // الصورة الافتراضية
        }}
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
          <Link
            to={`/hotel-details/${hotel.id}`}
            // className="text-blue-600 mt-4 block"
          >
            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">
              View Details
            </button>
          </Link>
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

  const [currentPage, setCurrentPage] = useState(0);
  const hotelsPerPage = 4; // Number of hotels displayed per page

  const [favorites, setFavorites] = useState([]);

  const { user } = useAuth();

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

  // Pagination

  // Calculate the hotels to display based on the current page
  const offset = currentPage * hotelsPerPage;
  const currentHotels = processedHotels.slice(offset, offset + hotelsPerPage);
  // Function to handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

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
        {/* <div className="flex mb-6 justify-center items-center space-x-4">
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
          <button
            className={`px-4 py-2 rounded-lg ${
              filterTag === "Luxury Stay"
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterTag("Luxury Stay")}
          >
            Luxury Stay
          </button>
        </div> */}
        {/* Hotel Filter */}
        {/* <div className="flex mb-6 justify-center items-center flex-wrap space-x-4">
          <span className="text-lg font-semibold text-gray-800 mr-4">
            Filter by:
          </span>
          {[
            "All",
            "Top Pick",
            "Eco Friendly",
            "Popular",
            "Luxury Stay",
            "Luxury Retreat",
            "Romantic Escape",
            "Adventure",
            "Exclusive",
            "Charming Stay",
            "Best View",
            "Urban Luxury",
            "Mountain Retreat",
            "City Central",
            "Eco Adventure",
          ].map((tag) => (
            <button
              key={tag}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out ${
                filterTag === tag
                  ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div> */}
        {/* Hotel Filter */}
        {/* <div className="flex mb-6 justify-center items-center flex-wrap space-x-4">
          <span className="text-lg font-semibold text-gray-800 mr-4">
            Filter by:
          </span>
          {hotelsData.map(({ tag }) => (
            <button
              key={tag.text}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out ${
                filterTag === tag.text
                  ? `${tag.color} shadow-lg transform scale-105`
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilterTag(tag.text)}
            >
              {tag.text}
            </button>
          ))}
        </div> */}

        <div class="flex justify-center items-center gap-12 mb-8">
          {/* Filter */}
          <div class="w-96 h-auto bg-blue-100 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center space-y-4 transform transition-all duration-300 hover:scale-105">
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Filter by</InputLabel>
              <Select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                label="Filter by"
                sx={{
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <MenuItem
                  key="all"
                  value="All"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  All
                </MenuItem>
                {hotelsData.map(({ tag }) => (
                  <MenuItem
                    key={tag.text}
                    value={tag.text}
                    sx={{ color: tag.color }}
                  >
                    {tag.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Sort */}
          <div class="w-96 h-auto bg-green-100 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center space-y-4 transform transition-all duration-300 hover:scale-105">
            <div className="flex mb-6 justify-center items-center space-x-4">
              <span className="text-lg font-semibold text-gray-800">
                Sort by:
              </span>
              <select
                className="px-6 py-2 border rounded-lg bg-white shadow-md transition-all duration-300 hover:bg-gray-100"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
              </select>
            </div>
          </div>
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

        {/* <div className="py-5 grid gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </div> */}

        <div className="py-5 grid gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentHotels.length === 0 ? (
            <div className="text-center py-24">No hotels found.</div>
          ) : (
            currentHotels.map((hotel) => (
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

        {/* Pagination */}
        {user && (
          <div className="flex justify-center mt-8">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(processedHotels.length / hotelsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"flex space-x-2"}
              pageClassName={"px-4 py-2 border rounded-lg hover:bg-blue-300"}
              activeClassName={"bg-blue-900 text-white"}
              previousClassName={
                "px-4 py-2 border rounded-lg hover:bg-blue-300"
              }
              nextClassName={"px-4 py-2 border rounded-lg hover:bg-blue-300"}
            />
          </div>
        )}

        {!user && (
          <div className="text-center mt-8">
            <button
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-400"
              onClick={() => {
                toast.info("Please log in to access more features and hotels!");
              }}
            >
              Load More Hotels
            </button>
          </div>
        )}

        <ToastContainer />
      </main>

      <Footer />
    </React.Fragment>
  );
};

export default Hotels;

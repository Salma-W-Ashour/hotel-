import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaConciergeBell,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

import { useAuth } from "../Auth/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hotels data (added descriptions and more details)
const hotelsData = [
  {
    id: 1,
    name: "Seaside Resort",
    location: "Bali, Indonesia",
    price: "$250/night",
    rating: 4.8,
    image: "/imgs/seaside.jpg",
    tag: { text: "Top Pick", color: "bg-yellow-400 text-black" },
    description:
      "A luxurious seaside resort with stunning ocean views and comfortable rooms. Enjoy top-notch services in a serene atmosphere.",
    features: [
      { name: "WiFi", color: "bg-gray-50 text-gray-600 ring-gray-500/10" },
      { name: "Pool", color: "bg-red-50 text-red-700 ring-red-600/10" },
      { name: "Spa", color: "bg-yellow-50 text-yellow-800 ring-yellow-600/20" },
      {
        name: "Air Conditioning",
        color: "bg-blue-50 text-blue-700 ring-blue-600/20",
      },
      {
        name: "Free Breakfast",
        color: "bg-green-50 text-green-700 ring-green-600/10",
      },
    ],
    reviews: [
      {
        name: "Ali",
        comment: "Amazing stay! Very clean and excellent service!",
        rating: 5,
      },
      {
        name: "Sara",
        comment: "Beautiful view, but the breakfast could be better.",
        rating: 4,
      },
    ],
  },
  {
    id: 2,
    name: "Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    price: "$320/night",
    rating: 4.6,
    image: "/imgs/20230121145837475619000000-o.jpg",
    tag: { text: "Eco Friendly", color: "bg-green-400 text-white" },
    description:
      "A cozy mountain lodge nestled in the Swiss Alps. A unique experience for nature and peace lovers.",
    features: [
      { name: "WiFi", color: "bg-blue-50 text-blue-600 ring-blue-500/10" },
      { name: "Scenic View", color: "bg-red-50 text-red-700 ring-red-600/10" },
      {
        name: "Ski Access",
        color: "bg-purple-50 text-purple-800 ring-purple-600/20",
      },
      {
        name: "Free Parking",
        color: "bg-gray-50 text-gray-600 ring-gray-500/10",
      },
    ],
    reviews: [
      {
        name: "Omar",
        comment: "Breathtaking view, very friendly staff.",
        rating: 5,
      },
      {
        name: "Lina",
        comment: "A bit cold, but the hotel is cozy and warm.",
        rating: 4.5,
      },
    ],
  },
  {
    id: 3,
    name: "Urban Luxury Hotel",
    location: "Tokyo, Japan",
    price: "$400/night",
    rating: 4.9,
    image: "/imgs/image3.jpg",
    tag: { text: "Popular", color: "bg-red-400 text-white" },
    description:
      "An upscale hotel in the heart of Tokyo, offering world-class dining, modern amenities, and breathtaking city views.",
    features: [
      { name: "WiFi", color: "bg-red-50 text-red-700 ring-red-600/10" },
      {
        name: "City View",
        color: "bg-green-50 text-green-700 ring-green-600/10",
      },
      {
        name: "Gourmet Dining",
        color: "bg-pink-50 text-pink-800 ring-pink-600/20",
      },
    ],
    reviews: [
      {
        name: "Kenji",
        comment: "Top-notch service and an incredible city view!",
        rating: 5,
      },
      {
        name: "Mei",
        comment: "Loved the food and room design, but it's a bit pricey.",
        rating: 4.7,
      },
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
    description:
      "An elegant hotel in the heart of New York City. Perfect for business and leisure travelers alike.",
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
    reviews: [
      {
        name: "Michael",
        comment: "Excellent location, great service!",
        rating: 5,
      },
      {
        name: "Emma",
        comment: "Loved the rooftop view, but rooms could be bigger.",
        rating: 4.2,
      },
    ],
  },
];

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = (hotel, user, navigate) => {
    if (!user) {
      toast.warn("Please log in to continue booking.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate(`/booking-details/${hotel.id}`, { state: { hotel } });
    }
  };

  const hotel = hotelsData.find((h) => h.id === parseInt(hotelId));

  if (!hotel) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-red-600">Hotel Not Found!</h2>
      </div>
    );
  }

  // حفظ بيانات الفنادق في Local Storage إذا لم تكن موجودة
  if (!localStorage.getItem("hotelsData")) {
    localStorage.setItem("hotelsData", JSON.stringify(hotelsData));
  }

  // استرجاع بيانات الفنادق من Local Storage
  const storedHotelsData = JSON.parse(localStorage.getItem("hotelsData")) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        {/* Hotel Image */}
        <div className="relative">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-semibold ${hotel.tag.color}`}
          >
            {hotel.tag.text}
          </span>
        </div>

        {/* Hotel Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-3xl font-bold mb-2">{hotel.name}</h2>
          <p className="text-gray-600 flex items-center mb-2">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            {hotel.location}
          </p>
          <p className="text-xl font-semibold text-blue-600">{hotel.price}</p>
          <p className="text-lg text-yellow-500 flex items-center">
            <FaStar className="mr-1" /> {hotel.rating}
          </p>

          {/* Description */}
          <p className="text-gray-700 mt-4">{hotel.description}</p>

          {/* Features */}
          <h3 className="text-2xl font-semibold mt-6">Amenities</h3>
          <ul className="flex flex-wrap gap-2 mt-2">
            {hotel.features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center px-3 py-1 rounded-md ${feature.color}`}
              >
                <FaConciergeBell className="mr-2" />
                {feature.name}
              </li>
            ))}
          </ul>

          {/* Reviews */}
          <h3 className="text-2xl font-semibold mt-6">Guest Reviews</h3>
          <div className="mt-3 space-y-3">
            {hotel.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="font-semibold">{review.name}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500 flex items-center">
                  <FaStar className="mr-1" /> {review.rating}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            {/* <button
              onClick={() =>
                navigate(`/booking-details/${hotel.id}`, { state: { hotel } })
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button> */}

            <button
              onClick={() => handleBooking(hotel, user, navigate)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

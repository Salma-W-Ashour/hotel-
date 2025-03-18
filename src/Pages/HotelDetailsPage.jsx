import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaConciergeBell,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaStar,
  FaBed,
  FaBath,
  FaWifi,
  FaCalendarCheck,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hotels data (added descriptions and more details)
export const hotelsData = [
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
    rooms: [
      {
        id: 1,
        hotel_id: 1,
        number: "101",
        room_type: "Standard",
        name: "Ocean View Standard",
        price: "$150",
        capacity: 2,
        is_available: true,
        image:
          "/imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg",
        description:
          "Comfortable room with a queen-sized bed and basic amenities.",
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 2,
        hotel_id: 1,
        number: "201",
        room_type: "Deluxe",
        name: "Premium Ocean Suite",
        price: "$250",
        capacity: 3,
        is_available: true,
        image: "/imgs/room-interior-hotel-bedroom_23-2150683421.jpg",
        description: "Spacious room with a king-sized bed and ocean view.",
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 3,
        hotel_id: 1,
        number: "301",
        room_type: "Suite",
        name: "Royal Palm Villa",
        price: "$400",
        capacity: 4,
        image: "/imgs/bedroom-5664221_640.jpg",
        description: "Luxurious suite with a living area and private balcony.",
        is_available: false,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
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
    rooms: [
      {
        id: 4,
        hotel_id: 2,
        number: "102",
        room_type: "Standard",
        name: "Alpine Cabin",
        price: "$200",
        capacity: 2,
        image:
          "/imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg",
        description: "Cozy room with a stunning view of the Swiss Alps.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 5,
        hotel_id: 2,
        number: "202",
        room_type: "Deluxe",
        name: "Fireplace Chalet",
        price: "$350",
        capacity: 4,
        image: "/imgs/room-interior-hotel-bedroom_23-2150683421.jpg",
        description: "Spacious suite with a fireplace and mountain view.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 6,
        hotel_id: 2,
        number: "302",
        room_type: "Suite",
        name: "Eagle's Nest Penthouse",
        price: "$500",
        capacity: 6,
        image: "/imgs/bedroom-5664221_640.jpg",
        description: "Private chalet with a hot tub and ski-in/ski-out access.",
        is_available: false,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
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
    rooms: [
      {
        id: 7,
        hotel_id: 3,
        number: "103",
        room_type: "Standard",
        name: "Tokyo Sky Studio",
        price: "$300",
        capacity: 2,
        image:
          "/imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg",
        description: "Modern room with a panoramic view of Tokyo.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 8,
        hotel_id: 3,
        number: "203",
        room_type: "Deluxe",
        name: "Shibuya View Suite",
        price: "$450",
        capacity: 3,
        image: "/imgs/room-interior-hotel-bedroom_23-2150683421.jpg",
        description: "Luxurious suite with a separate living area.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 9,
        hotel_id: 3,
        number: "303",
        room_type: "Suite",
        name: "Neon Tower Penthouse",
        price: "$700",
        capacity: 4,
        image: "/imgs/bedroom-5664221_640.jpg",
        description:
          "Exclusive penthouse with a private terrace and city views.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
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
    rooms: [
      {
        id: 10,
        hotel_id: 4,
        number: "104",
        room_type: "Standard",
        name: "Manhattan Studio",
        price: "$280",
        capacity: 2,
        image:
          "/imgs/Our First Look at the Incredible St_ Regis Hong Kong - The Points Guy.jpeg",
        description: "Elegant room with a view of the city skyline.",
        is_available: false,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 11,
        hotel_id: 4,
        number: "204",
        room_type: "Deluxe",
        name: "Central Park Deluxe",
        price: "$400",
        capacity: 3,
        image: "/imgs/room-interior-hotel-bedroom_23-2150683421.jpg",
        description: "Spacious suite with a work desk and city views.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
      },
      {
        id: 12,
        hotel_id: 4,
        number: "304",
        room_type: "Suite",
        name: "Presidential Sky Villa",
        price: "$650",
        capacity: 4,
        image: "/imgs/bedroom-5664221_640.jpg",
        description:
          "Luxurious suite with a private lounge and butler service.",
        is_available: true,
        created_at: "2024-03-01T08:00:00Z",
        updated_at: "2024-03-05T14:30:00Z",
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

  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     <div className="max-w-5xl mx-auto p-8">
  //       {/* Hotel Image */}
  //       <div className="relative">
  //         <img
  //           src={hotel.image}
  //           alt={hotel.name}
  //           className="w-full h-96 object-cover rounded-lg shadow-lg"
  //         />
  //         <span
  //           className={`absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-semibold ${hotel.tag.color}`}
  //         >
  //           {hotel.tag.text}
  //         </span>
  //       </div>

  //       {/* Hotel Information */}
  //       <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
  //         <h2 className="text-3xl font-bold mb-2">{hotel.name}</h2>
  //         <p className="text-gray-600 flex items-center mb-2">
  //           <FaMapMarkerAlt className="text-red-500 mr-2" />
  //           {hotel.location}
  //         </p>
  //         <p className="text-xl font-semibold text-blue-600">{hotel.price}</p>
  //         <p className="text-lg text-yellow-500 flex items-center">
  //           <FaStar className="mr-1" /> {hotel.rating}
  //         </p>

  //         {/* Description */}
  //         <p className="text-gray-700 mt-4">{hotel.description}</p>

  //         {/* Features */}
  //         <h3 className="text-2xl font-semibold mt-6">Amenities</h3>
  //         <ul className="flex flex-wrap gap-2 mt-2">
  //           {hotel.features.map((feature, index) => (
  //             <li
  //               key={index}
  //               className={`flex items-center px-3 py-1 rounded-md ${feature.color}`}
  //             >
  //               <FaConciergeBell className="mr-2" />
  //               {feature.name}
  //             </li>
  //           ))}
  //         </ul>

  //         {/* Reviews */}
  //         <h3 className="text-2xl font-semibold mt-6">Guest Reviews</h3>
  //         <div className="mt-3 space-y-3">
  //           {hotel.reviews.map((review, index) => (
  //             <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
  //               <p className="font-semibold">{review.name}</p>
  //               <p className="text-gray-600">{review.comment}</p>
  //               <p className="text-yellow-500 flex items-center">
  //                 <FaStar className="mr-1" /> {review.rating}
  //               </p>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Rooms Section */}
  //         {/* <h3 className="text-2xl font-semibold mt-6">Available Rooms</h3>
  //         <div className="mt-4 space-y-4">
  //           {hotel.rooms.map((room) => (
  //             <div
  //               key={room.id}
  //               className="bg-gray-50 p-4 rounded-lg shadow-sm"
  //             >
  //               <div className="flex items-center gap-4">
  //                 <img
  //                   src={room.image}
  //                   alt={room.name}
  //                   className="w-24 h-24 object-cover rounded-lg"
  //                 />
  //                 <div>
  //                   <h4 className="text-xl font-semibold">{room.name}</h4>
  //                   <p className="text-gray-600">{room.description}</p>
  //                   <p className="text-blue-600 font-semibold">{room.price}</p>
  //                   <p className="text-sm text-gray-500">
  //                     Capacity: {room.capacity} guests
  //                   </p>
  //                 </div>
  //               </div>
  //               <button
  //                 onClick={() => handleBooking(hotel, user, navigate)}
  //                 className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
  //               >
  //                 Book Now
  //               </button>
  //             </div>
  //           ))}
  //         </div> */}
  //         <div className="mt-6">
  //           <h3 className="text-2xl font-semibold mb-4">Available Rooms</h3>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {hotel.rooms.map((room) => (
  //               <motion.div
  //                 key={room.id}
  //                 whileHover={{ scale: 1.02 }}
  //                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  //               >
  //                 {/* Room Image */}
  //                 <div className="relative h-48">
  //                   <img
  //                     src={room.image}
  //                     alt={room.name}
  //                     className="w-full h-full object-cover"
  //                   />
  //                   <span className="absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
  //                     {room.capacity} Guests
  //                   </span>
  //                 </div>

  //                 {/* Room Details */}
  //                 <div className="p-6">
  //                   <h4 className="text-xl font-bold text-gray-800 mb-2">
  //                     {room.name}
  //                   </h4>
  //                   <p className="text-gray-600 mb-4">{room.description}</p>

  //                   {/* Price and Features */}
  //                   <div className="flex justify-between items-center mb-4">
  //                     <p className="text-lg font-semibold text-blue-600">
  //                       {room.price}
  //                     </p>
  //                     <div className="flex items-center space-x-2">
  //                       <FaBed className="text-gray-500" />
  //                       <FaBath className="text-gray-500" />
  //                       <FaWifi className="text-gray-500" />
  //                     </div>
  //                   </div>

  //                   {/* Book Now Button */}
  //                   <button
  //                     onClick={() => handleBooking(hotel, user, navigate)}
  //                     className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg
  //                     hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
  //                   >
  //                     <FaCalendarCheck className="text-lg" />
  //                     Book Now
  //                   </button>
  //                 </div>
  //               </motion.div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Buttons */}
  //         <div className="flex justify-between mt-6">
  //           <button
  //             onClick={() => navigate(-1)}
  //             className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
  //           >
  //             <FaArrowLeft className="mr-2" />
  //             Back
  //           </button>

  //           {/* <button
  //             onClick={() => handleBooking(hotel, user, navigate)}
  //             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
  //           >
  //             Book Now
  //           </button> */}
  //         </div>
  //         <ToastContainer />
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Hotel Image */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-96 object-cover"
          />
          <span
            className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold ${hotel.tag.color}`}
          >
            {hotel.tag.text}
          </span>
        </div>

        {/* Hotel Information */}
        <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {hotel.name}
          </h1>
          <p className="text-gray-600 flex items-center mb-4">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            {hotel.location}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-semibold text-blue-600">
              {hotel.price}
            </p>
            <p className="text-lg text-yellow-500 flex items-center">
              <FaStar className="mr-1" /> {hotel.rating}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {hotel.description}
          </p>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hotel.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${feature.color}`}
                >
                  <FaConciergeBell className="mr-2" />
                  <span className="font-medium">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Guest Reviews
            </h3>
            <div className="space-y-4">
              {hotel.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar className="mr-1" /> {review.rating}
                    </p>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Explore Our Luxury Rooms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {hotel.rooms?.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
                        {room.capacity} Guests
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          room.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.is_available ? "Available" : "Booked"}
                      </span>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-gray-900">
                        {room.name}
                      </h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {room.room_type}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {room.description}
                    </p>

                    {/* Amenities Icons */}
                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaBed className="w-5 h-5" />
                        <span className="text-sm">2 Beds</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaBath className="w-5 h-5" />
                        <span className="text-sm">1 Bath</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaWifi className="w-5 h-5" />
                        <span className="text-sm">WiFi</span>
                      </div>
                    </div>

                    {/* Price & Booking */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {room.price}
                            <span className="text-sm text-gray-500 ml-1">
                              /night
                            </span>
                          </p>
                        </div>
                        {/* <button
                          onClick={() => handleBooking(hotel, user, navigate)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                          disabled={!room.is_available}
                        >
                          <FaCalendarCheck className="w-5 h-5" />
                          {room.is_available ? "Book Now" : "Not Available"}
                        </button> */}
                        <button
                          onClick={() => handleBooking(hotel, user, navigate)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 md:px-6 md:py-2 lg:px-6 lg:py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lgdisabled:opacity-75 disabled:cursor-not-allowedtext-sm md:text-basew-full sm:w-aut"
                          disabled={!room.is_available}
                        >
                          <FaCalendarCheck className="w-4 h-4 md:w-5 md:h-5" />
                          {room.is_available ? "Book Now" : "Not Available"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HotelDetails;

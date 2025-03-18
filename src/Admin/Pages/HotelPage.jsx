import { useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash,
  FiSave,
  FiX,
  FiUsers,
  FiStar,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

// ... (initialHotels array remains the same)
const initialHotels = [
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
    rooms: [
      {
        id: 1,
        type: "Deluxe Suite",
        price: 350,
        capacity: 2,
        size: "45m²",
        amenities: ["Sea View", "Jacuzzi", "Mini Bar"],
        image: "/imgs/room-1.jpg",
        booked: false,
      },
      {
        id: 2,
        type: "Family Room",
        price: 450,
        capacity: 4,
        size: "60m²",
        amenities: ["Balcony", "Sofa Bed", "Kitchenette"],
        image: "/imgs/room-2.jpg",
        booked: true,
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
];

const HotelPage = () => {
  const [hotels, setHotels] = useState(initialHotels);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [formData, setFormData] = useState({
    id: null, // Add ID field to form data
    name: "",
    location: "",
    price: "",
    description: "",
    tag: { text: "", color: "" },
  });

  const [roomForm, setRoomForm] = useState({
    type: "",
    price: "",
    capacity: 2,
    size: "",
    amenities: [],
    image: "",
    booked: false,
  });

  // Improved Hotel Form Handling (Fixed Hotel Submit Handler)
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "location", "price", "description"];
    if (requiredFields.some((field) => !formData[field])) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editMode) {
      // Use formData.id instead of selectedHotel.id
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === formData.id ? { ...hotel, ...formData } : hotel
      );
      setHotels(updatedHotels);
      toast.success("Hotel updated successfully!");
    } else {
      const newHotel = {
        id: Date.now(), // Better ID generation
        ...formData,
        rating: 4.5,
        image: formData.image || "/imgs/default-hotel.jpg",
        features: [],
        rooms: [],
        reviews: [],
      };
      setHotels([...hotels, newHotel]);
      toast.success("Hotel added successfully!");
    }

    // Reset form with ID clearing
    setFormData({
      id: null,
      name: "",
      location: "",
      price: "",
      description: "",
      tag: { text: "", color: "" },
    });
    setEditMode(false);
  };

  // Enhanced Room Management (Updated Room Form Handling)
  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (!roomForm.type || !roomForm.price || !roomForm.size) {
      toast.error("Please fill all required room details");
      return;
    }

    const updatedRoom = {
      ...roomForm,
      price: Number(roomForm.price),
      amenities: roomForm.amenities.split(",").map((a) => a.trim()),
    };

    const updatedRooms = editingRoomId
      ? selectedHotel.rooms.map((room) =>
          room.id === editingRoomId ? { ...room, ...updatedRoom } : room
        )
      : [...selectedHotel.rooms, { ...updatedRoom, id: Date.now() }];

    const updatedHotel = {
      ...selectedHotel,
      rooms: updatedRooms,
    };

    setHotels(
      hotels.map((h) => (h.id === selectedHotel.id ? updatedHotel : h))
    );
    setSelectedHotel(updatedHotel);
    setRoomForm({
      type: "",
      price: "",
      capacity: 2,
      size: "",
      amenities: [],
      image: "",
      booked: false,
    });
    setEditingRoomId(null);
    toast.success(editingRoomId ? "Room updated!" : "Room added!");
  };

  // Room Edit Handler
  const handleRoomEdit = (room) => {
    setRoomForm({
      ...room,
      amenities: room.amenities.join(", "),
    });
    setEditingRoomId(room.id);
  };

  // Hotel CRUD Operations
  const handleHotelEdit = (hotel) => {
    setFormData({
      id: hotel.id, // Store hotel ID in form data
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      description: hotel.description,
      tag: hotel.tag,
      image: hotel.image, // Add missing image field
    });
    setEditMode(true);
    setSelectedHotel(null);
  };

  const handleHotelDelete = (id) => {
    const updatedHotels = hotels.filter((hotel) => hotel.id !== id);
    setHotels(updatedHotels);
    // toast.success("Hotel deleted successfully!");
  };

  // Room CRUD Operations
  const handleRoomDelete = (roomId) => {
    const updatedRooms = selectedHotel.rooms.filter(
      (room) => room.id !== roomId
    );
    const updatedHotel = { ...selectedHotel, rooms: updatedRooms };
    setHotels(
      hotels.map((h) => (h.id === selectedHotel.id ? updatedHotel : h))
    );
    setSelectedHotel(updatedHotel);
    // toast.success("Room deleted successfully!");
  };

  // Delete Confirmation with Toast
  const confirmDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "hotel") {
        handleHotelDelete(id);
        toast.success("Hotel deleted successfully");
      } else {
        handleRoomDelete(id);
        toast.success("Room deleted successfully");
      }
    }
  };

  // UI Components
  const FeatureTag = ({ feature }) => (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${feature.color} ring-1 ring-inset`}
    >
      {feature.name}
    </span>
  );
  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-1 text-amber-500">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={i < rating ? "fill-current" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Hotels Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              🏨 Luxury Hotels Management
            </h2>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData({
                  name: "",
                  location: "",
                  price: "",
                  description: "",
                  tag: { text: "", color: "" },
                });
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FiPlus className="text-lg" /> Add New Hotel
            </button>
          </div>

          {/* Hotel Form */}
          <form
            onSubmit={handleHotelSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <input
              type="text"
              placeholder="Hotel Name *"
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location *"
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Price per Night *"
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Featured Tag (e.g., Top Pick)"
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={formData.tag.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tag: { ...formData.tag, text: e.target.value },
                })
              }
            />
            <textarea
              placeholder="Hotel Description *"
              className="md:col-span-2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="1"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FiSave className="text-lg" />{" "}
              {editMode ? "Update Hotel" : "Add Hotel"}
            </button>
          </form>

          {/* Hotels List */}
          <div className="space-y-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {hotel.name}
                      </h3>
                      {hotel.tag.text && (
                        <span
                          className={`${hotel.tag.color} px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {hotel.tag.text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <FiStar className="text-amber-500" />
                      <span className="font-semibold">{hotel.rating}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{hotel.location}</span>
                    </div>
                    <p className="text-lg font-semibold text-emerald-600">
                      {hotel.price}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleHotelEdit(hotel)}
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-3 rounded-xl transition-colors"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => confirmDelete("hotel", hotel.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 p-3 rounded-xl transition-colors"
                    >
                      <FiTrash size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedHotel(
                          selectedHotel?.id === hotel.id ? null : hotel
                        )
                      }
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl text-gray-600 transition-colors"
                    >
                      {selectedHotel?.id === hotel.id ? (
                        <FiX />
                      ) : (
                        "Manage Rooms"
                      )}
                    </button>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{hotel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.features.map((feature, index) => (
                      <FeatureTag key={index} feature={feature} />
                    ))}
                  </div>
                </div>

                {/* Rooms Management */}
                {selectedHotel?.id === hotel.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <h4 className="text-xl font-semibold mb-6">
                      🏠 Rooms Management
                    </h4>

                    {/* Room Form */}
                    <form
                      onSubmit={handleRoomSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                      <input
                        type="text"
                        placeholder="Room Type *"
                        className="p-3 border border-gray-200 rounded-xl"
                        value={roomForm.type}
                        onChange={(e) =>
                          setRoomForm({ ...roomForm, type: e.target.value })
                        }
                        required
                      />
                      <input
                        type="number"
                        placeholder="Price per Night *"
                        className="p-3 border border-gray-200 rounded-xl"
                        value={roomForm.price}
                        onChange={(e) =>
                          setRoomForm({ ...roomForm, price: e.target.value })
                        }
                        required
                      />
                      <select
                        className="p-3 border border-gray-200 rounded-xl bg-white"
                        value={roomForm.capacity}
                        onChange={(e) =>
                          setRoomForm({ ...roomForm, capacity: e.target.value })
                        }
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={6}>6 Guests</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Room Size (e.g., 45m²)"
                        className="p-3 border border-gray-200 rounded-xl"
                        value={roomForm.size}
                        onChange={(e) =>
                          setRoomForm({ ...roomForm, size: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Amenities (comma separated)"
                        className="md:col-span-2 p-3 border border-gray-200 rounded-xl"
                        value={roomForm.amenities}
                        onChange={(e) =>
                          setRoomForm({
                            ...roomForm,
                            amenities: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="md:col-span-2 p-3 border border-gray-200 rounded-xl"
                        value={roomForm.image}
                        onChange={(e) =>
                          setRoomForm({ ...roomForm, image: e.target.value })
                        }
                      />
                      {/* <button
                        type="submit"
                        className="md:col-span-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <FiPlus /> Add Room
                      </button> */}

                      <button
                        type="submit"
                        className="md:col-span-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <FiPlus /> {editingRoomId ? "Update Room" : "Add Room"}
                      </button>
                      {editingRoomId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRoomId(null);
                            setRoomForm({
                              type: "",
                              price: "",
                              capacity: 2,
                              size: "",
                              amenities: [],
                              image: "",
                              booked: false,
                            });
                          }}
                          className="md:col-span-2 bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                        >
                          <FiX /> Cancel Edit
                        </button>
                      )}
                    </form>

                    {/* Rooms List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedHotel.rooms.map((room) => (
                        <div
                          key={room.id}
                          className="p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="text-lg font-semibold">
                                {room.type}
                              </h5>
                              <p className="text-emerald-600 font-medium">
                                ${room.price}/night
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <FiUsers />
                                <span>{room.capacity} Guests</span>
                                <span>•</span>
                                <span>{room.size}</span>
                              </div>
                            </div>
                            {/* <button
                              onClick={() => confirmDelete("room", room.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash size={18} />
                            </button> */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleRoomEdit(room)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FiEdit size={18} />
                              </button>
                              <button
                                onClick={() => confirmDelete("room", room.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiTrash size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-md text-sm ${
                                room.booked
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {room.booked ? "Occupied" : "Available"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelPage;

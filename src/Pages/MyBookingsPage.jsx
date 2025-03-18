import { useState, useEffect } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import BookingHistory from "./BookingHistory";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const loadBookings = () => {
      const storedBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );

      const hotelsData = JSON.parse(localStorage.getItem("hotelsData") || "[]");

      const validBookings = storedBookings.filter(
        (booking) =>
          booking.hotelId &&
          booking.checkIn &&
          booking.checkOut &&
          booking.image
      );

      const bookingsWithDetails = validBookings.map((booking) => {
        const hotel = hotelsData.find((h) => h.id === booking.hotelId);

        const bookingData =
          JSON.parse(localStorage.getItem("bookingData")) || {};

        // const paymentMethod = bookingData.paymentMethod || "Not Selected";
        // const paymentMethod = bookingData[booking.hotelId]?.paymentMethod || "Not Selected";
        // const paymentMethod = bookingData?.paymentMethod || "Not Selected";

        return {
          ...booking,
          id: booking.id || crypto.randomUUID(),
          hotelName: hotel?.name || "N/A",
          hotelPrice: hotel?.price || "N/A",
          hotelImage: hotel?.image || "/imgs/default-hotel.png",
          checkIn: booking.checkIn ? new Date(booking.checkIn) : null,
          checkOut: booking.checkOut ? new Date(booking.checkOut) : null,
          location: hotel?.location || "N/A",
          guests: booking.guests || "N/A",
          rooms: booking.rooms || "N/A",
          roomType: booking.roomType || { label: "N/A" },
          paymentMethod: booking.paymentMethod,
          specialRequests: booking?.specialRequests || "None",
        };
      });

      console.log(hotelsData);
      setBookings(bookingsWithDetails);
      console.log(bookingsWithDetails);

      // تحقق مما إذا كانت هناك حجوزات نشطة
      const now = new Date();
      const hasActiveBooking = storedBookings.some(
        (booking) => new Date(booking.checkOut) > now
      );

      setIsDisabled(hasActiveBooking);
      // setBookings(storedBookings);
    };

    loadBookings();
  }, []);

  // const storedImg = JSON.parse(localStorage.getItem("bookings") || "[]");
  // const lastBooking = storedImg[storedImg.length - 1]; // الحصول على آخر حجز
  // const imageSrc = lastBooking?.img || "/imgs/default-hotel.png"; // استخدم صورة افتراضية في حال عدم وجود img
  // console.log(imageSrc);

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handleUpdateBooking = (updatedBooking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setEditingBooking(null);
  };

  const addBooking = (bookingData) => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const newBooking = {
      ...bookingData.formData,
      id: crypto.randomUUID(),
      paymentMethod: bookingData.formData.paymentMethod || "",
      createdAt: new Date().toISOString(),
    };

    const isDuplicate = storedBookings.some(
      (b) =>
        b.hotelId === newBooking.hotelId &&
        b.checkIn === newBooking.checkIn &&
        b.checkOut === newBooking.checkOut
    );

    if (!isDuplicate) {
      const updatedBookings = [...storedBookings, newBooking];
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings((prev) => [...prev, newBooking]);
    } else {
      alert("This booking already exists!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            My Bookings
          </span>
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-600 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                // key={Math.random()}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={booking.hotelImage}
                      // src={imageSrc}
                      alt={booking.hotelName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-xl font-semibold text-white">
                        {booking.hotelName}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {booking.location}
                      </p>
                    </div>

                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setEditingBooking(booking)}
                        className="p-2 bg-white/90 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <PencilAltIcon className="w-5 h-5 text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-red-100 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Room Type:
                      </span>
                      <span className="text-blue-600 font-medium">
                        {booking.roomType.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Check-in:
                      </span>
                      <span className="text-gray-700">
                        {formatDate(booking.checkIn)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Check-out:
                      </span>
                      <span className="text-gray-700">
                        {formatDate(booking.checkOut)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Price:
                      </span>
                      <span className="text-green-600 font-semibold">
                        {booking.hotelPrice}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Payment Method:</span>{" "}
                        <span className="capitalize text-blue-600">
                          {booking.paymentMethod || "Not Provided"}
                        </span>
                      </p>
                    </div>

                    {booking.specialRequests && (
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Special Requests:</span>{" "}
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {booking.guests}{" "}
                      {Number(booking.guests) === 1 ? "guest" : "guests"}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {booking.rooms}{" "}
                      {Number(booking.rooms) === 1 ? "room" : "rooms"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingBooking && (
          <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
              <div className="space-y-4">
                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Room Type
                  </label>
                  <select
                    value={editingBooking.roomType?.value || ""}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        roomType: {
                          value: e.target.value,
                          label: e.target.options[e.target.selectedIndex].text,
                        },
                      })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                    <option value="standard">Standard Room</option>
                  </select>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Check-in
                  </label>
                  <input
                    type="datetime-local"
                    // value={
                    //   editingBooking.checkIn?.toISOString().slice(0, 16) || ""
                    // }
                    value={
                      editingBooking.checkIn
                        ? new Date(editingBooking.checkIn)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        checkIn: new Date(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Check-out
                  </label>
                  <input
                    type="datetime-local"
                    // value={
                    //   editingBooking.checkOut?.toISOString().slice(0, 16) || ""
                    // }
                    value={
                      editingBooking.checkOut
                        ? new Date(editingBooking.checkOut)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        checkOut: new Date(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingBooking.guests}
                    // onChange={(e) =>
                    //   setEditingBooking({
                    //     ...editingBooking,
                    //     guests: e.target.value,
                    //   })
                    // }
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault(); // منع إدخال السالب والحروف الغير رقمية
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) >= 1) {
                        setEditingBooking({
                          ...editingBooking,
                          guests: value,
                        });
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingBooking.rooms}
                    // onChange={(e) =>
                    //   setEditingBooking({
                    //     ...editingBooking,
                    //     rooms: e.target.value,
                    //   })
                    // }
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault(); // منع إدخال السالب والحروف الغير رقمية
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) >= 1) {
                        setEditingBooking({
                          ...editingBooking,
                          rooms: value,
                        });
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={editingBooking.specialRequests || ""}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        specialRequests: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded h-24 resize-none"
                    placeholder="Any special requirements or notes..."
                  />
                </div>
                {/* Buttons */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateBooking(editingBooking)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* تمرير حالة التعطيل إلى BookingHistory */}
      <BookingHistory isDisabled={isDisabled} />
    </div>
  );
};

export default MyBookingsPage;

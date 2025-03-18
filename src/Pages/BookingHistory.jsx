import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiStar, FiCheckCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingHistory = ({ isDisabled }) => {
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState({
    cleanliness: 0,
    service: 0,
    location: 0,
    comfort: 0,
    comment: "",
    recommend: null,
  });

  // توليد ID فريد
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const validBookings = savedBookings
      .filter((b) => b.hotelId && b.checkIn && b.checkOut)
      .map((b) => ({
        ...b,
        id: b.id || generateUniqueId(),
        ratings: b.ratings || {
          cleanliness: 0,
          service: 0,
          location: 0,
          comfort: 0,
        },
      }));

    setBookings(validBookings);
  }, []);

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    }

    // جلب البيانات من الـ localStorage
    let hotelsData = JSON.parse(localStorage.getItem("hotelsData")) || [];
    let bookingsData = JSON.parse(localStorage.getItem("bookings")) || [];

    // الحصول على بيانات فندقية فريدة استنادًا إلى معرّف الفندق (hotelId)
    let uniqueHotels = Array.from(
      new Set(hotelsData.map((item) => item.id))
    ).map((id) => hotelsData.find((item) => item.id === id));

    // الحصول على بيانات حجز فريدة استنادًا إلى معرّف الفندق (hotelId)
    let uniqueBookings = Array.from(
      new Set(bookingsData.map((item) => item.hotelId))
    ).map((id) => bookingsData.find((item) => item.hotelId === id));

    // عرض البيانات الفريدة
    console.log("Unique Hotels:", uniqueHotels);
    console.log("Unique Bookings:", uniqueBookings);

    // إضافة البيانات الفندقية الفريدة إلى الـ localStorage
    localStorage.setItem("uniqueHotels", JSON.stringify(uniqueHotels));
    // إضافة بيانات الحجز الفريدة إلى الـ localStorage
    localStorage.setItem("uniqueBookings", JSON.stringify(uniqueBookings));
  }, []);

  // استرجاع البيانات الفندقية الفريدة من localStorage
  let uniqueHotels = JSON.parse(localStorage.getItem("uniqueHotels")) || [];

  // تحديث البيانات في localStorage
  const updateBookings = (updatedBookings) => {
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings([...updatedBookings]);
  };

  // فتح نموذج التقييم
  const openRatingModal = (booking) => {
    setSelectedBooking(booking);
    setFeedback({
      cleanliness: booking.ratings.cleanliness,
      service: booking.ratings.service,
      location: booking.ratings.location,
      comfort: booking.ratings.comfort,
      comment: booking.comment || "",
      recommend: booking.recommend ?? null,
    });
  };

  // إرسال التقييم
  const submitRating = () => {
    const requiredFields = [
      feedback.cleanliness,
      feedback.service,
      feedback.location,
      feedback.comfort,
      feedback.recommend,
    ];

    if (requiredFields.some((field) => !field || field === 0)) {
      toast.error("Please complete all rating fields!");
      return;
    }

    const updatedBookings = bookings.map((b) => {
      if (b.id === selectedBooking.id) {
        return {
          ...b,
          rated: true,
          rating: calculateAverageRating(),
          ratings: {
            cleanliness: feedback.cleanliness,
            service: feedback.service,
            location: feedback.location,
            comfort: feedback.comfort,
          },
          comment: feedback.comment,
          recommend: feedback.recommend,
        };
      }
      return b;
    });

    updateBookings(updatedBookings);
    setSelectedBooking(null);
    toast.success("Rating submitted successfully!");
  };

  // حساب متوسط التقييم
  const calculateAverageRating = () => {
    const ratings = [
      feedback.cleanliness,
      feedback.service,
      feedback.location,
      feedback.comfort,
    ];
    return Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // التقييم السريع
  const handleQuickRating = (bookingId, rating) => {
    if (rating < 1) return;

    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, rated: true, rating } : b
    );

    updateBookings(updated);
    toast.success("Quick rating saved!");
  };

  return (
    <div
      className={`container mx-auto py-8 ${
        isDisabled ? "pointer-events-none opacity-50" : ""
      }`}
      dir="ltr"
    >
      <h1 className="text-3xl font-semibold text-center mb-8">
        My Booking History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">
            No bookings found
          </div>
        ) : (
          bookings.map((booking) => {
            // البحث عن الفندق الذي يطابق hotelId من bookings
            const hotel = uniqueHotels.find((h) => h.id === booking.hotelId);

            return hotel ? (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-5">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={booking.image || "/default-hotel.jpg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60">
                      <h3 className="text-xl font-semibold text-white">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {hotel.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        {booking.rated ? "Your Rating" : "Rate Hotel"}
                      </span>
                      {booking.rated ? (
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={
                                i < booking.rating ? "fill-current" : ""
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <select
                            onChange={(e) =>
                              handleQuickRating(
                                booking.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                          >
                            <option value="0">Quick Rate</option>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>
                                {n} Stars
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => openRatingModal(booking)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                          >
                            Detailed
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Check-in:</span>
                      <span className="text-gray-700">
                        {formatDate(booking.checkIn)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Check-out:</span>
                      <span className="text-gray-700">
                        {formatDate(booking.checkOut)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>

      {/* Detailed Rating Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Rate {selectedBooking.hotelName}
            </h3>

            {["cleanliness", "service", "location", "comfort"].map((cat) => (
              <div key={cat} className="mb-4">
                <label className="block text-sm font-medium mb-2 capitalize">
                  {cat}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setFeedback((p) => ({ ...p, [cat]: star }))
                      }
                      className={`text-2xl ${
                        feedback[cat] >= star
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <textarea
              value={feedback.comment}
              onChange={(e) =>
                setFeedback((p) => ({ ...p, comment: e.target.value }))
              }
              placeholder="Additional comments..."
              className="w-full p-2 border rounded-lg mt-4 text-sm"
              rows="3"
            />

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Recommend to others?</p>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setFeedback((p) => ({ ...p, recommend: true }))
                  }
                  className={`px-4 py-2 rounded-full text-sm ${
                    feedback.recommend
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() =>
                    setFeedback((p) => ({ ...p, recommend: false }))
                  }
                  className={`px-4 py-2 rounded-full text-sm ${
                    feedback.recommend === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-500 flex items-center gap-2"
              >
                <FiArrowLeft /> Back
              </button>
              <button
                onClick={submitRating}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BookingHistory;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaBed,
  FaConciergeBell,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

const roomOptions = [
  { value: "standard", label: "Standard Room" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "suite", label: "Suite" },
];

const BookingDetails = ({ onNext }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel; // استقبال بيانات الفندق

  const [formData, setFormData] = useState({
    hotelId: hotel?.id || null,
    checkIn: null,
    checkOut: null,
    guests: 1,
    rooms: 1,
    roomType: null,
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, roomType: selectedOption });
  };

  const handleCheckInChange = (date) => {
    const currentDate = new Date(); // Get today's date
    const currentYear = currentDate.getFullYear(); // Get current year
    const selectedYear = date.getFullYear(); // Get selected year

    // Check if the check-in date is in the previous year
    if (selectedYear < currentYear) {
      toast.error("Check-in date cannot be in the previous year.");
      return;
    }

    // Check if the check-in date is in the future
    if (date > currentDate) {
      toast.error("Check-in date cannot be in the future.");
      return;
    }

    // Check if check-in is after check-out date
    if (formData.checkOut && date > formData.checkOut) {
      toast.error("Check-in date must be before the check-out date.");
      return;
    }

    setFormData({ ...formData, checkIn: date });
  };

  const handleCheckOutChange = (date) => {
    if (formData.checkIn && date < formData.checkIn) {
      toast.error("Check-out date must be after the check-in date.");
      return;
    }
    setFormData({ ...formData, checkOut: date });
  };

  const handleNext = () => {
    console.log("Booking Data:", formData);
    onNext(formData);
  };

  const handleProceedToPayment = () => {
    // التحقق من أن جميع الحقول تم ملؤها
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) {
      toast.error("Please fill in all required fields."); // عرض رسالة التنبيه
      return; // إيقاف العملية إذا كانت الحقول غير مكتملة
    }

    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (!Array.isArray(savedBookings)) {
      console.error("Invalid data in localStorage");
      return;
    }
    savedBookings.push(formData);
    localStorage.setItem("bookings", JSON.stringify(savedBookings));

    // التأكد من إرسال البيانات الكاملة
    navigate("/payment", { state: { hotel, formData } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Booking Details</h2>
        <h3 className="text-3xl text-center text-gray-800 my-4">
          Booking for {hotel?.name || "Hotel"}
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-700 mb-5">
          <p className="text-lg">
            <strong>📍 Location:</strong> {hotel?.location || "Not specified"}
          </p>
          <p className="text-lg">
            <strong>💰 Price:</strong>{" "}
            {hotel?.price ? `${hotel.price}` : "Not available"}
          </p>
        </div>

        <form className="space-y-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <DatePicker
              selected={formData.checkIn}
              // onChange={(date) => setFormData({ ...formData, checkIn: date })}
              onChange={handleCheckInChange}
              placeholderText="Check-in Date"
              className="w-full"
            />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <DatePicker
              selected={formData.checkOut}
              // onChange={(date) => setFormData({ ...formData, checkOut: date })}
              onChange={handleCheckOutChange}
              placeholderText="Check-out Date"
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center border p-2 rounded-md">
              <FaUserFriends className="mr-2 text-gray-500" />
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") {
                    e.preventDefault(); // منع إدخال السالب أو الحروف الغير رقمية
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 1) {
                    handleChange(e); // استدعاء الدالة الأصلية فقط إذا كانت القيمة صحيحة
                  }
                }}
                // onChange={handleChange}
                min="1"
                className="w-full"
                placeholder="Number of Guests"
              />
            </div>
            <div className="flex items-center border p-2 rounded-md">
              <FaBed className="mr-2 text-gray-500" />
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") {
                    e.preventDefault(); // منع إدخال السالب أو الحروف الغير رقمية
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 1) {
                    handleChange(e); // استدعاء الدالة الأصلية فقط إذا كانت القيمة صحيحة
                  }
                }}
                // onChange={handleChange}
                min="1"
                className="w-full"
                placeholder="Number of Rooms"
              />
            </div>
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaBed className="mr-2 text-gray-500" />
            <Select
              options={roomOptions}
              value={formData.roomType}
              onChange={handleSelectChange}
              className="w-full"
              placeholder="Select Room Type"
            />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaConciergeBell className="mr-2 text-gray-500" />
            <input
              type="text"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full"
              placeholder="Special Requests (Optional)"
            />
          </div>
          {/* <button
            type="button"
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button> */}
          <button
            type="button"
            onClick={handleProceedToPayment}
            // onClick={() => navigate("/payment", { state: { hotel, formData } })}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default BookingDetails;

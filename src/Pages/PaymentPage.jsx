import React, { useState, useEffect } from "react";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = ({ onConfirm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { state } = useLocation();
  const { state } = location; // ✅ تعديل لاستخدام نفس الـ location
  const { hotel, formData } = state || {};

  // const hotel = location.state?.hotel;
  console.log("Hotel Details:", hotel);
  const [paymentMethod, setPaymentMethod] = useState("");

  // استرجاع البيانات عند تحميل الصفحة
  useEffect(() => {
    const savedBooking = localStorage.getItem("bookingData");
    if (savedBooking) {
      const parsedData = JSON.parse(savedBooking);
      console.log("Retrieved booking from localStorage:", parsedData);
    }
  }, []);

  const handleConfirm = () => {
    const bookingData = {
      hotel,
      formData,
      paymentMethod,
      bookingDate: new Date().toISOString(), // تاريخ الحجز
    };

    // حفظ البيانات في Local Storage
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    onConfirm(paymentMethod); // ارسال الطريقة المُختارة
    navigate("/confirmation", {
      state: { paymentMethod }, // تمرير القيمة إلى صفحة التأكيد
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {/* ملخص الحجز */}
        <h2 className="text-2xl font-bold text-center mb-4">Booking Summary</h2>
        <div className="flex justify-center mb-4">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        <h3 className="text-3xl text-center text-gray-800 mb-4">
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

        <table className="table-auto w-full text-left mb-5">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Field</th>
              <th className="px-4 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Check-in</td>
              <td className="px-4 py-2 border">
                {formData.checkIn
                  ? formData.checkIn.toLocaleDateString()
                  : "Not specified"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Check-out</td>
              <td className="px-4 py-2 border">
                {formData.checkOut
                  ? formData.checkOut.toLocaleDateString()
                  : "Not specified"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Guests</td>
              <td className="px-4 py-2 border">{formData.guests}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Rooms</td>
              <td className="px-4 py-2 border">{formData.rooms}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Room Type</td>
              <td className="px-4 py-2 border">
                {formData.roomType?.label || "Not specified"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Special Requests</td>
              <td className="px-4 py-2 border">
                {formData.specialRequests || "None"}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Hotel Features</h3>
          <div className="flex justify-center mb-4">
            {hotel.features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-full ${feature.color}`}
              >
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 text-center">
          <span
            className={`p-2 rounded-full ${hotel.tag.color}`}
            style={{ fontSize: "14px" }}
          >
            {hotel.tag.text}
          </span>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Hotel Description</h3>
        <p className="text-lg text-gray-700">{hotel.description}</p>

        {/* اختيار طريقة الدفع */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">
          Choose Payment Method
        </h3>
        <div className="space-y-4">
          {["credit", "paypal", "cash"].map((method, index) => {
            const icons = {
              credit: <FaCreditCard />,
              paypal: <FaPaypal />,
              cash: <FaMoneyBillWave />,
            };
            return (
              <button
                key={index}
                className={`w-full p-3 border rounded-lg flex items-center justify-center gap-2 ${
                  paymentMethod === method
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                {icons[method]}{" "}
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            );
          })}
        </div>

        <button
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300"
          disabled={!paymentMethod}
          onClick={handleConfirm}
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
};

// const ConfirmationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const paymentMethod = location.state?.paymentMethod || "";

//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     cardExpiry: "",
//     cardCVV: "",
//     email: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle user input updates dynamically
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Validate inputs based on selected payment method
//   const validateInputs = () => {
//     if (!paymentMethod) {
//       setErrorMessage("⚠ Please select a payment method before proceeding.");
//       return false;
//     }

//     if (paymentMethod === "credit") {
//       if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
//         setErrorMessage("⚠ Please enter a valid 16-digit card number.");
//         return false;
//       }
//       if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.cardExpiry)) {
//         setErrorMessage("⚠ Expiry date must be in MM/YY format.");
//         return false;
//       }
//       if (!/^\d{3,4}$/.test(paymentDetails.cardCVV)) {
//         setErrorMessage("⚠ CVV must be a 3 or 4-digit number.");
//         return false;
//       }
//     }

//     if (
//       paymentMethod === "paypal" &&
//       !/\S+@\S+\.\S+/.test(paymentDetails.email)
//     ) {
//       setErrorMessage("⚠ Please enter a valid PayPal email.");
//       return false;
//     }

//     setErrorMessage("");
//     return true;
//   };

//   // Handle booking confirmation
//   const handleConfirmBooking = async () => {
//     if (!validateInputs()) return;

//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setIsConfirmed(true);
//       setTimeout(() => {
//         navigate("/thank-you");
//       }, 1500);
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Confirm Your Booking
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           Please review your booking details before confirmation.
//         </p>

//         {/* Display selected payment method */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">
//             Selected Payment Method
//           </h3>
//           <p className="font-medium">
//             {paymentMethod === "credit" // credit-card
//               ? "💳 Credit Card"
//               : paymentMethod === "paypal"
//               ? "💸 PayPal"
//               : paymentMethod === "cash"
//               ? "💵 Cash on Arrival"
//               : "⚠ No payment method selected"}
//           </p>
//         </div>

//         {/* Show specific inputs based on payment method */}
//         {paymentMethod === "credit" && (
//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-1">
//               Card Number
//             </label>
//             <input
//               type="text"
//               name="cardNumber"
//               className="w-full border p-2 rounded"
//               placeholder="1234 5678 9012 3456"
//               maxLength="16"
//               onChange={handleInputChange}
//             />
//             <label className="block text-sm font-semibold mt-3 mb-1">
//               Expiry Date (MM/YY)
//             </label>
//             <input
//               type="text"
//               name="cardExpiry"
//               className="w-full border p-2 rounded"
//               placeholder="MM/YY"
//               maxLength="5"
//               onChange={handleInputChange}
//             />
//             <label className="block text-sm font-semibold mt-3 mb-1">CVV</label>
//             <input
//               type="text"
//               name="cardCVV"
//               className="w-full border p-2 rounded"
//               placeholder="123"
//               maxLength="4"
//               onChange={handleInputChange}
//             />
//           </div>
//         )}

//         {paymentMethod === "paypal" && (
//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-1">
//               PayPal Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="w-full border p-2 rounded"
//               placeholder="your-email@paypal.com"
//               onChange={handleInputChange}
//             />
//           </div>
//         )}

//         {paymentMethod === "cash" && (
//           <p className="text-blue-600 text-center mb-4 font-semibold">
//             🔹 You will pay in cash upon arrival at the hotel.
//           </p>
//         )}

//         {errorMessage && (
//           <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//         )}

//         {isConfirmed ? (
//           <p className="mt-4 text-green-600 font-semibold text-center">
//             ✅ Booking Confirmed Successfully!
//           </p>
//         ) : (
//           <button
//             className={`mt-6 w-full py-2 rounded-lg text-white ${
//               isLoading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//             onClick={handleConfirmBooking}
//             disabled={isLoading}
//           >
//             {isLoading ? "Processing..." : "Confirm Booking"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentMethod = location.state?.paymentMethod || "";
  const hotelDetails = location.state?.hotelDetails || {}; // بيانات الفندق

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!paymentMethod) {
      setErrorMessage("⚠ Please select a payment method before proceeding.");
      return false;
    }

    if (paymentMethod === "credit") {
      if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
        setErrorMessage("⚠ Please enter a valid 16-digit card number.");
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.cardExpiry)) {
        setErrorMessage("⚠ Expiry date must be in MM/YY format.");
        return false;
      }
      if (!/^\d{3,4}$/.test(paymentDetails.cardCVV)) {
        setErrorMessage("⚠ CVV must be a 3 or 4-digit number.");
        return false;
      }
    }

    if (
      paymentMethod === "paypal" &&
      !/\S+@\S+\.\S+/.test(paymentDetails.email)
    ) {
      setErrorMessage("⚠ Please enter a valid PayPal email.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleConfirmBooking = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsConfirmed(true);

      // بيانات الحجز
      const bookingDetails = {
        hotelName: hotelDetails.name,
        hotelImage: hotelDetails.image,
        hotelPrice: hotelDetails.price, // السعر
        hotelDescription: hotelDetails.description,
        checkIn: new Date(), // مثال على تاريخ الوصول
        checkOut: new Date(), // مثال على تاريخ المغادرة
        paymentMethod,
      };

      // حفظ الحجز في localStorage أو sessionStorage
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      bookings.push(bookingDetails);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      setTimeout(() => {
        //   navigate("/my-bookings");
        navigate("/thank-you");
      }, 1500);
    } catch (error) {
      console.error("Error confirming booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Confirm Your Booking
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please review your booking details before confirmation.
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Selected Payment Method
          </h3>
          <p className="font-medium">
            {paymentMethod === "credit"
              ? "💳 Credit Card"
              : paymentMethod === "paypal"
              ? "💸 PayPal"
              : paymentMethod === "cash"
              ? "💵 Cash on Arrival"
              : "⚠ No payment method selected"}
          </p>
        </div>

        {paymentMethod === "credit" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              className="w-full border p-2 rounded"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-semibold mt-3 mb-1">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              name="cardExpiry"
              className="w-full border p-2 rounded"
              placeholder="MM/YY"
              maxLength="5"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-semibold mt-3 mb-1">CVV</label>
            <input
              type="text"
              name="cardCVV"
              className="w-full border p-2 rounded"
              placeholder="123"
              maxLength="4"
              onChange={handleInputChange}
            />
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              PayPal Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              placeholder="your-email@paypal.com"
              onChange={handleInputChange}
            />
          </div>
        )}

        {paymentMethod === "cash" && (
          <p className="text-blue-600 text-center mb-4 font-semibold">
            🔹 You will pay in cash upon arrival at the hotel.
          </p>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {isConfirmed ? (
          <p className="mt-4 text-green-600 font-semibold text-center">
            ✅ Booking Confirmed Successfully!
          </p>
        ) : (
          <button
            className={`mt-6 w-full py-2 rounded-lg text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleConfirmBooking}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Booking"}
          </button>
        )}
      </div>
    </div>
  );
};

export { PaymentPage, ConfirmationPage };

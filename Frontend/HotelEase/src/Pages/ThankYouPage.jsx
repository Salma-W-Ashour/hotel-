import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/solid"; // إضافة أيقونة

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoToMyBookings = () => {
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-20 w-20 text-green-600 animate-bounce" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Booking Confirmed!
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Your reservation is successfully completed. A confirmation email has
          been sent to your address.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleGoToMyBookings}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                     transition-transform transform hover:scale-105 shadow-md"
          >
            View My Bookings
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg
                     hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

// import { useNavigate } from "react-router-dom";

// const ThankYouPage = () => {
//   const navigate = useNavigate();

//   const handleGoToMyBookings = () => {
//     navigate("/my-bookings"); // التوجيه إلى صفحة /my-bookings
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Thank You for Your Booking!
//         </h2>
//         <p className="text-center text-gray-700 mb-6">
//           Your booking has been confirmed successfully. We look forward to
//           serving you!
//         </p>
//         <button
//           onClick={handleGoToMyBookings}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Go to My Bookings
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ThankYouPage;

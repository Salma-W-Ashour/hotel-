import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./Auth/LoginPage";
import SignUpPage from "./Auth/SignUpPage";
import ForgotPassword from "./Auth/ForgotPassword";

import HomePage from "./Pages/HomePage";
import About from "./Pages/AboutUsPage";
import Services from "./Pages/OurServicesPage";
import Hotels from "./Pages/HotelsPage";
import Contact from "./Pages/ContactUsPage";
import NotFoundPage from "./Pages/NotFoundPage"; // صفحة خطأ 404

import BookingDetails from "./Pages/BookingDetails";
import { PaymentPage, ConfirmationPage } from "./Pages/PaymentPage";
import ThankYouPage from "./Pages/ThankYouPage";

import AdminRoutes from "./Admin/Routes/AdminRoutes";
// import AdminLayout from "./Admin/Layout/AdminLayout";

import { AuthProvider } from "./Auth/context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import HotelDetails from "./Pages/HotelDetailsPage";
import MyBookingsPage from "./Pages/MyBookingsPage";

const App = () => {
  const [bookingData, setBookingData] = useState(null);

  const navigate = useNavigate();

  const handleNextStep = (formData) => {
    console.log("Next Step Data:", formData);
    setBookingData(formData);

    // حفظ البيانات في localStorage
  localStorage.setItem("currentBooking", JSON.stringify(formData));

    navigate("/payment");
  };

  const handlePayment = (paymentMethod) => {
    setBookingData((prevData) => ({ ...prevData, paymentMethod }));
    navigate("/confirmation");
  };

  return (
    <AuthProvider>
      <Routes>
        {/* صفحة الأدمن محمية */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/user-only"
          element={
            <ProtectedRoute>
              <SomeUserPage />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<Contact />} />

        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/hotel-details/:hotelId" element={<HotelDetails />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-details/:hotelId"
          element={
            <ProtectedRoute>
              <BookingDetails onNext={handleNextStep} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage onConfirm={handlePayment} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationPage bookingDetails={bookingData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/thank-you"
          element={
            <ProtectedRoute>
              <ThankYouPage />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

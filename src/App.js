import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./Auth/LoginPage";
import SignUpPage from "./Auth/SignUpPage";

import HomePage from "./Pages/HomePage";
import About from "./Pages/AboutUsPage";
import Services from "./Pages/OurServicesPage";
import Hotels from "./Pages/HotelsPage";
import Contact from "./Pages/ContactUsPage";
import NotFoundPage from "./Pages/NotFoundPage"; // صفحة خطأ 404

// import AdminLayout from "./Admin/Layout/AdminLayout";
import AdminRoutes from "./Admin/Routes/AdminRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact-us" element={<Contact />} />

      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

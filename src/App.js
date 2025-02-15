import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/ContactUsPage";
import About from "./Pages/AboutUsPage";
import Hotels from "./Pages/HotelsPage";
import Services from "./Pages/OurServicesPage";
// import NotFound from "./Components/pages/NotFound"; // صفحة خطأ 404

import DashboardHome from "./AdminPanel/Dashboard/DashboardHome";
import AdminLayout from "./AdminPanel/Layout/AdminLayout";
import AdminRoutes from "./AdminPanel/Routes/AdminRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/hotels" element={<Hotels />} />
      {/* <Route path="*" element={<NotFound />} /> */}

      {/* لوحة التحكم */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* <Route path="Dashboard" element={<></>} /> */}
      {/* <Route path="work" element={<></>} /> */}
    </Routes>
  );
};

export default App;

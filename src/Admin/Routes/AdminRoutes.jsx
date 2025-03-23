import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import UsersList from "../Users/UsersList";
import ReservationsList from "../Reservations/ReservationsList";
import ServicesList from "../Services/ServicesList";
import AdminProfile from "../Settings/AdminProfile";
import HotelPage from "../Pages/HotelPage";
import AdminSupport from "../Pages/AdminSupport";
import AdminCoupons from "../Pages/AdminCoupons";
import BookingList from "../Users/BookingList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<UsersList />} />
        <Route path="reservations" element={<ReservationsList />} />
        <Route path="hotels" element={<HotelPage />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="settings" element={<AdminProfile />} />
        <Route path="support" element={<AdminSupport />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="bookings" element={<BookingList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

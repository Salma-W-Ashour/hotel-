import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import UsersList from "../Users/UsersList";
import ReservationsList from "../Reservations/ReservationsList";
import ServicesList from "../Services/ServicesList";
import AdminProfile from "../Settings/AdminProfile";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<UsersList />} />
        <Route path="reservations" element={<ReservationsList />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

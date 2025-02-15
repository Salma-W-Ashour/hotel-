import { Link } from "react-router-dom";
import {
  FaUser,
  FaHotel,
  FaClipboardList,
  FaCogs,
  FaHome,
} from "react-icons/fa";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin">
            <FaHome /> لوحة التحكم
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <FaUser /> المستخدمون
          </Link>
        </li>
        <li>
          <Link to="/admin/reservations">
            <FaClipboardList /> الحجوزات
          </Link>
        </li>
        <li>
          <Link to="/admin/services">
            <FaHotel /> الخدمات
          </Link>
        </li>
        <li>
          <Link to="/admin/profile">
            <FaCogs /> الإعدادات
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

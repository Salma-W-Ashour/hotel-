import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaHotel,
  FaClipboardList,
  FaCogs,
  FaHome,
  FaBars,
  FaTimes,
  FaTag,
  FaList,
} from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { BsListTask } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation(); // تحديد المسار الحالي

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* زر فتح القائمة للجوال */}
      <button
        className={`fixed top-4 left-4 p-2 rounded-lg z-50 lg:hidden transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* القائمة الجانبية */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative w-64 min-h-screen p-5 z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full lg:opacity-100 lg:translate-x-0"
        } ${darkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"}`}
      >
        <h2 className="text-xl font-semibold mb-5 text-center">Admin Panel</h2>
        <ul className="space-y-4 pt-6">
          {[
            { to: "/admin", icon: <FaHome />, label: "Dashboard" },
            { to: "/admin/hotels", icon: <FaHotel />, label: "Hotels" },
            { to: "/admin/bookings", icon: <FaList />, label: "Bookings" }, // <BsListTask />
            // { to: "/admin/reservations", icon: <FaClipboardList />, label: "Reservations" },
            { to: "/admin/services", icon: <RiServiceFill />, label: "Services" },
            {
              to: "/admin/coupons",
              icon: <FaTag />,
              label: "Coupons",
            },
            { to: "/admin/users", icon: <FaUser />, label: "Users" },
            // { to: "/admin/settings", icon: <FaCogs />, label: "Settings" },
            {
              to: "/admin/support",
              icon: <FiSettings />,
              label: "Support Messages",
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 p-3 rounded-lg transition duration-300 rounded-r hover:-translate-y-1/12 ${
                  location.pathname === item.to
                    ? "bg-blue-600 text-white shadow-lg" // ستايل العنصر النشط
                    : darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-600 text-gray-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// export default Sidebar;
export default React.memo(Sidebar);

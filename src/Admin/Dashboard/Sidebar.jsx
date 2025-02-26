import { Link } from "react-router-dom";
import {
  FaUser,
  FaHotel,
  FaClipboardList,
  FaCogs,
  FaHome,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`sidebar w-64 min-h-screen p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-5 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        {[
          { to: "/admin", icon: <FaHome />, label: "Dashboard" },
          { to: "/admin/users", icon: <FaUser />, label: "Users" },
          {
            to: "/admin/reservations",
            icon: <FaClipboardList />,
            label: "Reservations",
          },
          { to: "/admin/services", icon: <FaHotel />, label: "Services" },
          { to: "/admin/settings", icon: <FaCogs />, label: "Settings" },
        ].map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

// import { Link } from "react-router-dom";
// import {
//   FaUser,
//   FaHotel,
//   FaClipboardList,
//   FaCogs,
//   FaHome,
// } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="sidebar bg-gray-800 text-white w-64 min-h-screen p-5">
//       <h2 className="text-xl font-semibold mb-5 text-center">Admin Panel</h2>
//       <ul className="space-y-4">
//         {[
//           { to: "/admin", icon: <FaHome />, label: "Dashboard" },
//           { to: "/admin/users", icon: <FaUser />, label: "Users" },
//           {
//             to: "/admin/reservations",
//             icon: <FaClipboardList />,
//             label: "Reservations",
//           },
//           { to: "/admin/services", icon: <FaHotel />, label: "Services" },
//           { to: "/admin/settings", icon: <FaCogs />, label: "Settings" },
//         ].map((item, index) => (
//           <li key={index}>
//             <Link
//               to={item.to}
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
//             >
//               {item.icon} <span>{item.label}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

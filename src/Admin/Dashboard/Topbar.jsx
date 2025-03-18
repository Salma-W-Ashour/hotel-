import {
  FaUserCircle,
  FaSun,
  FaMoon,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { IconButton, Tooltip } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Topbar = ({ toggleSidebar }) => {
  const { darkMode, setDarkMode } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    // // إضافة منطق تسجيل الخروج هنا (مثال: مسح التوكن، إعادة التوجيه)
    // localStorage.removeItem("authToken");
    // window.location.href = "/login";
    toast.info(
      <div>
        <p>Are you sure you want to log out?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => {
              logout();
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div
      className={`topbar fixed w-full z-30 ${
        darkMode
          ? "bg-gray-900 text-white shadow-lg"
          : "bg-white shadow-lg text-gray-800"
      } p-4 flex justify-between items-center transition-colors duration-300`}
    >
      {/* Left Section: Menu Button (Mobile Only) */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Center Section: Title */}
      <h3 className="text-xl font-semibold text-center absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
        Admin Dashboard
      </h3>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* User Profile with improved spacing */}
        <div className="flex items-center gap-2 ml-2 lg:pr-64">
          <div className="flex items-center gap-2 mr-4">
            <FaUserCircle size={30} />
            <div className="hidden sm:block">
              <span className="font-medium">Admin</span>
              <span className="text-sm block text-gray-500 dark:text-gray-400">
                System Administrator
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <Tooltip title="Logout" arrow>
            <IconButton
              onClick={handleLogout}
              // onClick={logout}
              sx={{
                color: darkMode ? "#fff" : "#1a1a1a",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                },
              }}
            >
              <FaSignOutAlt size={20} />
            </IconButton>
          </Tooltip>
        </div>
        <ToastContainer
          theme={darkMode ? "dark" : "light"}
          toastStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default Topbar;

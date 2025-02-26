import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import { useState } from "react";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider>
      <div
        className={`flex min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main Content */}
          <main className="p-6 flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;

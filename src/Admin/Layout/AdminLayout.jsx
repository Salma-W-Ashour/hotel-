import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import { useState } from "react";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider value={{ darkMode, setDarkMode }}>
      <div
        className={`flex min-h-screen transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <Topbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main Content */}
          <main
            className={`p-6 mt-12 flex-1 overflow-auto transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;

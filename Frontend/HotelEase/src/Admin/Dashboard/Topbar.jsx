import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Topbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div
      className={`topbar ${
        darkMode ? "bg-gray-900 text-white" : "bg-white shadow-md"
      } p-4 flex justify-between items-center`}
    >
      <h3 className="text-xl font-semibold">Admin Dashboard</h3>
      <div className="flex items-center gap-4">
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle size={30} />
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

// import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
// import { useState } from "react";

// const Topbar = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div
//       className={`topbar ${
//         darkMode ? "bg-gray-900 text-white" : "bg-white shadow-md"
//       } p-4 flex justify-between items-center`}
//     >
//       <h3 className="text-xl font-semibold">Admin Dashboard</h3>
//       <div className="flex items-center gap-4">
//         <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//         <div className="flex items-center gap-2">
//           <FaUserCircle size={30} />
//           <span className="font-medium">Admin</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;

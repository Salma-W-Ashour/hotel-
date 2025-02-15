import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // أيقونة القائمة
import logo from "../../assets/images/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Hotels", href: "/hotels" },
  { name: "Blog", href: "/services" },
  { name: "Contact", href: "/contact-us" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-blue-900 text-white shadow-md"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-yellow-400 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {menuOpen ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block w-6 h-6" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-2xl font-bold text-white flex items-center"
                >
                  <img
                    className="block w-auto h-8 mr-2"
                    src={logo}
                    alt="Logo"
                  />
                  BookIn
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:block lg:ml-10">
                <div className="flex space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "text-white hover:text-yellow-400 hover:border-yellow-400",
                        "px-3 py-2 text-sm font-medium transition-colors duration-300 border-b-2 border-transparent"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-blue-900 hover:text-yellow-400 transition duration-300">
                  SIGN IN
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-white hover:text-yellow-400 hover:border-yellow-400",
                    "block px-3 py-2 text-base font-medium border-b-2 border-transparent transition-colors duration-300"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3 pb-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-blue-900 hover:text-yellow-400 transition duration-300">
                  SIGN IN
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa"; // استيراد أيقونة hamburger من Font Awesome

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav className="absolute top-0 left-0 right-0 z-50 bg-blue-900 text-white">
//       {/* إضافة hidden في الشاشات الصغيرة */}
//       <div className="container mx-auto flex justify-between items-center px-6 py-4 z-50 md:flex hidden">
//         {/* الشعار */}
//         <div className="text-2xl font-bold text-white w-1/4">
//           <Link to="#">BookIn</Link>
//         </div>

//         {/* الروابط في الشاشات الكبيرة */}
//         <div className="flex justify-center space-x-8 w-2/4 z-50 flex items-center">
//           {[
//             { name: "Home", href: "/" },
//             { name: "About Us", href: "/about" },
//             { name: "Hotels", href: "/hotels" },
//             { name: "Blog", href: "/services" },
//             { name: "Contact", href: "/contact-us" },
//           ].map((link) => (
//             <Link
//               key={link.name}
//               to={link.href}
//               className="whitespace-nowrap border-b-2 rounded-md border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* زر الحجز - في الشاشات الكبيرة */}
//         <div className="flex justify-end w-1/4 z-50">
//           <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-yellow-400">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* قائمة تنقل منسدلة في الأجهزة الصغيرة */}
//       <div className="md:hidden flex justify-between px-6 py-4 z-50">
//         {/* الشعار */}
//         <div className="text-2xl font-bold text-white">
//           <Link to="#">BookIn</Link>
//         </div>

//         {/* أيقونة hamburger */}
//         <div>
//           <button
//             onClick={toggleMenu}
//             className="text-white text-3xl transition-transform duration-300 transform hover:rotate-90"
//           >
//             <FaBars />
//           </button>
//         </div>
//       </div>

//       {/* القائمة المنسدلة */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-900 text-white flex flex-col items-center py-4 z-50">
//           {[
//             { name: "Home", href: "/" },
//             { name: "About Us", href: "/about" },
//             { name: "Hotels", href: "/hotels" },
//             { name: "Blog", href: "/blog" },
//             { name: "Contact", href: "/contact" },
//           ].map((link) => (
//             <Link
//               key={link.name}
//               to={link.href}
//               className="border-b-2 rounded-md border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300 py-2"
//               onClick={() => setMenuOpen(false)} // غلق القائمة بعد الضغط
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* زر الحجز في القائمة المنسدلة */}
//           <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-yellow-400 mt-4">
//             Book Now
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Header;

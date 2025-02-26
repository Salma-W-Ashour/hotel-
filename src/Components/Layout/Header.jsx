import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../Auth/context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Hotels", href: "/hotels" },
  { name: "Services", href: "/services" },
  { name: "MyBookings", href: "/my-bookings", isPrivate: true },
  { name: "Contact", href: "/contact-us" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout(); // تسجيل الخروج
    } else {
      navigate("/sign-in"); // إعادة التوجيه لتسجيل الدخول
    }
  };

  const handleBookNow = () => {
    if (!user) {
      // alert("Please log in before booking.");
      toast.info(
        <div>
          <p className="font-semibold">Authentication Required</p>
          <p className="text-sm">Redirecting to login page...</p>
        </div>,
        {
          duration: 6000,
          icon: "🔒",
          style: {
            border: "1px solid #3b82f6",
            padding: "16px",
            background: "#eff6ff",
            color: "#1e3a8a",
          },
        }
      );

      setTimeout(() => {
        navigate("/sign-in");
      }, 6000);
    } else {
      navigate("/hotels");
    }
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-blue-900 text-white shadow-md"
    >
      {({ open }) => (
        <>
          <ToastContainer />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
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
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-2xl font-bold text-white flex items-center"
                >
                  BookIn
                </Link>
              </div>
              <div className="hidden lg:block lg:ml-10">
                <div className="flex space-x-6">
                  {navigation.map((item) => {
                    // تجاهل عنصر "MyBookings" إذا لم يكن المستخدم مسجلاً
                    if (item.isPrivate && !user) {
                      return null;
                    }
                    return (
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
                    );
                  })}
                </div>
              </div>
              <div className="hidden lg:flex space-x-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-blue-900 hover:text-yellow-400 transition duration-300"
                  onClick={handleAuth}
                >
                  {user ? "LOG OUT" : "SIGN IN"}
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                if (item.isPrivate && !user) {
                  return null;
                }
                return (
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
                );
              })}
              <div className="flex flex-col space-y-2 pt-3 pb-3">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 border-2 border-yellow-400 rounded-full hover:bg-blue-900 hover:text-yellow-400 transition duration-300"
                  onClick={handleAuth}
                >
                  {user ? "LOG OUT" : "SIGN IN"}
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border-2 border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
                  onClick={handleBookNow}
                >
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

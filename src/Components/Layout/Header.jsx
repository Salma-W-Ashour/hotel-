import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChevronRight,
  FaUser,
  FaHotel,
  FaBell,
} from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessagesModal from "../../Pages/Notifications";

const navigation = [
  { name: "Home", href: "/", icon: FaChevronRight },
  { name: "About", href: "/about", icon: FaChevronRight },
  { name: "Hotels", href: "/hotels", icon: FaHotel },
  { name: "Services", href: "/services", icon: FaChevronRight },
  { name: "Bookings", href: "/my-bookings", isPrivate: true, icon: FaUser },
  { name: "Contact", href: "/contact-us", icon: FaChevronRight },
];

const NavLink = ({ to, children, currentPath, isScrolled }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="h-full flex items-center">
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
        currentPath === to
          ? "text-yellow-400"
          : isScrolled
          ? "text-blue-900 hover:text-yellow-400"
          : "text-white hover:text-yellow-400"
      }`}
    >
      {children}
      {currentPath === to && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
          layoutId="underline"
        />
      )}
    </Link>
  </motion.div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      const storedMessages =
        JSON.parse(localStorage.getItem("contactMessages")) || [];
      setMessages(storedMessages);
    };
    window.addEventListener("storage", loadMessages);
    loadMessages();
    return () => window.removeEventListener("storage", loadMessages);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth handler
  const handleAuth = () => {
    if (user) {
      logout();
      toast.success("Successfully logged out!", {
        icon: "👋",
        theme: "colored",
        style: { border: "1px solid #3b82f6" },
      });
    } else {
      navigate("/sign-in");
    }
  };

  // Booking handler
  const handleBookNow = () => {
    if (!user) {
      toast(
        <div className="flex items-center gap-3">
          <FiLogIn className="text-xl" />
          <div>
            <p className="font-semibold">Sign in required</p>
            <p className="text-sm">Redirecting to login...</p>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
          progressStyle: { background: "#3b82f6" },
        }
      );
      setTimeout(() => navigate("/sign-in"), 3000);
    } else {
      navigate("/hotels");
    }
  };

  // Reply handler with proper state management
  const handleNewReply = (messageId, replyContent) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === messageId) {
          const newReply = {
            content: replyContent,
            date: new Date().toISOString(),
            admin: false,
          };

          const updatedMessage = {
            ...message,
            status: "replied",
            replies: [...message.replies, newReply],
          };

          // Update localStorage
          const updatedMessages = prevMessages.map((msg) =>
            msg.id === messageId ? updatedMessage : msg
          );
          localStorage.setItem(
            "contactMessages",
            JSON.stringify(updatedMessages)
          );

          return updatedMessage;
        }
        return message;
      })
    );
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-xl" : "bg-blue-900"
      }`}
    >
      {({ open }) => (
        <>
          <ToastContainer position="bottom-right" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              {/* Brand Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center flex-shrink-0"
              >
                <Link
                  to="/"
                  className={`text-2xl font-bold flex items-center gap-3 ${
                    isScrolled ? "text-blue-900" : "text-white"
                  }`}
                >
                  <FaHotel className="text-3xl text-yellow-400" />
                  <span className="hidden sm:block">BookIn</span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex space-x-8">
                  {navigation.map((item) =>
                    item.isPrivate && !user ? null : (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        currentPath={location.pathname}
                        isScrolled={isScrolled}
                      >
                        {item.name}
                      </NavLink>
                    )
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6">
                {/* Notifications Bell */}
                {user && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative cursor-pointer"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <FaBell
                      className={`text-xl ${
                        isScrolled ? "text-blue-900" : "text-white"
                      }`}
                    />
                    {messages.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm"
                      >
                        {messages.length}
                      </motion.span>
                    )}
                  </motion.div>
                )}

                {/* Auth Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    isScrolled
                      ? "bg-blue-900 text-white hover:bg-blue-800"
                      : "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                  }`}
                  onClick={handleAuth}
                >
                  {user ? (
                    <FiLogOut className="text-lg" />
                  ) : (
                    <FiLogIn className="text-lg" />
                  )}
                  <span className="hidden lg:inline">
                    {user ? "Log Out" : "Sign In"}
                  </span>
                </motion.button>

                {/* Book Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    isScrolled
                      ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                      : "bg-blue-900 text-white hover:bg-blue-800"
                  }`}
                  onClick={handleBookNow}
                >
                  <FaHotel className="text-lg" />
                  <span className="hidden sm:inline">Book Now</span>
                </motion.button>

                {/* Mobile Menu Toggle */}
                <Disclosure.Button
                  className="lg:hidden p-2 ml-2 rounded-lg hover:bg-black/10"
                  style={{ color: isScrolled ? "#1e3a8a" : "white" }}
                >
                  <FaBars className="w-6 h-6" />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                static
                as={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden bg-white shadow-xl"
              >
                <div className="px-4 pt-2 pb-8 space-y-2">
                  {navigation.map((item) =>
                    item.isPrivate && !user ? null : (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-4 rounded-lg text-base ${
                          location.pathname === item.href
                            ? "bg-blue-100 text-blue-900"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="text-lg" />
                        {item.name}
                      </Disclosure.Button>
                    )
                  )}
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      className="flex items-center gap-3 px-4 py-4 bg-blue-900 text-white rounded-lg text-base"
                      onClick={handleAuth}
                    >
                      {user ? <FiLogOut /> : <FiLogIn />}
                      {user ? "Log Out" : "Sign In"}
                    </button>
                    <button
                      className="flex items-center gap-3 px-4 py-4 bg-yellow-400 text-blue-900 rounded-lg text-base"
                      onClick={handleBookNow}
                    >
                      <FaHotel />
                      Book Now
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            )}
          </AnimatePresence>

          {/* Notifications Panel */}
          <MessagesModal
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            messages={messages}
            onNewReply={handleNewReply}
          />
        </>
      )}
    </Disclosure>
  );
};

export default Header;

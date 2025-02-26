// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Img404 from "../assets/images/404.jpeg";

// const NotFoundPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white shadow-lg rounded-2xl p-10 max-w-md"
//       >
//         <h1 className="text-6xl font-bold text-blue-600">404</h1>
//         <p className="text-gray-600 text-lg mt-4">
//           Sorry, we can't find this page!
//         </p>
//         <p className="text-gray-500 text-sm mt-2">
//           Maybe you mistyped the address, or the room you're looking for is
//           unavailable.
//         </p>
//         <div className="relative mt-6">
//           <img
//             // src="https://source.unsplash.com/400x300/?hotel,room"
//             src={Img404}
//             alt="Hotel Room"
//             className="rounded-lg shadow-md"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
//         </div>
//         <Link
//           to="/"
//           className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
//         >
//           Back to Home
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default NotFoundPage;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Img404 from "../assets/images/404.jpeg";
// import useSound from "use-sound"; // Optional

const NotFoundPage = () => {
  // Optional sound effect
  // const [play] = useSound("/sounds/error.mp3");

  // useEffect(() => {
  //   play();
  // }, [play]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 max-w-md border border-blue-100 dark:border-gray-700"
        role="alert"
        aria-live="polite"
      >
        <motion.h1
          className="text-9xl font-black text-blue-600 dark:text-blue-400 mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          404
        </motion.h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The page you're looking for might be temporarily unavailable or no
          longer exists.
        </p>

        <motion.div
          className="relative mt-6 group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src={Img404}
            alt="404 illustration"
            className="rounded-xl shadow-lg transform transition-transform duration-300"
            whileHover={{ rotate: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 rounded-xl" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;

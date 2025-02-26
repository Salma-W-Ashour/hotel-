import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Img404 from "../assets/images/404.jpeg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-md"
      >
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-gray-600 text-lg mt-4">
          Sorry, we can't find this page!
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Maybe you mistyped the address, or the room you're looking for is
          unavailable.
        </p>
        <div className="relative mt-6">
          <img
            // src="https://source.unsplash.com/400x300/?hotel,room"
            src={Img404}
            alt="Hotel Room"
            className="rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        </div>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

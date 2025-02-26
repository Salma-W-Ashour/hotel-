import React from "react";
import { useNavigate } from "react-router-dom"; // التنقل بين الصفحات
import { useAuth } from "../../Auth/context/AuthContext";

const OurGuest = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // التحقق مما إذا كان المستخدم مسجلاً

  const handleClick = () => {
    if (user) {
      navigate("/hotels"); // إذا كان المستخدم مسجلاً، انتقل إلى صفحة الفنادق
    } else {
      navigate("/sign-up"); // إذا لم يكن مسجلاً، انتقل إلى صفحة التسجيل
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-blue-50 shadow-md rounded-lg p-6 md:p-10 w-full mx-auto mt-10 items-center">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src="imgs/pexels-thorsten-technoman-109353-338504.jpg"
          alt="A luxury hotel experience"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-6 md:ml-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
          Be Our Guest!
        </h1>
        <p className="text-gray-600 mt-4 text-center md:text-left">
          As a member of our website, you’ll be recognized and rewarded across
          the global collection of hotels of Global Hotel Alliance. We offer
          recognition from Day One — so our benefits, DISCOVERY Dollars (D$),
          Experiences, and Live Local are available to you instantly, at all
          membership tiers at any of our properties, at home or away, with or
          without a stay.
        </p>
        <button
          className="mt-6 px-6 py-2 rounded-lg transition 
            text-white font-semibold 
            bg-blue-900 hover:bg-yellow-400 hover:scale-105"
          onClick={handleClick}
        >
          {user ? "Go to Hotels" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default OurGuest;

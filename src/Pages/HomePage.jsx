import React, { useState, useEffect } from "react";

import CardsLayout from "../Components/HomePage/CardsLayout";
import Header from "../Components/Layout/Header";
import OurGuest from "../Components/HomePage/OurGuest";
import OurServices from "../Components/HomePage/OurServices";
import OurVision from "../Components/HomePage/OurVision";
import Footer from "../Components/Layout/Footer";

import { FaArrowUp } from "react-icons/fa";

const Advantage = ({ imgSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-blue-600 mb-4">
        <img src={imgSrc} alt={title} className="w-12 h-12" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const advantages = [
  {
    imgSrc: "imgs/jar.png",
    title: "Make Reserving Money",
    description:
      "With Invite a friend and My Wallet you will save on your bookings",
  },
  {
    imgSrc: "imgs/deal.png",
    title: "Exclusive deals",
    description: "Get the best deals and offers straight to your inbox.",
  },
  {
    imgSrc: "imgs/discount (1).png",
    title: "Exclusive discounts",
    description: "Great discounts for members",
  },
  {
    imgSrc: "imgs/clock.png",
    title: "Book faster",
    description: "No need to fill in your details and use One-Click payment",
  },
  {
    imgSrc: "imgs/online.png",
    title: "Easy online processing",
    description: "Process booking requests, personal data, and invoices easily",
  },
];

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
        setShouldRender(true);
      } else {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500); // تأخير الإخفاء
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // if (!shouldRender) return null; // لا يتم عرض الزر إلا عند الحاجة

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gray-100">
        <OurVision />

        <section className="p-16 px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">
            Advantages of Booking with Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 p-6">
            {advantages.map((adv, index) => (
              <div key={index} className="">
                <Advantage {...adv} />
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all">
            Join the Reserving Club
          </button>
        </section>

        <section className="pb-8 px-6 text-center">
          <CardsLayout />
          <OurGuest />
          <OurServices />
        </section>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed flex justify-between items-center text-xl font-bold bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity transition-transform duration-500 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <FaArrowUp className="inline-block mr-2" fontSize={24} />
        UP
      </button>

      <Footer />
    </div>
  );
};

export default HomePage;

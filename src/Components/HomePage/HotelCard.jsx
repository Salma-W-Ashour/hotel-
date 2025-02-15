import React from "react";

const HotelCard = ({ roomNum, description, img }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {/* صورة الفندق */}
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={img}
        alt="Hotel Room"
      />

      {/* محتوى الغرفة */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{roomNum}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      {/* زر الحجز */}
      <div className="px-6 py-4">
        <a
          href="#"
          className="inline-block w-full text-center bg-blue-900 text-white font-semibold py-2 rounded hover:bg-yellow-400 transition duration-300"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default HotelCard;

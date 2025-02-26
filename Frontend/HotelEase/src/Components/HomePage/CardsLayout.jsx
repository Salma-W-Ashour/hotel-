import React from "react";
import HotelCard from "./HotelCard";

const arr = [
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card 0.",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card 1.",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card 2.",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card 3.",
    img: "imgs/bedroom-5664221_640.jpg",
  },
];

const CardsLayout = () => {
  return (
    <React.Fragment>
      <h2 className="text-2xl text-center font-semibold mb-12">
        Book now with the best price guarantee!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 justify-items-center w-full">
        {arr.map((hotel, index) => (
          <HotelCard
            key={index} // استخدام `key` لتحديد العنصر بشكل فريد
            roomNum={hotel.roomNum}
            description={hotel.description}
            img={hotel.img}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default CardsLayout;

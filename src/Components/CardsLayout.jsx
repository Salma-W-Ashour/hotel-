import React from "react";
import { HotelCard } from "./HotelCard";
let arr = [
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card 0.",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description:
      "This is a description for Card .This is a description for Card ",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card .",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card .",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card .",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card .",
    img: "imgs/bedroom-5664221_640.jpg",
  },
  {
    roomNum: "One Bedroom",
    description: "This is a description for Card .",
    img: "imgs/bedroom-5664221_640.jpg",
  },
];
export default function CardsLayout() {
  return (
    <>
      <h2 className="text-2xl text-center font-semibold mb-4">
        Book now with the best price guarantee!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {arr.map((hotel) => (
          <HotelCard
            roomNum={hotel.roomNum}
            description={hotel.description}
            img={hotel.img}
          />
        ))}
      </div>
    </>
  );
}

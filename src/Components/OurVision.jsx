import React from "react";

export default function OurVision() {
  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('/imgs/pexels-pixabay-258154.jpg')",
      }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Our vision is all about making memories with people who love to PLAY.
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Whether you re a couple or a family, come join us in a luxury dream
          vacation, <br />
          and enjoy some much-needed private relaxation.
        </p>
        <a
          href="#"
          className="bg-yellow-400 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 hover:scale-110 transition-transform duration-300"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}

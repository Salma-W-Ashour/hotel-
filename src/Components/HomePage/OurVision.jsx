import React from "react";

const OurVision = () => {
  return (
    <section
      className="relative bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('imgs/OIP.jpeg')",
        backgroundSize: "cover", // تأكد من أن الصورة تملأ الشاشة
        backgroundPosition: "center center",
      }}
    >
      {/* طبقة داكنة فوق الصورة لتعزيز النصوص */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative flex items-center justify-center min-h-screen text-center text-white px-6">
        <div className="z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 p-12 pb-2">
            Our vision is all about making memories with people who love to
            PLAY.
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Whether you're a couple or a family, come join us in a luxury dream
            vacation, <br />
            and enjoy some much-needed private relaxation.
          </p>
          <a
            href="#"
            className="bg-yellow-400 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurVision;

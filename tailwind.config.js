/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxl: "1520px", // يمكنك تعديل القيم وفقًا لاحتياجاتك
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backdropBlur: {
        md: "12px",
      },
      zIndex: {
        50: "50",
        60: "60",
      },
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "dots-slate-500": "radial-gradient(slategray 10%, transparent 11%)",
      },
      backgroundSize: {
        "20px": "20px 20px",
      },
    },
  },
  plugins: [],
};

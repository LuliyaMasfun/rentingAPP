// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { blue: "#4a52c4", lblue: "#54c0cf", grays: "#d3cecf" },
    },
  },
  plugins: [],
};

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: "#4a52c4",
        lblue: "#54c0cf",
        grey: "#D9D9D9",
        grays: "#d3cecf",
        yellows: "#E8E337",
        dgray: "#1E1E1E",
        white: "#EFEFEF",
      },
      backgroundImage: {
        "hero-pattern": "url('/public/bgLogin.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

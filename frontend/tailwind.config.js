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
        grays: "#d3cecf",
        yellows: "#E8E337",
        dgray: "#1e1e1e",
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

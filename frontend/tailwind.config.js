// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#4a52c4",
        lblue: "#54c0cf",
        grays: "#d3cecf",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

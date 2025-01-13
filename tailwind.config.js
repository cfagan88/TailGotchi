const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // Background colours
      primarylight: "#EDE7D4",
      primarydark: "#DCD0A7",
      // Border & headings
      navy: "#091540",
      // Standard button colour
      lightblue: "#0081a7",
      // Hover button colour
      mediumblue: "#00afb9",
    },
    extend: {
      fontFamily: {
        jersey25: ["Jersey25"],
      },
    },
  },
  plugins: [],
};

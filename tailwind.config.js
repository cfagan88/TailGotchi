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
      mediumblue: "#0081a7",
      // Hover button colour
      lightblue: "#00afb9",
      black: colors.black,
      white: colors.white,
    },
    extend: {
      fontFamily: {
        jersey25: ["Jersey25"],
      },
      fontSize: {
        h1: "2.5rem",
        h2: "2rem",
        h3: "1.75rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1.125rem",
        p: "1rem",
      },
    },
  },
  plugins: [],
};

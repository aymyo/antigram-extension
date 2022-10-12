/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    colors: {
      dark: "#202124",
      white: "white",
      gray: "#8492a6",
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      "gray-light": "#d3dce6"
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Sansita Swashed", "serif"]
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

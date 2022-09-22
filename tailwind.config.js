/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#212121",
      },
      fontFamily: {
        Ubuntu: ['Ubuntu',"sans-serif"],
      },
      keyframes: {
        slideUp: {
          "from": { transform: "translateY(90vh)"},
          "to": { transform: "translateY(0)" }
        }
      },
      animation: {
        slideUp: "slideUp 0.3s linear"
      }
    },
  },
  plugins: [],
}

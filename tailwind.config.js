/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        goudy: ["'Goudy Bookletter 1911'", "serif"],
      },
      screens: {
        navbreak: "894px",
      },
      colors: {
        mud: "#323226",
        clay: "#bcc0a7",
        lettuce: "#f0f5d5",
      },
    }, 
  },
  plugins: [],
};






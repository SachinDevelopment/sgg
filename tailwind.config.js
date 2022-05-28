module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        200: "65rem",
        150: "26rem",
      },
      colors: {
        darkBlue: "#1D3557",
        darkRed: "#640D14",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")]
}

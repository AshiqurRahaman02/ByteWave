/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customTeal: "#75b09c",
        customYellow: "#fde047",
        customGreen: "#15803d",
      },
    }
  },
  plugins: [],
}


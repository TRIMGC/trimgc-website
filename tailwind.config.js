/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0E3F2A",
          light:   "#125339",
          dark:    "#0A3321",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "340px",
        md: "540px",
        lg: "768px",
        xl: "1180px",
      },
      container: {
        center: true,
        padding: {
          default: "12px",
          md: "32px",
        },
      },
      colors: {
        main_verde: "#7FAD39",
        main_gris: "#F5F5F5",
      },
    },
  },
  plugins: [],
};

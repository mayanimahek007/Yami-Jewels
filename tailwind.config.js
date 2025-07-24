/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true,
      // padding: '2.5rem',
      screens: {
        "sm": '640px', // Small screens and up
        "md": '768px', // Medium screens and up
        "lg": '1024px', // Large screens and up
        "xl": '1280px', // Extra large screens and up
        '2xl': '1536px', // 2X large screens and up
      },
       fontFamily: {
      montserrat: ['Montserrat', 'Arial', 'sans-serif'],
    },
    },
  },
  plugins: [],
}


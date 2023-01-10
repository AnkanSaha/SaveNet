/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx,pug,handlebars}"],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')]
}
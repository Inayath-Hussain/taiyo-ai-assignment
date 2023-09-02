/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'half': '50%'
      },
      colors: {
        'primary-btn': '#4ba5cd',
        'secondary-btn': '#ffefc2',
        'accent': '#f0cb5c'
      },
      gridTemplateColumns: {
        "auto-2": '1fr 1fr',
        "auto-3": '1fr 1fr 1fr'
      },
      screens: {
        "mobile-end": "450px"
      },
    },
  },
  plugins: [],
}

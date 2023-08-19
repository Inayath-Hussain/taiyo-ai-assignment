/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'search-url': 'url(/search.svg)'
      },
      borderRadius: {
        'half': '50%'
      },
      boxShadow: {
        'logout': '0 5px 20px -6px rgba(0, 0, 0, 0.7)',
        'info-card': '0px 2px 5px gray',
        'info-card-all-sides': '0px 0px 5px gray'
      },
      colors: {
        'navbar-bg': '#76cad4',
        'search': '#cfe7e7',
        'primary-btn': '#4ba5cd',
        'secondary-btn': '#ffefc2',
        'accent': '#f0cb5c'
      },
      gridTemplateColumns: {
        'single': '1fr',
        auto: 'repeat(auto-fill, minmax(200px, 1fr))',
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

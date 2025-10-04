/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#535486',
        'brand-light': '#998BD4',
        'brand-dark': '#2E3062',
        'brand-soft': '#E4E2F6'
      }
    },
  },
  plugins: [],
};

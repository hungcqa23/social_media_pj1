/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        font: '0 4px 4px rgba(0, 0, 0, 0.25)'
      },
      boxShadow: {
        default: '0 0 4px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};

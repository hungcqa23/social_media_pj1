/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js'
  ],
  theme: {
    extend: {
      dropShadow: {
        font: '0 4px 4px rgba(0, 0, 0, 0.25)'
        // normal: '0 0 4px rgba(0, 0, 0, 1)'
      },
      boxShadow: {
        default: '0 0 4px rgba(0, 0, 0, 1)'
      },
      width: {
        18: '4.5rem'
      },
      fontFamily: {
        cookie: ['"Cookie"', 'cursive']
      },
      flexGrow: {
        2: 2
      },
      transitionProperty: {
        height: 'height'
      },
      transitionTimingFunction: {
        normal: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};

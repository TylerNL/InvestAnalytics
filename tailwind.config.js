/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
      },
    },
  },
  plugins: [],
};

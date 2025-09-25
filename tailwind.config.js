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
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        primary: {
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f6ff',
          300: '#4ceeff',
          400: '#00e4ff',
          500: '#00c7e6',
          600: '#009fc2',
          700: '#007f9d',
          800: '#0a667f',
          900: '#0d546b',
        },
        accent: {
          50: '#fffef0',
          100: '#fffacc',
          200: '#fff399',
          300: '#ffe74c',
          400: '#ffd700',
          500: '#ffbe00',
          600: '#e29400',
          700: '#bc6a02',
          800: '#985208',
          900: '#7c430b',
        },
      },
    },
  },
  plugins: [],
};

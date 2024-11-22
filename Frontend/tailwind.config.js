/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#32CD32', // Light Green color for the loader
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        move: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30px)' },  // Move 30px right
          '100%': { transform: 'translateX(0)' },   // Reset to the original position
        },
        popUp: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        spin: 'spin 2s linear infinite', // Rotation animation
        gradient: 'gradient 3s ease infinite', // Gradient movement
        spinAndMove: 'spin 2s linear infinite, move 2s ease-in-out infinite', // Combined spin and move animation
        popUp: 'popUp 0.7s ease-out forwards', // Pop-up effect for text
      },
    },
  },
  plugins: [],
}

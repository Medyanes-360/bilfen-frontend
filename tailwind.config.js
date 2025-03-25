/* tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 5s linear infinite',
      },
      keyframes: {
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      colors: {
        'orange': 'var(--color-orange)',
        'darklila': 'var(--color-darklila)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50:  '#FBF7F2',
          100: '#F2E8DC',
          200: '#E2CDB0',
          300: '#C9A77A',
          400: '#A87E4F',
          500: '#7A4F2A',
          600: '#5D4037',
          700: '#4E342E',
          800: '#3E2723',
          900: '#2A1A14',
          950: '#1A0F0A',
        },
        cream: {
          50:  '#FFFBF5',
          100: '#FAF3E7',
          200: '#F5E6D3',
          300: '#EDE0C8',
          400: '#E2CDB0',
        },
        gold: {
          400: '#E0C078',
          500: '#C9A961',
          600: '#B8860B',
          700: '#9A7209',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(rgba(42,26,20,0.55), rgba(42,26,20,0.75)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80')",
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(62,39,35,0.35)',
        'gold': '0 0 0 1px rgba(201,169,97,0.4), 0 8px 20px -8px rgba(201,169,97,0.5)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'steam':       'steam 3s ease-in-out infinite',
        'fill-coffee': 'fillCoffee 2.4s ease-in-out forwards',
        'wiggle':      'wiggle 0.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        steam: {
          '0%':   { opacity: 0.2, transform: 'translateY(0) scale(1)' },
          '50%':  { opacity: 0.6, transform: 'translateY(-20px) scale(1.1)' },
          '100%': { opacity: 0,   transform: 'translateY(-40px) scale(1.3)' },
        },
        fillCoffee: {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(8%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':       { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

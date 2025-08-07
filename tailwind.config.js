/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          500: '#2C5282',
          600: '#2A4E7C',
          700: '#243E68',
        },
        secondary: {
          50: '#FFF7ED',
          100: '#FDBA74',
          500: '#ED8936',
          600: '#DD7724',
          700: '#C05621',
        },
        accent: {
          50: '#F0FFF4',
          100: '#9AE6B4',
          500: '#38A169',
          600: '#2F855A',
          700: '#276749',
        },
        success: '#48BB78',
        warning: '#F6AD55',
        error: '#F56565',
        info: '#4299E1',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2C5282 0%, #4299E1 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ED8936 0%, #F6AD55 100%)',
        'gradient-accent': 'linear-gradient(135deg, #38A169 0%, #48BB78 100%)',
      },
    },
  },
  plugins: [],
}
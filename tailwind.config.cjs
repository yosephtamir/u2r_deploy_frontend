/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#0D1B2A', // Dark navy blue
          105: '#1B263B', // Darker navy blue
          110: '#112B41', // Slightly darker
          115: '#1B324D', // Dark slate blue
          200: '#243B55', // Deep blue
          300: '#2C3E50', // Blue-gray
          400: '#34495E', // Muted blue
          405: 'rgba(36, 59, 85, 0.5)', // Deep blue with opacity
          500: '#3E506A', // Grayish blue
          600: 'rgba(36, 59, 85, 0.5)', // Consistent with 405 for cohesion
          700: 'rgba(36, 59, 85, 0.9)', // Darker blue with opacity
          800: 'rgba(29, 45, 68, 0.8)', // Dark navy blue with opacity
          900: 'rgba(29, 45, 68, 0.4)', // Lighter navy blue with opacity
        },
        white: {
          100: '#FFF', // white
          105: '#F0F0F0', // Very light gray
          110: '#E6E6E6', // Light gray
          115: '#D9D9D9', // Medium light gray
          200: '#CCCCCC', // Medium gray
          300: '#B3B3B3', // Medium dark gray
          400: '#999999', // Dark gray
          405: '#808080', // Darker gray
          500: '#666666', // Very dark gray
        },
        brand: {
          Light_Sky_Blue: {
            primary: '#64D1FF',
            hover: '#86DAFF', // Slightly lighter for hover effect
            focused: '#64D1FF', // Same as primary for focused
            pressed: '#4BB8E6', // Slightly darker for pressed effect
            shd: '#CAEAF9', // Lighter shade
            ttr: '#F0F9FF', // Very light tint
            shade0: '#000000', // Black
            shade10: '#0D2E40', // Darker blue
            shade20: '#1A5C80', // Dark blue
            shade40: '#3399CC', // Medium dark blue
            shade50: '#4CB2E6', // Slightly darker than primary
            shade70: '#99DDFF', // Light blue
            shade80: '#B3E4FF', // Lighter blue
            shade90: '#CCF2FF', // Very light blue
            shade95: '#E6F9FF', // Almost white blue
          },
          red: {
            primary: '#FF2E2E',
            hover: '#FF5C5C',
            focused: '#FF2E2E',
            pressed: '#FF2E2E',
          },
          success: {
            primary: '#06C270',
            hover: '#39D98A',
            focused: '#06C270',
            pressed: '#06C270',
          },
          disabled: '#E1E3E2',
          disabled2: '#C4C7C6',
        },
      },
      fontFamily: {
        // variable and include fallback fonts from tailwind default theme
        ppReg: ['var(--font-ppReg)'],
        ppB: ['var(--font-ppB)'],
        ppEB: ['var(--font-ppEB)'],
        manropeL: ['var(--font-manropeL)'],
        manropeEL: ['var(--font-manropeEL)'],
        manropeB: ['var(--font-manropeB)'],
        manropeEB: ['var(--font-manropeEB)'],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

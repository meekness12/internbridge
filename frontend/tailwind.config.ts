import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563EB',
          dark: '#3B82F6',
        },
        ice: {
          slate: '#F1F5F9',
        },
        deep: {
          navy: '#0A1128',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'glass-light': 'rgba(255, 255, 255, 0.6)',
        'glass-dark': 'rgba(255, 255, 255, 0.03)',
      },
      borderColor: {
        'glass-light': 'rgba(255, 255, 255, 1)',
        'glass-dark': 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};

export default config;

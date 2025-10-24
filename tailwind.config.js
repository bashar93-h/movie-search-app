/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,js,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1E293B',
          dark: '#334155',
        },
        accent: {
          light: '#C59D5F',
          dark: '#FACC15',
        },
        background: {
          light: '#FAFAFA',
          dark: '#0F172A',
        },
        text: {
          light: '#111827',
          dark: '#E2E8F0',
        },
      },
    },
  },
  plugins: [],
}

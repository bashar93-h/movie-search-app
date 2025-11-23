/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,js,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        goldman: ['Goldman', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#1976D2',
          dark: '#1F1F1F',
        },
        secondary: {
          light: '#F0F0F0',
          dark: '#1E1E1E',
        },
        accent: {
          light: '#C59D5F',
          dark: '#FACC15',
        },
        background: {
          light: '#F5F5F5',
          dark: '#121212',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

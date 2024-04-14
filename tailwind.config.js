/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-grey':'#777777',
        'light-grey':'#F0F0F0',
        'tranparent-grey':'#D9D9D9',
        'dark':'#222222'
      },
      borderRadius:{
        'rounded-15':'15px'
      },
      screens:{
        xs:"480px",
        sm:'768px',
        md:'1060px'
      }
    },
  },
  plugins: [],
}


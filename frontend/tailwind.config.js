/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-bg': "url('./src/assets/Images/Login-bgImg.jpg')",
        'signup-bg': "url('./src/assets/Images/Signup-bg-img.jpg')",
      }),
     
    },
  },
  plugins: [],
}

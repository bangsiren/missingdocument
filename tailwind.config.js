module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    fontFamily: {
      sans: ['Open Sans', 'ubuntu', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8282E8"
        }
      }
    },
  },
  variants: {

  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

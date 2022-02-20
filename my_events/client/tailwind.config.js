module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#01161E',
      secondary: '#124559',
      success: '#598392',
      info: '#A1BAA4',
      white: '#FFF',
      green: 'rgb(134 239 172)',
      red: 'rgb(220 38 38)',
      black: "#000",
      grey: "rgba(32, 36, 42, 0.5)"
    },
    screens: {
      'sm': {'min': '320px', 'max': '734px'},
      // => @media (min-width: 640px) { ... }

      'md': {'min': '735px', 'max': '1024px'},
      // => @media (min-width: 1024px) { ... }

      'lg': {'min': '1025px'},
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

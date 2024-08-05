module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './App.{js,jsx,ts,tsx}',
      './src/**/*.{js,jsx,ts,tsx}',
      './src/compoenents/**/*.{js,jsx,ts,tsx}',
      './src/screens/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        primaryYellow: '#FFC43B',
        primaryWhite: '#FFFFFF',
        primaryBlack: '#000000',
        greyBlack: 'rgba(230, 232, 238, 1)',
        grey: 'rgba(112, 117, 133, 1)',
        neutralBlack: 'rgba(28, 28, 69, 1)',
        transparent: 'transparent',
        placeHolder: 'rgba(173, 176, 186, 1)',
        red: 'red',
        green: 'green',
        black50: 'rgba(0, 0, 0, 0.5)',
        background: '#F5F5F5',
        primary: '#FFC43B',
        secondary: '#9D9D9D',
        border: '#DDDDDD',
        backgroundLight: '#FFFFFF',
        backgroundDark: '#000000',
        textLight: '#000000',
        textDark: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

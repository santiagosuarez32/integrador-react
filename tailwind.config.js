module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Asegúrate de que esté esta línea!
  ],
  theme: {
    extend: {
      screens: {
        lg: "1024px", // Asegúrate que coincida con las pantallas grandes por defecto
      },
    },
  },

  plugins: [],
};

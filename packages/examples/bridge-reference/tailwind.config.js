module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  darkMode: "media",
  theme: {
    extend: {
      scale: {
        100: "1",
        101: "1.01",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

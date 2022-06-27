module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#F3F3F7",
        bgDarkest: "#2a2e38",
        bgDarker: "#2F343F",
        bgDark: "#383C4A",
        bgSemiDark: "#404552",
        borderDark: "#2B2E39",
        light: "#D3DAE3",
        grayed: "#858A96",
        accent: "#5090DC",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      border: ["first"],
    },
  },
};

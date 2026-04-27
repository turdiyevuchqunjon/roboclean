import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a14",
          900: "#11121f",
          800: "#1a1c2e",
        },
        gold: {
          400: "#f5b544",
          500: "#e6a02d",
        },
        violet: {
          500: "#6d5cff",
          600: "#5b4ae6",
        },
        emerald: {
          500: "#10b981",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

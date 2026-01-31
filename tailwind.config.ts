import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        spider: {
          black: "#000000",
          red: "#E62429",
          blue: "#1A73E8",
          white: "#FFFFFF",
          gray: "#2C2C2C",
          neon: "#00D4FF",
          danger: "#FF6B6B",
        }
      },
      fontFamily: {
        barrio: ["Barrio", "cursive"],
        sacramento: ["Sacramento", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "web-spin": "web-spin 20s linear infinite",
        "spider-swing": "spider-swing 0.5s ease-in-out",
        "pulse-red": "pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "web-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spider-swing": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ["var(--font-jetbrains-mono)"],
        heading: ["var(--font-nunito)"],
        body: ["var(--font-inter)"],
      },
      colors: {
        // colors are arranged in ascending order of darkness, more value more darker color
        "echo-white": {
          100: "#f1f1f1",
          200: "#d2d2d2",
          300: "#b3b3b3",
          400: "#959595",
          500: "#797979",
          600: "#5d5d5d",
          700: "#434343",
          800: "#2b2b2b",
          900: "#141414",
          1000: "#030303",
        },
        "echo-black": {
          100: "#0f0f0f",
          200: "#0b0b0b",
          300: "#080808",
          400: "#050505",
          500: "#030303",
          600: "#020202",
          700: "#010101",
          800: "#000000",
        },
        "echo-gray": {
          100: "#272727",
          200: "#202020",
          300: "#1a1a1a",
          400: "#141414",
          500: "#0e0e0e",
          600: "#080808",
          700: "#040404",
          800: "#020202",
          900: "#010101",
          1000: "#000000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

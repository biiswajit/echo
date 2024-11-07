import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair-display)"],
        primary: ["var(--font-lato)"],
        body: ["var(--font-inter)"],
      },
      colors: {
        "echo-blue": {
          0: "#C7D0FF",
          50: "#7F8FF1",
          100: "#615EFC",
        },
        "echo-orange": {
          0: "#FFA366",
          50: "#FF8433",
          100: "#FF6500",
        },
        "echo-white": {
          0: "#FFFFFF",
          100: "#F6F9FC",
        },
        "echo-black": {
          0: "#183C62",
          50: "#031228",
          100: "#000000",
        },
        "echo-gray": {
          0: "#F2EFE5",
          25: "#E3E1D9",
          50: "#C7C8CC",
          75: "#B4B4B8",
          100: "#535763",
        },
      },
    },
  },
  plugins: [],
};
export default config;
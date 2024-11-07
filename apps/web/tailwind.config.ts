import type { Config } from "tailwindcss";
import sharedConfig from "@echo/tailwind-config"

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{tsx, jsx, ts, js}"
  ],
  presets: [sharedConfig],
};

export default config;
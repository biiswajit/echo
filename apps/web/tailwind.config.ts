import type { Config } from "tailwindcss";
import sharedConfig from "@echo/tailwind-config/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
      ],
      theme: {
        ...sharedConfig?.theme?.extend,
        extend: {
          backgroundImage: {
            "primary-gradient": "url('/primary_gradient.png')",
          },
        },
      },
      plugins: [],
    }
  ]
};
export default config;
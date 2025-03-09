import localFont from "next/font/local";

export const IBMPlexMono = localFont({
  src: [
    {
      path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-Bold.ttf",
      style: "normal",
      weight: "700"
    },
    {
        path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-BoldItalic.ttf",
        style: "italic",
        weight: "700"
    },
    {
        path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-Medium.ttf",
        style: "normal",
        weight: "500"
    },
    {
        path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-MediumItalic.ttf",
        style: "italic",
        weight: "500"
    },
    {
        path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-Regular.ttf",
        style: "normal",
        weight: "400"
    },
    {
        path: "../node_modules/@echo/tailwind-config/fonts/IBMPlexMono-Italic.ttf",
        style: "italic",
        weight: "400"
    }
  ],
  variable: "--font-ibmplexmono",
  display: "swap",
});

export const Inter = localFont({
  src: [
    {
      path: "../node_modules/@echo/tailwind-config/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
    {
      path: "../node_modules/@echo/tailwind-config/fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const JetbrainsMono = localFont({
  src: [
    {
      path: "../node_modules/@echo/tailwind-config/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../node_modules/@echo/tailwind-config/fonts/JetBrainsMono-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-jetbrainsmono",
  display: "swap",
});
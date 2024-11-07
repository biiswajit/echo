import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "./Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
    {
      path: "./Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const lato = localFont({
  src: [
    {
      path: "./Lato-Black.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "./Lato-BlackItalic.ttf",
      style: "italic",
      weight: "900",
    },
    {
      path: "./Lato-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./Lato-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "./Lato-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./Lato-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "./Lato-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./Lato-LightItalic.ttf",
      style: "italic",
      weight: "300",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const playfairDisplay = localFont({
  src: [
    {
      path: "./PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair-display",
  display: "swap",
});
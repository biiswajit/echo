import localFont from "next/font/local";

export const Inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const JetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const Nunito = localFont({
  src: [
    {
      path: "../../public/fonts/Nunito-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../../public/fonts/Nunito-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
});

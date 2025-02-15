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

export const Resonate = localFont({
  src: [
    {
      path: "../../public/fonts/Resonate-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../../public/fonts/Resonate-ExtraBoldOblique.ttf",
      style: "italic",
      weight: "800",
    },
    {
      path: "../../public/fonts/Resonate-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/Resonate-BoldOblique.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../../public/fonts/Resonate-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/Resonate-SemiBoldOblique.ttf",
      style: "italic",
      weight: "600",
    },
    {
      path: "../../public/fonts/Resonate-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/Resonate-MediumOblique.ttf",
      style: "italic",
      weight: "500",
    },
    {
      path: "../../public/fonts/Resonate-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/Resonate-Oblique.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/fonts/Resonate-Light.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../../public/fonts/Resonate-LightOblique.ttf",
      style: "italic",
      weight: "200",
    }
  ],
  variable: "--font-resonate",
  display: "swap",
});
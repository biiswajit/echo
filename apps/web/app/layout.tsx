import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, JetbrainsMono, Nunito } from "@/styles/font";

export const metadata: Metadata = {
  title: "Echo",
  description:
    "Echo is an GPT mapper, that will map your prompt to an appropriate GPT for better answer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Inter.variable} ${JetbrainsMono.variable} ${Nunito.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

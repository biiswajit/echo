import type { Metadata } from "next";
import "@/styles/globals.css";
import { IBMPlexMono, Inter, LibreBaskerville } from "@/styles/font";

export const metadata: Metadata = {
  title: "Echo",
  description: `Echo is a dynamic platform designed for bloggers to write, share, and collaborate on their blogs.
  Whether you're writing individually or as part of a group, Echo provides a seamless experience to craft and distribute your content.
  Engage with your audience, collaborate with fellow writers, and amplify your voice with Echo.
  Join the community of bloggers who are making an impact, one post at a time.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Inter.variable} ${IBMPlexMono.variable} ${LibreBaskerville.variable}`}>
        {children}
      </body>
    </html>
  );
}

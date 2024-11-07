import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, lato, playfairDisplay } from "@/styles/font";

export const metadata: Metadata = {
  title: "Echo - Your voice, your domain, your community",
  description: "Echo connects writers, readers, and communities with powerful tools for content creation, publishing, and engagement. Publish on custom domains, optimize for SEO, track advanced stats, and monetize your work. Pro features include branded profiles, analytics, and collaboration, empowering creators and developers alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable} ${playfairDisplay.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
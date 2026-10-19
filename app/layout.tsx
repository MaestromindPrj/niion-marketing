import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niion Marketing",
  description: "We Craft Your Brand — Digitally, Creatively, Boldly. Digital marketing, offline marketing, web development, and events by Niion Marketing.",
  icons: { icon: "/vendor/framerusercontent.com/images/3R1ieE0tQwdtUPl2URw3LpH6I.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="stylesheet" href="/site/original.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

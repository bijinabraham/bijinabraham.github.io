import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter, Caveat } from "next/font/google";
import { GridOverlay } from "@/components/GridOverlay";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijin Abraham",
  description:
    "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrains.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>
        <GridOverlay />
        {children}
      </body>
    </html>
  );
}

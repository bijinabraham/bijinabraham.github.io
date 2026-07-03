import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Inter, Caveat } from "next/font/google";
import { GridOverlay } from "@/components/GridOverlay";
import { Crosshair } from "@/components/Crosshair";
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
  metadataBase: new URL("https://bijinabraham.github.io"),
  title: "Bijin Abraham",
  description:
    "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
  authors: [{ name: "Bijin Abraham" }],
  openGraph: {
    title: "Bijin Abraham",
    description:
      "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
    url: "https://bijinabraham.github.io",
    siteName: "Bijin Abraham",
    type: "website",
    // images: [{ url: "/og-image.png" }], // TODO: add in Task 6.3
  },
  twitter: {
    card: "summary_large_image",
    title: "Bijin Abraham",
    description:
      "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <Crosshair />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bijin Abraham",
  description:
    "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

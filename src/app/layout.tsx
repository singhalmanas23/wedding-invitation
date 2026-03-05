import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T & S — A Wedding Celebration",
  description:
    "Join us in celebrating the wedding of T & S. A weekend of love, laughter, and happily ever after.",
  keywords: [
    "wedding",
    "celebration",
    "T & S",
    "wedding invitation",
    "RSVP",
    "wedding website",
  ],
  openGraph: {
    title: "T & S — A Wedding Celebration",
    description:
      "Join us in celebrating the wedding of T & S. A weekend of love, laughter, and happily ever after.",
    type: "website",
    locale: "en_US",
    siteName: "T & S Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "T & S — A Wedding Celebration",
    description:
      "Join us in celebrating the wedding of T & S. A weekend of love, laughter, and happily ever after.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} font-body antialiased overflow-x-hidden`}
        style={{ backgroundColor: "#1a0a0a", color: "#f5efe6" }}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

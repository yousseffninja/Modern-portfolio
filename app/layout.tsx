import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "A motion-first portfolio with scroll animation, glass lighting, and a soft blur under the header.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

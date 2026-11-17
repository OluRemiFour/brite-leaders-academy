import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brite Leaders Academy",
    template: "%s | Brite Leaders Academy",
  },
  description:
    "A supportive and inspiring learning environment where students develop academically, build strong character, and gain the confidence to shape their future.",
  icons: { icon: "/images/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#172B4D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}

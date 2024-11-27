import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/gradients.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Padel Cygnus",
  description: "Padel Tennis Club Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#020617]">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#020617]`}>
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f1729] to-[#1a2744]">
          {children}
        </div>
      </body>
    </html>
  );
}

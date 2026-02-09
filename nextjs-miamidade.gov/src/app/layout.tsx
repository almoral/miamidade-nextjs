import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisualEditing } from "@/components/VisualEditing";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miami-Dade County Services",
  description: "Find county services and information",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://review.miamidade.gov/resources/js/components/countyTemplate/styles.css" media="all" /> <noscript><link rel="stylesheet" href="https://review.miamidade.gov/resources/js/components/countyTemplate/styles.css" />
    </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <VisualEditing />

        <Script src="https://review.miamidade.gov/resources/js/components/countyTemplate/main.js"/>
      </body>
    </html>
  );
}

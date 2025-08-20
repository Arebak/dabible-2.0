import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DaBible Foundation",
  description: "Yoruba, Igbo, Hausa Audio and Written Bible App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
      <GoogleTagManager gtmId="GTM-5S7K5XS" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

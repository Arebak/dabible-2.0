import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
      <meta name="google-adsense-account" content="ca-pub-5381336693439124"></meta>
      <GoogleTagManager gtmId="GTM-5S7K5XS" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <ThemeProvider>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#023E8A] focus:text-white focus:px-4 focus:py-2 focus:rounded-md">Skip to content</a>
        {/* Google Tag Manager (noscript) retains GTM container only */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5S7K5XS" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

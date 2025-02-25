import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DFlipScripts from "@/components/DFlipScripts";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFlit - Simple PDF to Flipbook",
  description: "Convert your PDFs to interactive flipbooks easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/dflip.min.css" />
        <link rel="stylesheet" href="/css/themify-icons.min.css" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-gray-50/50">
            {children}
          </main>
          <Footer />
        </div>
        <DFlipScripts />
      </body>
    </html>
  );
}

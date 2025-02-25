import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DFlipScripts from "@/components/DFlipScripts";

const geist = Geist({
  subsets: ["latin"],
});

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
    <html lang="en" className={geist.className}>
      <head>
        {/* Add DFlip CSS files */}
        <link 
          rel="stylesheet" 
          href="/css/dflip.min.css"
          precedence="default"
        />
        <link 
          rel="stylesheet" 
          href="/css/themify-icons.min.css"
          precedence="default"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 bg-gray-50/50">
          {children}
        </main>
        <Footer />
        <DFlipScripts />
      </body>
    </html>
  );
}

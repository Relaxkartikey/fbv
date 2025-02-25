import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DFlipScripts from "@/components/DFlipScripts";

// Import DFlip CSS
import "public/css/dflip.min.css";
import "public/css/themify-icons.min.css";

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

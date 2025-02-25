import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DFlipScripts from "@/components/DFlipScripts";
import Script from "next/script";

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
      <body className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <Footer />
        <DFlipScripts />
        <Script id="load-dflip-css" strategy="beforeInteractive">
          {`
            const linkDflip = document.createElement('link');
            linkDflip.rel = 'stylesheet';
            linkDflip.href = '/css/dflip.min.css';
            document.head.appendChild(linkDflip);

            const linkThemify = document.createElement('link');
            linkThemify.rel = 'stylesheet';
            linkThemify.href = '/css/themify-icons.min.css';
            document.head.appendChild(linkThemify);
          `}
        </Script>
      </body>
    </html>
  );
}

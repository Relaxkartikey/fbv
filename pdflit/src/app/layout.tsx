import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDFlit - Simple PDF Viewer",
  description: "Upload and view PDFs with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="/dflip/css/dflip.min.css" rel="stylesheet" type="text/css" />
        <link href="/dflip/css/themify-icons.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script src="/dflip/js/libs/jquery.min.js" />
        <Script src="/dflip/js/libs/pdf.min.js" />
        <Script src="/dflip/js/libs/pdf.worker.min.js" />
        <Script src="/dflip/js/dflip.min.js" />
      </body>
    </html>
  );
}

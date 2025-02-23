import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

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
        <style>
          {`@import url('/dflip/css/dflip.min.css');
            @import url('/dflip/css/themify-icons.min.css');`}
        </style>
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script src="/dflip/js/libs/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/dflip/js/libs/pdf.min.js" strategy="beforeInteractive" />
        <Script src="/dflip/js/libs/pdf.worker.min.js" strategy="beforeInteractive" />
        <Script src="/dflip/js/dflip.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

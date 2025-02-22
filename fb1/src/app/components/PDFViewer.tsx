'use client';
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { initPDFJS } from '../lib/pdfjs-config';

// Initialize PDF.js
initPDFJS();

interface PDFViewerProps {
  pdfUrl: string;
  currentPage: number;
  zoom: number;
  onLoadComplete?: (totalPages: number) => void;
}

export default function PDFViewer({ pdfUrl, currentPage, zoom, onLoadComplete }: PDFViewerProps) {
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [prevPage, setPrevPage] = useState(currentPage);

  useEffect(() => {
    setDirection(currentPage > prevPage ? 'right' : 'left');
    setPrevPage(currentPage);
  }, [currentPage]);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    if (onLoadComplete) {
      onLoadComplete(numPages);
    }
  };

  const pageVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      rotateY: direction === 'right' ? -45 : 45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
      rotateY: direction === 'right' ? 45 : -45,
    }),
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
      <Document
        file={pdfUrl}
        onLoadSuccess={handleLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
        error={
          <div className="text-red-500 text-center p-4">
            Failed to load PDF. Please try again.
          </div>
        }
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.4 },
            }}
            style={{
              perspective: '1000px',
            }}
          >
            <Page
              pageNumber={currentPage}
              scale={zoom}
              className="shadow-lg"
              onLoadSuccess={(page) => {
                setPageWidth(page.width);
              }}
              width={pageWidth * zoom || undefined}
            />
          </motion.div>
        </AnimatePresence>
      </Document>
    </div>
  );
} 
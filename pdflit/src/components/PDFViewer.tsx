'use client';

import { useEffect, useRef } from 'react';

interface PDFViewerProps {
  url: string;
}

interface DFlipOptions {
  webgl: boolean;
  height: string;
  width: string;
  duration: number;
  singlePageMode: boolean;
  autoEnableOutline: boolean;
  autoEnableThumbnail: boolean;
  maxTextureSize: number;
  mobileViewMode: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  enableSound: boolean;
}

declare global {
  interface Window {
    DFLIP?: object;
    $?: JQueryStatic;
  }
}

interface JQueryStatic {
  (selector: string | Element): JQueryElement;
}

interface JQueryElement {
  flipBook: (url: string, options: DFlipOptions) => void;
  remove: () => void;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookInstanceRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const initializeDFlip = () => {
      if (!window.DFLIP || !window.$ || !currentContainer) return false;

      try {
        const $ = window.$;
        const isMobile = window.innerWidth < 768;

        // Clean up any existing instances
        if (bookInstanceRef.current) {
          $(`#${bookInstanceRef.current}`).remove();
        }

        // Create new book container with unique ID
        const bookId = `pdf_book_${Date.now()}`;
        bookInstanceRef.current = bookId;
        
        const bookContainer = document.createElement('div');
        bookContainer.id = bookId;
        currentContainer.appendChild(bookContainer);

        // Get the full URL for the PDF
        const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;

        // Initialize DFlip with responsive settings
        $(bookContainer).flipBook(fullUrl, {
          webgl: true,
          height: '100%',
          width: '100%',
          duration: 800,
          singlePageMode: isMobile,
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          maxTextureSize: 1600,
          mobileViewMode: 2, // Changed to 2 for better mobile view
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          enableSound: false
        });

        return true;
      } catch (error) {
        console.error('Error initializing DFlip:', error);
        return false;
      }
    };

    // Try to initialize with retry mechanism
    let attempts = 0;
    const maxAttempts = 50;
    const interval = setInterval(() => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(interval);
        console.error('Failed to load DFlip');
        return;
      }
      
      if (initializeDFlip()) {
        clearInterval(interval);
      }
    }, 200);

    // Handle window resize
    const handleResize = () => {
      initializeDFlip();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      if (window.$ && bookInstanceRef.current) {
        window.$(`#${bookInstanceRef.current}`).remove();
      }
    };
  }, [url]);

  return (
    <div ref={containerRef} className="w-full h-full bg-white" />
  );
} 
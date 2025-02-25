'use client';

import { useEffect, useRef } from 'react';

interface PDFViewerProps {
  url: string;
}

interface DFlipOptions {
  webgl: boolean;
  height: string;
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
  const initialized = useRef(false);
  const checkInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentContainer = containerRef.current;

    const initializeDFlip = () => {
      if (!window.DFLIP || !window.$ || !currentContainer) return false;

      try {
        const isMobile = window.innerWidth < 768;
        const $ = window.$;

        // Remove any existing instances
        const bookId = `pdf_book_${url.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        $(`#${bookId}`).remove();

        // Create new book container
        const bookContainer = document.createElement('div');
        bookContainer.id = bookId;
        currentContainer.appendChild(bookContainer);

        // Get the full URL for the PDF
        const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;

        // Initialize DFlip
        $(bookContainer).flipBook(fullUrl, {
          webgl: true,
          height: '100%',
          singlePageMode: isMobile,
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          maxTextureSize: 1600,
          mobileViewMode: 1,
          paddingLeft: isMobile ? 0 : 20,
          paddingRight: isMobile ? 0 : 20,
          paddingTop: 10,
          paddingBottom: 10,
          enableSound: false
        });

        initialized.current = true;
        return true;
      } catch (error) {
        console.error('Error initializing DFlip:', error);
        return false;
      }
    };

    // Try to initialize immediately
    const tryInitialize = () => {
      if (window.DFLIP && window.$ && !initialized.current) {
        return initializeDFlip();
      }
      return false;
    };

    // First attempt
    if (!tryInitialize()) {
      // If first attempt fails, try again after scripts load
      let attempts = 0;
      checkInterval.current = setInterval(() => {
        attempts++;
        if (attempts > 100) { // 10 seconds
          clearInterval(checkInterval.current);
          console.error('Failed to load DFlip after 10 seconds');
          return;
        }
        
        if (tryInitialize()) {
          clearInterval(checkInterval.current);
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
      if (window.$ && currentContainer) {
        window.$(`#pdf_book_${url.replace(/[^a-zA-Z0-9.-]/g, '_')}`).remove();
      }
      initialized.current = false;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="w-full h-full bg-white" />
  );
} 
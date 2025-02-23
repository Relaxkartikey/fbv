'use client';

import { useEffect } from 'react';

interface PDFViewerProps {
  url: string;
}

// Define types for DFLIP
interface DFlipDefaults {
  enableSound: boolean;
  webgl: boolean;
  singlePageMode: boolean;
  autoEnableOutline: boolean;
  autoEnableThumbnail: boolean;
  maxTextureSize: number;
  mobileViewMode: number;
  height: string;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  zoomRatio: number;
  backgroundColor: string;
}

interface DFlip {
  defaults: DFlipDefaults;
  createBook: (selector: string, options: DFlipBookOptions) => void;
}

interface DFlipBookOptions {
  source: string;
  id: string;
  height: string;
  paddingTop: number;
  paddingBottom: number;
}

interface WindowWithDFlip extends Window {
  DFLIP: DFlip;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  useEffect(() => {
    const configureDFlip = () => {
      if (typeof window !== 'undefined') {
        const dflip = (window as unknown as WindowWithDFlip).DFLIP;
        if (!dflip) return;

        const isMobile = window.innerWidth < 768;
        
        dflip.defaults.enableSound = false;
        dflip.defaults.webgl = true;
        dflip.defaults.singlePageMode = isMobile;
        dflip.defaults.autoEnableOutline = false;
        dflip.defaults.autoEnableThumbnail = false;
        dflip.defaults.maxTextureSize = 1600;
        dflip.defaults.mobileViewMode = 1;
        dflip.defaults.height = 'calc(100vh - 50px)';
        dflip.defaults.paddingLeft = isMobile ? 0 : 20;
        dflip.defaults.paddingRight = isMobile ? 0 : 20;
        dflip.defaults.paddingTop = 10;
        dflip.defaults.paddingBottom = 10;
        dflip.defaults.zoomRatio = 1.5;
        dflip.defaults.backgroundColor = 'transparent';
      }
    };

    // Initial configuration
    configureDFlip();

    // Handle window resize and orientation changes
    const handleResize = () => {
      configureDFlip();
      // Reload the viewer to apply new settings
      const viewer = document.getElementById('pdf_book');
      if (viewer) {
        viewer.innerHTML = '';
        const dflip = (window as unknown as WindowWithDFlip).DFLIP;
        if (!dflip) return;

        dflip.createBook('#pdf_book', {
          source: url,
          id: 'pdf_book',
          height: 'calc(100vh - 50px)',
          paddingTop: 10,
          paddingBottom: 10
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [url]);

  return (
    <div className="fixed inset-0 bg-white">
      <div 
        className="_df_book"
        style={{ 
          width: '100%', 
          height: 'calc(100vh - 50px)',
          marginTop: '10px'
        }}
        data-source={url}
        id="pdf_book"
      />
    </div>
  );
} 
'use client';

import { useEffect } from 'react';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  useEffect(() => {
    const configureDFlip = () => {
      if (typeof window !== 'undefined' && (window as any).DFLIP) {
        const isMobile = window.innerWidth < 768;
        (window as any).DFLIP.defaults.enableSound = false;
        (window as any).DFLIP.defaults.webgl = true;
        (window as any).DFLIP.defaults.singlePageMode = isMobile;
        (window as any).DFLIP.defaults.autoEnableOutline = false;
        (window as any).DFLIP.defaults.autoEnableThumbnail = false;
        (window as any).DFLIP.defaults.maxTextureSize = 1600;
        (window as any).DFLIP.defaults.mobileViewMode = 1;
        (window as any).DFLIP.defaults.height = 'calc(100vh - 50px)';
        (window as any).DFLIP.defaults.paddingLeft = isMobile ? 0 : 20;
        (window as any).DFLIP.defaults.paddingRight = isMobile ? 0 : 20;
        (window as any).DFLIP.defaults.paddingTop = 10;
        (window as any).DFLIP.defaults.paddingBottom = 10;
        (window as any).DFLIP.defaults.zoomRatio = 1.5;
        (window as any).DFLIP.defaults.backgroundColor = 'transparent';
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
        (window as any).DFLIP.createBook('#pdf_book', {
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
        source={url}
        id="pdf_book"
      />
    </div>
  );
} 
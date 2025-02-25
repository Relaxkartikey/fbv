'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function DFlipScripts() {
  useEffect(() => {
    // Initialize DFLIP on the window object
    window.DFLIP = window.DFLIP || {};
  }, []);

  return (
    <>
      <Script 
        src="/js/libs/jquery.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="/js/libs/three.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="/js/libs/mockup.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Mockup script loaded');
        }}
        onError={(e) => {
          console.error('Error loading mockup script:', e);
        }}
      />
      <Script 
        src="/js/libs/pdf.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="/js/libs/pdf.worker.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="/js/libs/compatibility.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="/js/dflip.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('DFlip script loaded');
        }}
        onError={(e) => {
          console.error('Error loading DFlip script:', e);
        }}
      />
    </>
  );
} 
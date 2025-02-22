import { pdfjs } from 'react-pdf';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const loadPDF = async (url: string) => {
  try {
    const pdf = await pdfjs.getDocument(url).promise;
    return pdf;
  } catch (error) {
    console.error('Error loading PDF:', error);
    throw error;
  }
};

export const renderPage = async (pdf: any, pageNumber: number, scale: number = 1) => {
  try {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) throw new Error('Could not get canvas context');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
    
    return canvas.toDataURL();
  } catch (error) {
    console.error('Error rendering page:', error);
    throw error;
  }
}; 
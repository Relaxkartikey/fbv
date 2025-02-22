import { pdfjs } from 'react-pdf';

// The path to the PDF.js worker
const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const initPDFJS = () => {
  // This function can be called to ensure PDF.js is initialized
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }
};

export default pdfjs; 
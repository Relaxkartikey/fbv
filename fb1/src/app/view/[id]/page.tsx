'use client';
import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaSearch, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import PDFViewer from '@/app/components/PDFViewer';

export default function ViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        setLoading(true);
        setError('');

        // If the ID is 'sample', use the sample PDF from public directory
        if (resolvedParams.id === 'sample') {
          setPdfData('/sample.pdf');
          setTitle('Sample PDF');
          setLoading(false);
          return;
        }

        // Otherwise, fetch from the API
        const response = await fetch(`/api/pdf/${resolvedParams.id}`);
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid server response');
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch PDF');
        }

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch PDF');
        }

        setPdfData(`data:application/pdf;base64,${data.data}`);
        setTitle(data.title || 'Untitled PDF');
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setError(error instanceof Error ? error.message : 'Failed to load PDF. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();
  }, [resolvedParams.id]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  // Handle touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    setTouchStart(null);
  };

  const handleLoadComplete = (pages: number) => {
    setTotalPages(pages);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <a href="/" className="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin text-blue-600 text-4xl">
              <FaSearch />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaArrowLeft />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaSearchMinus />
                </button>
                <span>{Math.round(zoom * 100)}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaSearchPlus />
                </button>
              </div>
            </div>

            <motion.div
              className="aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                maxWidth: '800px',
                margin: '0 auto',
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {pdfData && (
                <PDFViewer
                  pdfUrl={pdfData}
                  currentPage={currentPage}
                  zoom={zoom}
                  onLoadComplete={handleLoadComplete}
                />
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
} 
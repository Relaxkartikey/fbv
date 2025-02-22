'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaSpinner, FaCheck, FaLink, FaEye } from 'react-icons/fa';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareLink, setShareLink] = useState('');
  const [viewLink, setViewLink] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB
        setError('File size must be less than 50MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress while the actual upload is happening
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const response = await fetch('/api/pdf/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned an invalid response');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadProgress(100);
      setShareLink(`${window.location.origin}/share/${data.shareId}`);
      setViewLink(`${window.location.origin}/view/${data.viewId}`);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload PDF. Please try again.');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    
    if (!droppedFile) {
      setError('No file dropped');
      return;
    }

    if (droppedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    if (droppedFile.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setFile(droppedFile);
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Your PDF</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!shareLink ? (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <FaUpload className="text-4xl text-gray-400" />
                  <div>
                    <p className="text-lg font-semibold">
                      {file ? file.name : 'Drop your PDF here or click to browse'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Maximum file size: 50MB
                    </p>
                  </div>
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              {file && !error && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Uploading... {uploadProgress}%
                    </span>
                  ) : (
                    'Upload PDF'
                  )}
                </motion.button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center text-green-500 text-6xl">
                <FaCheck />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Upload Complete!</h2>
                <p className="text-gray-600">Your PDF has been converted to a flipbook</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <FaLink className="text-blue-600" />
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-transparent outline-none"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(shareLink)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <FaEye className="text-blue-600" />
                  <input
                    type="text"
                    value={viewLink}
                    readOnly
                    className="flex-1 bg-transparent outline-none"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(viewLink)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 
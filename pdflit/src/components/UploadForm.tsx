'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setProgress(0);
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      router.push(`/view/${data.shareId}`);
    } catch (error) {
      console.error('Upload failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          onClick={() => inputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
            transition-all duration-200 bg-white
            ${dragActive 
              ? 'border-gray-800 bg-gray-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-800 to-gray-600 
              rounded-xl flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-800">
                {file ? file.name : 'Drop your PDF here, or click to select'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Maximum file size: 10MB
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className={`
            w-full py-4 rounded-xl font-medium text-white
            transition-all duration-200 relative
            ${!file 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600'
            }
          `}
        >
          <span className={loading ? 'opacity-0' : 'opacity-100'}>
            {loading ? 'Uploading...' : 'Upload PDF'}
          </span>
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{progress}%</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
} 
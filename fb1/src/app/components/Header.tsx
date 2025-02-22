'use client';
import Link from 'next/link';
import { FaUpload } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          FlipPDF
        </Link>
        <Link
          href="/upload"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaUpload />
          <span>Upload PDF</span>
        </Link>
      </div>
    </header>
  );
} 
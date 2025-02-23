import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 md:py-6 px-4 md:px-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          PdFlip
        </Link>
        <Link
          href="/upload"
          className="inline-flex items-center px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 
            text-white rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-200 
            shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.4)]
            font-medium text-sm whitespace-nowrap gap-1 md:gap-2"
        >
          <span>PDF</span>
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>FlipBook</span>
        </Link>
      </div>
    </header>
  );
} 
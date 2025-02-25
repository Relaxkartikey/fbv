import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-24">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Showcase Your PDFs as Flipbooks
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Transform your PDFs into interactive flipbooks. Upload once, share anywhere, and experience reading like never before.
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 
            text-white rounded-lg text-lg font-medium hover:from-gray-700 hover:to-gray-600 
            transition-all duration-200 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] 
            hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.4)]"
        >
          Start Now
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-16">
        <div className="p-8 bg-white rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] 
          hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 
          border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl 
            flex items-center justify-center text-white mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Easy Upload</h3>
          <p className="text-gray-600 leading-relaxed">
            Simply drag and drop your PDF or click to upload. We handle the rest with instant processing.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] 
          hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 
          border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl 
            flex items-center justify-center text-white mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Share</h3>
          <p className="text-gray-600 leading-relaxed">
            Get an instant shareable link for your flipbook. Perfect for sharing with colleagues or clients.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] 
          hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 
          border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl 
            flex items-center justify-center text-white mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Smart Controls</h3>
          <p className="text-gray-600 leading-relaxed">
            Intuitive controls for flipping pages, zooming, and navigating. Works seamlessly on all devices.
          </p>
        </div>
      </section>
    </div>
  );
}

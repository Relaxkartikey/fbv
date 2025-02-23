export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          Developed By{' '}
          <a 
            href="https://kartikey.tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
          >
            @RelaxKartikey
          </a>
          {' '} | {' '}
          <span>
            <a 
              href="https://anag.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-gray-800 hover:text-gray-600 transition-colors"
            >
              @AnagAggarwal
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
} 
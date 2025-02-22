'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} FlipPDF. All rights reserved.</p>
      </div>
    </footer>
  );
} 
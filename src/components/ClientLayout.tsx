'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isViewPage = pathname?.startsWith("/view/");

  return (
    <div className="flex flex-col min-h-screen">
      {!isViewPage && <Header />}
      <main className={`flex-grow ${!isViewPage ? 'bg-gray-50 py-8' : ''}`}>
        {children}
      </main>
      {!isViewPage && <Footer />}
    </div>
  );
} 
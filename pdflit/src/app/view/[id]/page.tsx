import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PDFViewer from '@/components/PDFViewer';
import type { Metadata } from 'next';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata({
  params,
}: {
  params: { id: string };
  searchParams: SearchParams;
}): Promise<Metadata> {
  try {
    const pdf = await prisma.pDF.findUnique({
      where: { shareId: params.id },
    });

    return {
      title: pdf ? `Viewing ${pdf.filename} - PDFlit` : 'PDF Not Found - PDFlit',
      description: pdf ? `Interactive flipbook view of ${pdf.filename}` : 'PDF not found',
      other: {
        layout: 'fullscreen'
      }
    };
  } catch {
    return {
      title: 'Error - PDFlit',
      description: 'Error loading PDF',
      other: {
        layout: 'fullscreen'
      }
    };
  }
}

export default async function Page({
  params,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) {
  try {
    const pdf = await prisma.pDF.findUnique({
      where: { shareId: params.id },
    });

    if (!pdf) {
      notFound();
    }

    return (
      <div className="fixed inset-0 w-full h-full">
        <PDFViewer url={pdf.fileUrl} />
      </div>
    );
  } catch (err) {
    console.error('Error fetching PDF:', err);
    notFound();
  }
} 
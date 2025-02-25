import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PDFViewer from '@/components/PDFViewer';
import type { Metadata } from 'next';

interface GenerateMetadataProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  try {
    const pdf = await prisma.pDF.findUnique({
      where: { shareId: params.id },
    });

    return {
      title: pdf ? `Viewing ${pdf.filename} - PDFlit` : 'PDF Not Found - PDFlit',
      description: pdf ? `Interactive flipbook view of ${pdf.filename}` : 'PDF not found',
    };
  } catch {
    return {
      title: 'Error - PDFlit',
      description: 'Error loading PDF',
    };
  }
}

interface PageProps {
  params: { id: string };
}

export default async function page({ params }: PageProps) {
  try {
    const pdf = await prisma.pDF.findUnique({
      where: { shareId: params.id },
    });

    if (!pdf) {
      notFound();
    }

    return (
      <div className="w-full h-screen">
        <PDFViewer url={pdf.fileUrl} />
      </div>
    );
  } catch (err) {
    console.error('Error fetching PDF:', err);
    notFound();
  }
} 
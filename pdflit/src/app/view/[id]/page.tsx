import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PDFViewer from '@/components/PDFViewer';
import { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props
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

export default async function ViewPage(
  { params }: Props
) {
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
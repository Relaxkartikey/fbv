import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PDFViewer from '@/components/PDFViewer';
import type { Metadata } from 'next';

type PageParams = { id: string };

type Props = {
  params: PageParams;
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  
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

export default async function ViewPage(props: Props) {
  const { params } = props;
  
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
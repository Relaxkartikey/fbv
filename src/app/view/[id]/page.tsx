import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import PDFViewer from '@/components/PDFViewer';

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewPage({ params }: PageProps) {
  const { id } = await params;
  
  const pdf = await prisma.pDF.findUnique({
    where: { shareId: id },
  });

  if (!pdf) {
    notFound();
  }

  return <PDFViewer url={pdf.fileUrl} />;
} 
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Extract the original filename from the URL
    const filename = params.filename;
    
    // Find the PDF in the database
    const pdf = await prisma.pDF.findFirst({
      where: {
        fileUrl: `/api/pdf/${filename}`,
      },
    });

    if (!pdf) {
      return new NextResponse('PDF not found', { status: 404 });
    }

    // Return the PDF content with appropriate headers
    return new NextResponse(pdf.content, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${pdf.filename}"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('Error serving PDF', { status: 500 });
  }
} 
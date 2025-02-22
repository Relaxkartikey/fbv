import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure params.id exists
    const id = params?.id;
    if (!id) {
      return NextResponse.json(
        { error: 'PDF ID is required' },
        { status: 400 }
      );
    }

    // Find the PDF in the database
    const pdf = await prisma.pDF.findFirst({
      where: {
        OR: [
          { viewId: id },
          { shareId: id }
        ]
      },
      select: {
        data: true,
        pages: true,
        title: true,
      }
    });

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    // Convert Buffer to base64
    const base64Data = Buffer.from(pdf.data).toString('base64');
    
    return NextResponse.json({
      success: true,
      data: base64Data,
      pages: pdf.pages,
      title: pdf.title,
    });
  } catch (error) {
    console.error('Retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve PDF' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
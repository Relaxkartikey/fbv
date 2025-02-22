import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 50MB' },
        { status: 400 }
      );
    }

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Store in database
    const result = await prisma.pDF.create({
      data: {
        title: file.name,
        filename: file.name,
        data: buffer,
        pages: 1, // We'll update this later when viewing
      },
    });

    return NextResponse.json({
      success: true,
      shareId: result.shareId,
      viewId: result.viewId,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload PDF' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
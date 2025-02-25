import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    try {
      // For now, we'll use a mock URL. In production, you would upload to a cloud storage service
      const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2);
      const filename = `${uniqueId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const fileUrl = `https://example.com/pdfs/${filename}`; // This would be your cloud storage URL

      // Store in database
      const pdf = await prisma.pDF.create({
        data: {
          filename: file.name,
          fileUrl: fileUrl,
        },
      });

      return NextResponse.json({
        shareId: pdf.shareId,
        url: `/view/${pdf.shareId}`,
      });
    } catch (error) {
      console.error('Error storing PDF:', error);
      return NextResponse.json(
        { error: 'Failed to store PDF' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 
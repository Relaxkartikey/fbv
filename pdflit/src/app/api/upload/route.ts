import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

// Remove edge runtime as it's causing issues with Prisma
// export const runtime = 'edge';

const prisma = new PrismaClient();
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Ensure upload directory exists
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
    return uploadDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw error;
  }
}

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

    // Create upload directory and save file
    const uploadDir = await ensureUploadDir();
    const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2);
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${uniqueId}-${safeName}`;
    const filepath = path.join(uploadDir, filename);

    // Convert the file to a Buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Create the public URL for the file
    const fileUrl = `/uploads/${filename}`;

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
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir, access, unlink } from 'fs/promises';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await access(UPLOAD_DIR);
  } catch {
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
      throw new Error('Failed to create upload directory');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists first
    await ensureUploadDir();

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

    // Generate a unique filename
    const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2);
    const filename = `${uniqueId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    try {
      // Convert the file to a Buffer and save it
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      );
    }

    try {
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
      console.error('Error creating database record:', error);
      // Try to clean up the file if database operation fails
      try {
        await unlink(filepath);
      } catch {
        // Ignore cleanup errors
      }
      return NextResponse.json(
        { error: 'Failed to create database record' },
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
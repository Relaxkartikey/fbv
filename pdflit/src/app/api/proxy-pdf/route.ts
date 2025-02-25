import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return Response.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    const response = await fetch(decodeURIComponent(url), {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/pdf');
    headers.set('Content-Length', response.headers.get('Content-Length') || '');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(blob, {
      headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, filename, type = 'default', visible = true } = body;

    if (!url) {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    const response = await fetch('https://api.printful.com/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        url,
        filename,
        visible,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error('[Printful Upload Error]', response.status, result);
      return NextResponse.json({ error: result?.error?.message || 'Upload failed' }, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Printful Upload Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
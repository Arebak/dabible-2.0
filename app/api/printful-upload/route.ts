import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const printfulForm = new FormData();
    printfulForm.append('file[]', file, file.name);
    printfulForm.append('purpose', 'default');

    const res = await fetch('https://api.printful.com/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      body: printfulForm,
    });

    const text = await res.text();
    console.log('[Printful Raw Response]', text);

    try {
      const data = JSON.parse(text);
      if (!res.ok) {
        return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: res.status });
      }
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({ error: 'Unexpected response format', detail: text, err }, { status: 500 });
    }
  } catch (error) {
    console.error('[Printful Upload Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
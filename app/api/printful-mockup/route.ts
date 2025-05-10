// app/api/printful-mockup/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('https://api.printful.com/mockup-generator/create-task', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Mockup generation failed' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[Printful Mockup Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
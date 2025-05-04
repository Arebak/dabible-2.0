/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/printful-catalog/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.printful.com/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Printful Catalog Error]', response.status, errorText);
      throw new Error('Failed to fetch Printful catalog');
    }

    const data = await response.json();

    const mapped = data.result.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      type: item.type,
      variant_count: item.variant_count,
    }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error('[Catalog API Error]', error);
    return NextResponse.json({ error: 'Catalog fetch failed' }, { status: 500 });
  }
}
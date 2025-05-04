// app/api/printful-catalog/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { params } = context;

  console.log('[Printful Product API]', params);
  
  try {
    const productId = params.id.replace('printful_', '');

    const response = await fetch(`https://api.printful.com/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Printful Product Error]', response.status, errorText);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data.result);
  } catch (error) {
    console.error('[Printful Product API Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
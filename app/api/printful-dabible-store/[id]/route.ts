import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `https://api.printful.com/store/products/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
          'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID as string,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Printful Product Detail Error]', response.status, errorText);
      throw new Error('Failed to fetch Printful product detail');
    }

    const data = await response.json();
    const { sync_product, sync_variants } = data.result;

    return NextResponse.json({
      product: sync_product,
      variants: sync_variants,
    });
  } catch (error) {
    console.error('[Product Detail API Error]', error);
    return NextResponse.json({ error: 'Product detail fetch failed' }, { status: 500 });
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/printful-catalog/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category_id = searchParams.get('category_id');

    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    if (category_id) queryParams.append('category_id', category_id);

    const response = await fetch(`https://api.printful.com/store/products?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID as string,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Printful Catalog Error]', response.status, errorText);
      throw new Error('Failed to fetch Printful catalog');
    }

    const data = await response.json();
    console.log("==================================================");
    console.log("=========== PRINTFUL RAW STORE DATA ============");
    console.log("==================================================");
    console.log('[Printful Raw Data]', data);
    console.log("==================================================");

    const enrichedProducts = await Promise.all(
      data.result.map(async (item: any) => {
        const detailRes = await fetch(`https://api.printful.com/store/products/${item.id}`, {
          headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
            'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID as string,
          },
        });
        const detailData = await detailRes.json();
        console.log('[Printful Product Detail]', detailData.result?.sync_variants);
        const firstVariant = detailData?.result?.sync_variants?.[0];
        return {
          id: item.id,
          external_id: item.external_id,
          name: item.name,
          variants: item.variants,
          synced: item.synced,
          thumbnail_url: item.thumbnail_url,
          price: firstVariant?.retail_price || null,
          variant_name: firstVariant?.name || null,
        };
      })
    );

    return NextResponse.json({ data: enrichedProducts }, { status: 200 });
  } catch (error) {
    console.error('[Catalog API Error]', error);
    return NextResponse.json({ error: 'Catalog fetch failed' }, { status: 500 });
  }
}
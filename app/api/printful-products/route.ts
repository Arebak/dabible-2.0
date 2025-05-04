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
    console.log("==================================================");
    console.log("=========== PRINTFUL RAW PRODUCT DATA ============");
    console.log("==================================================");
    console.log('[Printful Raw Data]', data.result?.[20]);
    console.log("==================================================");

    // Map just the essentials
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = data.result.map((item: any) => ({
      id: 'printful_' + item.id,
      main_category_id: item.main_category_id,
      type: item.type,
      type_name: item.type_name,
      name: item.title
        .split(' ')
        .map((word: string, index: number) => {
          const lowerWord = word.toLowerCase();
          const lowercaseExceptions = ['of', 'at', 'in', 'on', 'the', 'and', 'a', 'an', 'for', 'to', 'by', 'with'];
          if (index === 0 || !lowercaseExceptions.includes(lowerWord)) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
          }
          return lowerWord;
        })
        .join(' '),
          imageSrc: item.image,
          variant_count: item.variant_count,
        }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error('[Catalog API Error]', error);
    return NextResponse.json({ error: 'Catalog fetch failed' }, { status: 500 });
  }
}
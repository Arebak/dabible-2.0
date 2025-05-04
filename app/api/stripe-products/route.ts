// app/api/products/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 10,
      expand: ['data.default_price'],
    });

    console.log("==================================================");
    console.log("============ STRIPE RAW item DATA =============");
    console.log("==================================================");
    console.log('[Stripe Raw Data]', products.data[0]);
    console.log("==================================================");

    const enhancedProducts = await Promise.all(
      products.data.map(async (item) => {
        const image = item.images?.[0];
        let imageUrl = '';

        if (image?.startsWith('file_')) {
          // If image is a file ID, convert it to a public link
          try {
            const fileLink = await stripe.fileLinks.create({
              file: image,
              expires_at: undefined,
            });
            imageUrl = fileLink.url ?? '';
          } catch (err) {
            console.warn(`Failed to generate fileLink for ${image}:`, err);
          }
        } else if (image?.startsWith('https://')) {
          imageUrl = image;
        }

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          imageSrc: imageUrl,
          price: item.default_price ? item.default_price.unit_amount / 100 : 0,
          currency: item.default_price?.currency ?? 'usd',
        };
      })
    );

    return NextResponse.json({ data: enhancedProducts });
  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
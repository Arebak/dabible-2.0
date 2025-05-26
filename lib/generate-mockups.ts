/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log('Loading environment variables from .env file...', process.env.NEXT_PUBLIC_BASE_URL, process.env.PRINTFUL_API_KEY);
/**
 * HOW TO GENERATE MOCKUPS
 * 1. Create a `.env` file in the root of your project with the following content:
 *    ```
 *    NEXT_PUBLIC_BASE_URL=https://your-site.com
 *    PRINTFUL_API_KEY=your_printful_api_key  // Get this from Printful
 *    ``` 
 * 
 * 2. Place your design files in the `public/designs` directory. The script will look for PNG, JPG, JPEG, and SVG files.  
 * 3. Run the script using Node.js:
 *    ```
 *    npx ts-node --esm lib/generate-mockups.ts    
 *     
 *   # or if you have ts-node installed globally 
 *   ts-node --esm lib/generate-mockups.ts
 *    ```
 *  
 * 4. The script will upload each design to Printful, generate mockups, and save the results in `mockups.json` in the root directory.
 * 5. The `mockups.json` file will contain an array of objects with the following structure:
 *   ```json
 *   [
 *     {
 *      "filename": "design1.png",
 *      "url": "https://your-site.com/designs/design1.png",
 *      "mockups": [
 *        "https://example.com/mockup1.png",
 *        "https://example.com/mockup2.png"
 *       ]
 *     },
 *     {
 *      "filename": "design2.jpg",
 *      "url": "https://your-site.com/designs/design2.jpg",
 *      "mockups": [
 *       "https://example.com/mockup3.png",
 *       "https://example.com/mockup4.png"
 *       ]
 *     }
 *   ]
 *  
 */

// const fs = require('fs');
// const path = require('path');
// Removed the require statement for 'node-fetch' as 'fetch' is globally available.


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // e.g., https://your-site.com
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
// const PRODUCT_ID = 770; // example: Bella+Canvas 3001 T-shirt

const designsDir = path.join(process.cwd(), 'public', 'designs');
const outputFile = path.join(process.cwd(), 'mockups.json');

const uploadImage = async (url: string, filename: string) => {
  const res = await fetch('https://api.printful.com/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      filename,
      type: 'default',
      visible: true,
    }),
  });

  const result = await res.json();
  console.log('🔍 Upload response:', result);

  if (!res.ok) {
    console.error('❌ Upload failed response:', JSON.stringify(result, null, 2));
    throw new Error(result.error?.message || JSON.stringify(result));
  }

  return result.result.id;
};

async function getValidVariantIds(productId: number): Promise<{ variantIds: number[]; productType: string; hasFrontPlacement: boolean }> {
  const res = await fetch(`https://api.printful.com/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
    },
  });

  const data = await res.json();
  console.log('🔍 Product details:', JSON.stringify(data.result, null, 2));
  if (!res.ok) {
    console.error('❌ Failed to fetch product variants:', JSON.stringify(data, null, 2));
    throw new Error(data?.error?.message || 'Failed to fetch product details');
  }

  const variantIds = data.result.variants.map((v: any) => v.id);
  const productType = data.result.product.type_name;
  const hasFrontPlacement = data.result.variants.some((v: any) => v.placement === 'front');

  return {
    variantIds,
    productType,
    hasFrontPlacement,
  };
}

async function generateMockup(fileId: number, imageUrl: string, variantIds: number[]) {
  const res = await fetch('https://api.printful.com/mockup-generator/create-task/770', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variant_ids: variantIds,
      format: 'jpg',
      option_groups: ['default'],
      optimize_mockup: true,
      files: [
        {
          url: imageUrl,
          type: 'default',
          placement: 'front'
        }
      ]
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('❌ Mockup generation failed response:', JSON.stringify(json, null, 2));
    throw new Error(json?.error?.message || JSON.stringify(json));
  }

  console.log(`🧩 Generated taskKey: ${json.result.task_key} for file ID: ${fileId}`);
  return json.result.task_key;
}

async function pollMockup(taskKey: string): Promise<string[]> {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  let attempts = 0;

  while (attempts < 10) {
    const res = await fetch(`https://api.printful.com/mockup-generator/task?task_key=${taskKey}`, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      },
    });
    const json = (await res.json()) as { result: { status: string; mockups: { mockup_url: string }[] } };

    if (json.result.status === 'completed') {
      return json.result.mockups.map((m: any) => m.mockup_url);
    }

    await delay(2000);
    attempts++;
  }

  throw new Error('Mockup generation timeout');
}

async function getAllProducts(): Promise<any[]> {
  const res = await fetch('https://api.printful.com/products', {
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Failed to fetch product list');
  }

  return data.result;
}

async function main() {
  const files = fs.readdirSync(designsDir).filter((f: string) => /\.(png|jpg|jpeg|svg)$/i.test(f));
  const results: any[] = [];

  const products = await getAllProducts();

  let mockupCount = 0;
  for (const product of products) {
    if (mockupCount >= 2) break;

    try {
      const { variantIds, productType, hasFrontPlacement } = await getValidVariantIds(product.id);
      console.log(`🧵 Product: ${product.name} (${product.id}) | Type: ${productType} | Front: ${hasFrontPlacement}`);

      if (productType !== 'T-Shirt' || !hasFrontPlacement) {
        console.log('❌ Skipping: Not a T-Shirt or missing front placement');
        continue;
      }

      for (const filename of files.slice(0, 1)) {
        const url = `${BASE_URL}/designs/${filename}`;
        console.log(`Uploading: ${filename}`);
        const fileId = await uploadImage(url, filename);
        console.log(`🆔 File ID for ${filename}:`, fileId);
        await new Promise((res) => setTimeout(res, 2000));

        console.log(`Generating mockup for ${filename}...`);
        const taskKey = await generateMockup(fileId, url, variantIds);

        console.log(`Polling mockups for task ${taskKey}...`);
        const mockups = await pollMockup(taskKey);

        results.push({ filename, url, mockups });
        console.log(`✅ Done: ${filename}`);
        mockupCount++;
        await new Promise((res) => setTimeout(res, 6000));
      }
    } catch (err) {
      console.error(`❌ Failed for product ${product.id}:`, err);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log('All mockups saved to mockups.json');
}

main();
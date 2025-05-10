/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // e.g., https://your-site.com
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
// const PRODUCT_ID = 770; // example: Bella+Canvas 3001 T-shirt

const designsDir = path.join(process.cwd(), 'public', 'designs');
const outputFile = path.join(process.cwd(), 'mockups.json');

async function uploadImage(fileUrl: string, filename: string) {
  const res = await fetch('https://api.printful.com/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'default',
      url: fileUrl,
      filename,
      visible: true,
    }),
  });

  const json = (await res.json()) as { error?: string; result: { id: number } };
  if (!res.ok) throw new Error(json.error || 'Upload failed');
  return json.result.id;
}

async function generateMockup(fileId: number) {
  const res = await fetch('https://api.printful.com/mockup-generator/create-task/770', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variant_ids: [], // leave empty or choose defaults
      files: [
        {
          placement: 'front',
          id: fileId,
        },
      ],
    }),
  });

  const json = (await res.json()) as { error?: string; result: { task_key: string } };
  if (!res.ok) throw new Error(json.error || 'Mockup task failed');
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

async function main() {
  const files = fs.readdirSync(designsDir).filter(f => /\.(png|jpg|jpeg|svg)$/i.test(f));
  const results: any[] = [];

  for (const filename of files) {
    const url = `${BASE_URL}/designs/${filename}`;
    try {
      console.log(`Uploading: ${filename}`);
      const fileId = await uploadImage(url, filename);

      console.log(`Generating mockup for ${filename}...`);
      const taskKey = await generateMockup(fileId);

      console.log(`Polling mockups for task ${taskKey}...`);
      const mockups = await pollMockup(taskKey);

      results.push({ filename, url, mockups });
      console.log(`✅ Done: ${filename}`);
    } catch (err) {
      console.error(`❌ Failed for ${filename}:`, err);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log('All mockups saved to mockups.json');
}

main();
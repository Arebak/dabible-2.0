import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${nanoid()}-${file.name}`;
    const filePath = join(process.cwd(), 'public/uploads', filename);

    // Save file to disk
    await writeFile(filePath, buffer);

    // Return public URL for the file
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/uploads/${filename}`;
    return NextResponse.json({ success: true, url, filename });
  } catch (error) {
    console.error('[Upload Error]', error);
    return NextResponse.json({ error: 'Failed to upload file', detail: String(error) }, { status: 500 });
  }
}
// Route: /api/blogs/authors
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${process.env.DABIBLE_API_KEY}`
  };

  try {
    const url = 'https://api.dabible.com/api/v3/blog-post/authors?page=1&per_page=100';
    const res = await fetch(url, { method: 'GET', headers });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Failed to fetch authors' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
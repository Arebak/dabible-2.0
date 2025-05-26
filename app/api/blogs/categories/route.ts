
// Route: /api/blogs/categories
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${process.env.DABIBLE_API_KEY}`
  };

  try {
    const url = 'https://api.dabible.com/api/v3/blog-post/categories?page=1&per_page=100';
    const res = await fetch(url, { method: 'GET', headers });
    const data = await res.json();

    console.log('Fetched categories:', data);


    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Failed to fetch categories' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

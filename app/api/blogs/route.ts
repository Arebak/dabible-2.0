import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag');
  const category = searchParams.get('category');
  const author = searchParams.get('author');
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');

  let url = '';
  let query = `?page=${page}&per_page=${perPage}`;

  if (search) query += `&search=${encodeURIComponent(search)}`;

  // Handle routing variations
  if (slug) {
    url = `https://api.dabible.com/api/v3/blog-post/${slug}/slug`;
  } else if (id) {
    url = `https://api.dabible.com/api/v3/blog-post/${id}/id`;
  } else if (tag) {
    url = `https://api.dabible.com/api/v3/blog-post/tag/${tag}${query}`;
  } else if (category) {
    url = `https://api.dabible.com/api/v3/blog-post/category/${category}${query}`;
  } else if (author) {
    url = `https://api.dabible.com/api/v3/blog-post/author/${author}${query}`;
  } else {
    url = `https://api.dabible.com/api/v3/blog-post${query}`;
  }

  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${process.env.DABIBLE_API_KEY}`
  };

  try {
    const res = await fetch(url, { method: 'GET', headers });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.error || 'Failed to fetch blog data' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
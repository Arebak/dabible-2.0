#!/usr/bin/env node
/** Plain JS sitemap generator (converted from TS) */
import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://dabible.com').replace(/\/$/, '');

async function loadBooks() {
  const file = path.join(process.cwd(), 'public', 'bible_paths.json');
  const raw = await fs.readFile(file, 'utf-8');
  const json = JSON.parse(raw);
  return json.books || [];
}

function normalize(s) { return s.replace(/\s+/g, '_'); }

async function generateChapterSitemap(books) {
  const parts = [];
  const now = new Date().toISOString();
  for (const b of books) {
    for (let c = 1; c <= b.numberOfChapters; c++) {
      const bookSlug = normalize(b.name);
      const loc = `${SITE_URL}/listen-online/${bookSlug}/${c}`;
      parts.push(`<url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>yearly</changefreq><priority>0.4</priority></url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${parts.join('')}</urlset>`;
  const outPath = path.join(process.cwd(), 'public', 'sitemap-chapters.xml');
  await fs.writeFile(outPath, xml, 'utf-8');
  return { count: parts.length, outPath };
}

async function ensureIndex() {
  const indexPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const chaptersPath = `${SITE_URL}/sitemap-chapters.xml`;
  let needsWrite = true;
  try {
    const existing = await fs.readFile(indexPath, 'utf-8');
    if (existing.includes(chaptersPath)) needsWrite = false;
  } catch {}
  if (!needsWrite) return { indexWritten: false, indexPath };
  const now = new Date().toISOString();
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${chaptersPath}</loc><lastmod>${now}</lastmod></sitemap>\n</sitemapindex>`;
  await fs.writeFile(indexPath, indexXml, 'utf-8');
  return { indexWritten: true, indexPath };
}

async function main() {
  const books = await loadBooks();
  const { count, outPath } = await generateChapterSitemap(books);
  const { indexWritten, indexPath } = await ensureIndex();
  console.log(`Generated ${count} chapter URLs -> ${outPath}`);
  console.log(indexWritten ? `Created sitemap index -> ${indexPath}` : 'Sitemap index already present');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => { console.error(err); process.exit(1); });
}

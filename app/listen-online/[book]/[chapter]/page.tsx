import type { Metadata } from 'next';
import type { PageProps as GeneratedPageProps } from '../../../../.next/types/app/listen-online/[book]/[chapter]/page';
import { notFound } from 'next/navigation';
import ListenOnlineClient from './ListenOnlineClient';
import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';

// Basic in-memory cache (per server runtime) for chapter text to avoid re-reading files on hot paths
// This is safe because chapter files are static. Not persisted across server restarts.
const chapterFileCache = new Map<string, string>();

// Note: Next.js generated types for this dynamic route wrap params in a Promise (experimental typing).
// To avoid brittle coupling to internal generated types, we accept a loose type and normalize.
type RouteParams = { book: string; chapter: string };
type PagePropsLike = GeneratedPageProps;


const readable = (slug: string) => slug.replace(/_/g, ' ').replace(/\b(\w)/g, m => m.toUpperCase());

async function loadBooks() {
  const filePath = path.join(process.cwd(), 'public', 'bible_paths.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const json = JSON.parse(raw) as { books: { name: string; numberOfChapters: number; yorubaFilePath: string; englishFilePath?: string }[] };
  return json.books;
}

const normalize = (s: string) => s.toLowerCase().replace(/[_\s]+/g, '');

export async function generateMetadata(props: PagePropsLike): Promise<Metadata> {
  const rawParams = props?.params;
  const resolved = rawParams ? await rawParams : undefined; // generated type defines params as Promise
  if (!resolved) return { title: 'Passage Not Found | DaBible Foundation' };
  const params = resolved as unknown as RouteParams;
  const { book, chapter } = params || {} as RouteParams;
  const books = await loadBooks();
  const match = books.find(b => normalize(b.name) === normalize(book));
  const chapterNum = parseInt(chapter, 10);
  if (!match || isNaN(chapterNum) || chapterNum < 1 || chapterNum > match.numberOfChapters) {
    return { title: 'Passage Not Found | DaBible Foundation' };
  }
  const bookName = readable(match.name);
  const siteName = 'DaBible Foundation';
  const title = `${bookName} Chapter ${chapterNum} | Audio Bible (Yoruba & English) | ${siteName}`;
  const description = `Listen to ${bookName} Chapter ${chapterNum} in Yoruba Language. Play the chapter in Yoruba and read side-by-side with the English Bible`;
  const url = `/listen-online/${book}/${chapter}`;
  const keywords = [
    bookName + ' audio bible',
    `${bookName} chapter ${chapterNum}`,
    'king james bible',
    'yoruba kjv',
    'yoruba kjv with audio',
    'yoruba audio bible',
    'english bible',
    'parallel bible',
    'african language bible',
    'listen to bible online'
  ];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName,
      images: [
        {
          url: '/png/yoruba-hero-bg.png',
          width: 400,
          height: 400,
          alt: 'Audio Bible Decorative'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/png/yoruba-hero-bg.png']
    },
    other: {
      'og:locale': 'en_US'
    }
  };
}

export default async function ListenOnlinePage(props: PagePropsLike) {
  const rawParams = props?.params;
  const resolved = rawParams ? await rawParams : undefined;
  if (!resolved) notFound();
  const params = resolved as unknown as RouteParams;
  const books = await loadBooks();
  const initialBookParam = params.book;
  const initialChapterParam = parseInt(params.chapter, 10) || 1;
  const match = books.find(b => normalize(b.name) === normalize(initialBookParam));
  if (!match || initialChapterParam < 1 || initialChapterParam > (match?.numberOfChapters || 0)) {
    notFound();
  }
  const initialBook = match.name; // use canonical name
  const initialChapter = initialChapterParam;

  // Derive file path for requested chapter by replacing the _001 pattern with padded chapter
  function chapterFilePath(basePath: string, chapter: number) {
    // basePath example: /bible/Genesis/Genesis_001.txt
    const pad = String(chapter).padStart(3, '0');
    return basePath.replace(/_001(?![0-9])/, `_${pad}`); // only first occurrence of _001
  }

  const yorubaPath = chapterFilePath(match.yorubaFilePath, initialChapter);
  const absoluteYorubaPath = path.join(process.cwd(), 'public', yorubaPath);
  const englishBase = match.englishFilePath;
  const englishPath = englishBase ? chapterFilePath(englishBase, initialChapter) : null;
  const absoluteEnglishPath = englishPath ? path.join(process.cwd(), 'public', englishPath) : null;

  // Read Yoruba chapter text (cached per server instance)
  async function readChapterFile(absPath: string) {
    if (chapterFileCache.has(absPath)) return chapterFileCache.get(absPath)!;
    try {
      const buf = await fs.readFile(absPath);
      // Attempt UTF-8 first; if contains lots of nulls maybe it's UTF-16LE
      let text = buf.toString('utf8');
      if (/\u0000/.test(text)) {
        text = buf.toString('utf16le');
      }
      // Normalize CRLF -> LF
      text = text.replace(/\r\n?/g, '\n');
      chapterFileCache.set(absPath, text);
      return text;
    } catch {
      return ''; // will handle as missing
    }
  }

  const [yorubaRaw, englishRaw] = await Promise.all([
    readChapterFile(absoluteYorubaPath),
    absoluteEnglishPath ? readChapterFile(absoluteEnglishPath) : Promise.resolve('')
  ]);
  if (!yorubaRaw) {
    notFound();
  }

  // Parse verses. Many public domain text files have pattern like "1 In the beginning" or line-based.
  // We'll attempt to split by newline; then fallback to regex capturing verse numbers if file is single line.
  function parseVerses(raw: string): { num: number; text: string }[] {
  const lines = raw.split(/\n+/).map(l => l.trim()).filter(Boolean);
    // Heuristic: if first few lines don't start with verse numbers but contain them inline, try regex extraction
    const versePattern = /^(\d{1,3})\s+(.+)/;
  const structured = lines.map(line => {
      const m = line.match(versePattern);
      if (m) return { num: parseInt(m[1], 10), text: m[2].trim() };
      return null;
    });
    const validCount = structured.filter(Boolean).length;
    if (validCount < Math.min(3, lines.length)) {
      // Fallback: try global regex over entire text
      const verses: { num: number; text: string }[] = [];
      const globalPattern = /(\d{1,3})\s+([^\d]+)/g; // naive but workable for initial SEO embedding
      let m: RegExpExecArray | null;
      while ((m = globalPattern.exec(raw)) !== null) {
        verses.push({ num: parseInt(m[1], 10), text: m[2].replace(/\s+/g, ' ').trim() });
      }
      if (verses.length) return verses;
    }
    // Use structured lines (filter null); assign incremental numbers if missing
    let lastNum = 0;
    return structured.map((s, idx) => {
      if (s) { lastNum = s.num; return s; }
      return { num: ++lastNum || idx + 1, text: lines[idx] };
    });
  }

  const versesYo = parseVerses(yorubaRaw);
  const versesEn = englishRaw ? parseVerses(englishRaw) : [];

  // Merge verses by verse number where possible
  type MergedVerse = { num: number; yo: string; en?: string };
  const versesMap = new Map<number, MergedVerse>();
  for (const v of versesYo) {
    versesMap.set(v.num, { num: v.num, yo: v.text });
  }
  for (const v of versesEn) {
    const existing = versesMap.get(v.num);
    if (existing) existing.en = v.text; else versesMap.set(v.num, { num: v.num, yo: '', en: v.text });
  }
  const verses = Array.from(versesMap.values()).sort((a, b) => a.num - b.num);

  // Build prev/next chapter references
  const hasPrev = initialChapter > 1;
  const hasNext = initialChapter < match.numberOfChapters;
  const prevHref = hasPrev ? `/listen-online/${initialBook}/${initialChapter - 1}` : null;
  const nextHref = hasNext ? `/listen-online/${initialBook}/${initialChapter + 1}` : null;

  // JSON-LD structured data (Breadcrumb + Chapter reference)
  // Expand number of verses for structured data but cap to avoid oversized script (max 50)
  const VERSE_SD_LIMIT = verses.length > 50 ? 50 : Math.min(50, verses.length);
  const verseParts = verses.slice(0, VERSE_SD_LIMIT).map(v => ({
    '@type': 'CreativeWork',
    '@id': `#v${v.num}`,
    'position': v.num,
    'text': v.yo + (v.en ? ` / ${v.en}` : '')
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Listen Online', item: '/listen-online' },
          { '@type': 'ListItem', position: 3, name: readable(initialBook), item: `/listen-online/${initialBook}` },
          { '@type': 'ListItem', position: 4, name: `Chapter ${initialChapter}`, item: `/listen-online/${initialBook}/${initialChapter}` }
        ]
      },
      {
        '@type': 'CreativeWork',
        '@id': `/listen-online/${initialBook}/${initialChapter}#chapter`,
        'name': `${readable(initialBook)} Chapter ${initialChapter} (Yoruba Bible)`,
        'inLanguage': 'yo',
        'isPartOf': {
          '@type': 'CreativeWorkSeries',
          'name': readable(initialBook)
        },
        'position': initialChapter,
        'about': readable(initialBook),
        'hasPart': verseParts
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SSR Verse content for SEO crawlers (hidden from client duplicate rendering by using a visually-hidden container or integrated if client component expects to re-render) */}
      <section aria-labelledby="chapter-heading" className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 id="chapter-heading" className="text-xl font-semibold">
            {readable(initialBook)} Chapter {initialChapter} (Yoruba / English)
          </h1>
          <Link href="/listen-online/search" className="text-sm text-blue-600 hover:underline self-start md:self-auto">Search Bible</Link>
  </div>
        <nav className="flex justify-between text-sm mb-4" aria-label="Chapter navigation">
          {prevHref ? <Link href={prevHref} rel="prev" className="text-blue-600 hover:underline">&larr; Previous</Link> : <span />}
          {nextHref ? <Link href={nextHref} rel="next" className="text-blue-600 hover:underline">Next &rarr;</Link> : <span />}
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" itemScope itemType="https://schema.org/CreativeWork">
          <div>
            <h2 className="text-lg font-semibold mb-2">Yoruba</h2>
            <ol className="space-y-2 list-none">
              {verses.map(v => (
                <li key={v.num} id={`v${v.num}`} className="flex items-start gap-2 group" itemProp="hasPart" itemScope itemType="https://schema.org/CreativeWork">
                  <span className="w-8 text-right pr-1 select-none text-xs font-medium text-gray-500 dark:text-gray-400" aria-hidden>{v.num}</span>
                  <p className="text-gray-900 dark:text-gray-100" lang="yo" itemProp="text">{v.yo}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">English (KJV)</h2>
            <ol className="space-y-2 list-none">
              {verses.map(v => (
                <li key={v.num} className="flex items-start gap-2 group" aria-labelledby={`v${v.num}-en-label`}>
                  <span className="w-8 text-right pr-1 select-none text-xs font-medium text-gray-500 dark:text-gray-400" aria-hidden>{v.num}</span>
                  <p id={`v${v.num}-en-label`} className="text-gray-700 dark:text-gray-300" lang="en">{v.en || ''}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <ListenOnlineClient initialBook={initialBook} initialChapter={initialChapter} />
    </>
  );
}

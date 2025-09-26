import type { Metadata } from 'next';
import type { PageProps as GeneratedPageProps } from '../../../../.next/types/app/listen-online/[book]/[chapter]/page';
import { notFound } from 'next/navigation';
// import ListenOnlineClient from './ListenOnlineClient';
import fs from 'node:fs/promises';
import path from 'node:path';
import ClientEnhancements from './ClientEnhancements';
import InlineChapterSearch from './InlineChapterSearch';
import Image from 'next/image';

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
      <section className="relative bg-white overflow-hidden pt-10 md:pt-[70px]  min-h-[20vh]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[1000px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
        />

        <Image
          src="/png/red-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 right-0 w-32 md:w-48 lg:w-52"
        />
        <Image
          src="/png/blue-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 left-0 w-32 md:w-48 lg:w-52"
        />
        <div className="max-w-3xl mx-auto text-center px-4 mt-12 absolute left-0 right-0 -top-3">
          {/* <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="mr-1 w-3 h-3 md:w-4 md:h-4"
            />{" "}
            Listen Online {" "}
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="ml-1 w-3 h-3 md:w-4 md:h-4"
            />
          </div> */}
          
        </div>
      </section>
      

      {/* Add Search Bar Here */}
      <div className="max-w-3xl mx-auto px-4 mb-4 -translate-y-32">
        <h1 className="text-xl sm:text-2xl text-center md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            {params.book} {params.chapter}
        </h1>
        <InlineChapterSearch />
      </div>

      {/* Client Enhancements (hydrated on client) */}
      <div className="-translate-y-28">
      <ClientEnhancements
          book={initialBook}
          chapter={initialChapter}
          verses={verses}
          hasPrev={hasPrev}
          hasNext={hasNext}
          prevHref={prevHref}
          nextHref={nextHref}
      />
      </div>
    </>
  );
}

// InlineChapterSearch moved to client component file to comply with Server Component constraints.

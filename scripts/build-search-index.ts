#!/usr/bin/env ts-node
/**
 * Build a compact search index for Yoruba + English verses.
 * Output: public/search-index-yo.json
 * Structure: Array of entries { b: string, c: number, v: number, yo: string, en?: string }
 * (Short keys to reduce size: b=book, c=chapter, v=verse.)
 *
 * Basic design: We read bible_paths.json to know available books and total chapters.
 * For each chapter we derive both Yoruba and English file paths by replacing _001 with padded chapter.
 * Parsing heuristic: lines or inline verse numbers at line starts (same as SSR logic).
 */
import fs from 'node:fs/promises';
import path from 'node:path';

interface BookEntry {
  name: string;
  numberOfChapters: number;
  yorubaFilePath: string;
  englishFilePath?: string;
}

interface BiblePaths { books: BookEntry[] }

function padChapter(ch: number) { return String(ch).padStart(3, '0'); }
function deriveChapterPath(template: string, chapter: number) { return template.replace(/_001(?![0-9])/, `_${padChapter(chapter)}`); }

function normalizeNewlines(text: string) { return text.replace(/\r\n?/g, '\n'); }

function parseVerses(raw: string): { num: number; text: string }[] {
  const cleaned = normalizeNewlines(raw);
  const lines = cleaned.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const versePattern = /^(\d{1,3})\s+(.+)/;
  const structured = lines.map(line => {
    const m = line.match(versePattern);
    if (m) return { num: parseInt(m[1], 10), text: m[2].trim() };
    return null;
  });
  const validCount = structured.filter(Boolean).length;
  if (validCount < Math.min(3, lines.length)) {
    // fallback global regex
    const verses: { num: number; text: string }[] = [];
    const globalPattern = /(\d{1,3})\s+([^\d]+)/g;
    let m: RegExpExecArray | null;
    while ((m = globalPattern.exec(cleaned)) !== null) {
      verses.push({ num: parseInt(m[1], 10), text: m[2].replace(/\s+/g, ' ').trim() });
    }
    if (verses.length) return verses;
  }
  let lastNum = 0;
  return structured.map((s, idx) => {
    if (s) { lastNum = s.num; return s; }
    return { num: ++lastNum || idx + 1, text: lines[idx] };
  });
}

async function loadBooks(): Promise<BookEntry[]> {
  const file = path.join(process.cwd(), 'public', 'bible_paths.json');
  const raw = await fs.readFile(file, 'utf-8');
  const json: BiblePaths = JSON.parse(raw);
  return json.books;
}

async function safeRead(abs: string) {
  try {
    const buf = await fs.readFile(abs);
    let text = buf.toString('utf8');
    if (/\u0000/.test(text)) text = buf.toString('utf16le');
    return text;
  } catch { return ''; }
}

async function main() {
  const books = await loadBooks();
  interface VerseIndexEntry { b: string; c: number; v: number; yo: string; en?: string }
  const out: VerseIndexEntry[] = [];
  for (const book of books) {
    for (let chapter = 1; chapter <= book.numberOfChapters; chapter++) {
      const yoPath = deriveChapterPath(book.yorubaFilePath, chapter);
      const absYo = path.join(process.cwd(), 'public', yoPath);
      const enTemplate = book.englishFilePath;
      const enPath = enTemplate ? deriveChapterPath(enTemplate, chapter) : null;
      const absEn = enPath ? path.join(process.cwd(), 'public', enPath) : null;
      const [yoRaw, enRaw] = await Promise.all([
        safeRead(absYo),
        absEn ? safeRead(absEn) : Promise.resolve('')
      ]);
      if (!yoRaw) continue; // skip if missing Yoruba
      const versesYo = parseVerses(yoRaw);
      const versesEn = enRaw ? parseVerses(enRaw) : [];
      const map = new Map<number, { yo: string; en?: string }>();
      for (const v of versesYo) map.set(v.num, { yo: v.text });
      for (const v of versesEn) {
        const existing = map.get(v.num);
        if (existing) existing.en = v.text; else map.set(v.num, { yo: '', en: v.text });
      }
      for (const [num, val] of map.entries()) {
        out.push({ b: book.name, c: chapter, v: num, yo: val.yo, ...(val.en ? { en: val.en } : {}) });
      }
    }
  }
  const outFile = path.join(process.cwd(), 'public', 'search-index-yo.json');
  await fs.writeFile(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), entries: out }), 'utf-8');
  console.log(`Wrote ${out.length} verse entries -> ${outFile}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

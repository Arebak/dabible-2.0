#!/usr/bin/env node
/**
 * Generates a placeholder verse timestamp JSON for a given book & chapter.
 * Usage: node scripts/generate-timestamp-template.mjs Genesis 1 60
 * Args:
 *   book      Book name exactly as in bible_paths.json (e.g., Genesis)
 *   chapter   Chapter number (1-based)
 *   duration  (optional) Approx audio duration in seconds (default 300)
 * Output path: public/audio-timestamps/<Book>/<Book>_###.json
 * Structure: [ { verse: number, time: secondsFromStart }, ... ]
 * Even spacing is naive; meant as a starting template for manual refinement.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const [book, chapterStr, durationStr] = process.argv.slice(2);
  if (!book || !chapterStr) {
    console.error('Usage: node scripts/generate-timestamp-template.mjs <Book> <Chapter> [ApproxDurationSeconds]');
    process.exit(1);
  }
  const chapter = parseInt(chapterStr, 10);
  if (!Number.isFinite(chapter) || chapter < 1) {
    console.error('Chapter must be a positive integer.');
    process.exit(1);
  }
  const approxDuration = parseInt(durationStr || '300', 10);
  const biblePathsFile = path.join(process.cwd(), 'public', 'bible_paths.json');
  const raw = await fs.readFile(biblePathsFile, 'utf-8');
  const data = JSON.parse(raw);
  const bookEntry = data.books.find((b) => b.name === book);
  if (!bookEntry) {
    console.error('Book not found in bible_paths.json');
    process.exit(1);
  }
  // Read Yoruba file to count verses (fallback to 30)
  function chapterFilePath(basePath, chap) {
    const pad = String(chap).padStart(3, '0');
    return basePath.replace(/_001(?![0-9])/, `_${pad}`);
  }
  const yoPath = chapterFilePath(bookEntry.yorubaFilePath, chapter);
  const absYo = path.join(process.cwd(), 'public', yoPath);
  let verseCount = 30;
  try {
    const content = await fs.readFile(absYo);
    let text = content.toString('utf8');
    if (/\u0000/.test(text)) text = content.toString('utf16le');
    text = text.replace(/\r\n?/g, '\n');
    const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const versePattern = /^(\d{1,3})\s+/;
    const numbers = lines.map(l => (versePattern.test(l) ? parseInt(l.match(versePattern)[1], 10) : null)).filter(Boolean);
    const max = numbers.length ? Math.max(...numbers) : numbers.length;
    if (max) verseCount = max;
  } catch {
    // ignore
  }
  const spacing = approxDuration / verseCount;
  const timestamps = Array.from({ length: verseCount }, (_, i) => ({ verse: i + 1, time: Math.round(i * spacing) }));
  const outDir = path.join(process.cwd(), 'public', 'audio-timestamps', book);
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${book}_${String(chapter).padStart(3,'0')}.json`);
  await fs.writeFile(outFile, JSON.stringify(timestamps, null, 2));
  console.log(`Wrote ${timestamps.length} placeholder verse timestamps -> ${outFile}`);
}

main().catch(err => { console.error(err); process.exit(1); });

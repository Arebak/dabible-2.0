#!/usr/bin/env node
/** Plain JS search index builder (converted from TS) */
import fs from 'node:fs/promises';
import path from 'node:path';

function padChapter(ch) { return String(ch).padStart(3, '0'); }
function deriveChapterPath(template, chapter) { return template.replace(/_001(?![0-9])/, `_${padChapter(chapter)}`); }
function normalizeNewlines(text) { return text.replace(/\r\n?/g, '\n'); }

function parseVerses(raw) {
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
    const verses = [];
    const globalPattern = /(\d{1,3})\s+([^\d]+)/g;
    let m;
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

async function loadBooks() {
  const file = path.join(process.cwd(), 'public', 'bible_paths.json');
  const raw = await fs.readFile(file, 'utf-8');
  const json = JSON.parse(raw);
  return json.books || [];
}

async function safeRead(abs) {
  try {
    const buf = await fs.readFile(abs);
    let text = buf.toString('utf8');
    if (/\u0000/.test(text)) text = buf.toString('utf16le');
    return text;
  } catch { return ''; }
}

async function main() {
  const books = await loadBooks();
  const out = [];
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
      if (!yoRaw) continue;
      const versesYo = parseVerses(yoRaw);
      const versesEn = enRaw ? parseVerses(enRaw) : [];
      const map = new Map();
      for (const v of versesYo) map.set(v.num, { yo: v.text });
      for (const v of versesEn) {
        const existing = map.get(v.num);
        if (existing) existing.en = v.text; else map.set(v.num, { yo: '', en: v.text });
      }
      for (const [num, val] of map.entries()) {
        const entry = { b: book.name, c: chapter, v: num, yo: val.yo };
        if (val.en) entry.en = val.en;
        out.push(entry);
      }
    }
  }
  const outFile = path.join(process.cwd(), 'public', 'search-index-yo.json');
  await fs.writeFile(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), entries: out }), 'utf-8');
  console.log(`Wrote ${out.length} verse entries -> ${outFile}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => { console.error(err); process.exit(1); });
}

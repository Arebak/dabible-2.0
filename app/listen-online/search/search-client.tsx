"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface VerseIndexEntry { b: string; c: number; v: number; yo: string; en?: string }

// Module-level cache so navigating away/back preserves loaded index
let INDEX_CACHE: VerseIndexEntry[] | null = null;
let INDEX_LOADING: Promise<VerseIndexEntry[] | null> | null = null;
let UNIQUE_TOKENS: Set<string> | null = null;

interface Result extends VerseIndexEntry { score: number; approxTokenMap?: Record<string,string>; fullRef?: boolean }

// Normalize string for search (lowercase + strip diacritics)
function normalizeForSearch(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
}

interface ParsedPart { type: 'word' | 'phrase'; value: string }

function parseQueryParts(raw: string): ParsedPart[] {
  const parts: ParsedPart[] = [];
  const trimmed = raw.trim();
  if (!trimmed) return parts;
  // Match quoted phrases or unquoted tokens
  const regex = /"([^"]+)"|“([^”]+)”|”([^“]+)”|(\S+)/g; // handles straight & curly quotes fallback
  let m: RegExpExecArray | null;
  while ((m = regex.exec(trimmed)) !== null) {
    const phrase = m[1] || m[2] || m[3];
    if (phrase) {
      const norm = normalizeForSearch(phrase.replace(/\s+/g, ' ').trim());
      if (norm) parts.push({ type: 'phrase', value: norm });
    } else if (m[4]) {
      const normToken = normalizeForSearch(m[4]);
      if (normToken) parts.push({ type: 'word', value: normToken });
    }
  }
  return parts;
}

// Diacritic-insensitive highlighter using normalized index mapping
function highlight(text: string, parts: ParsedPart[], approxMap?: Record<string,string>, forceFull?: boolean) {
  if (forceFull) {
    return <mark className="px-0.5 rounded-sm" title="Reference match">{text}</mark>;
  }
  if (!parts.length) return text;
  const normalized = normalizeForSearch(text);
  // Build mapping from normalized index to original index start
  // Because normalization only strips combining marks, string length mapping is 1:1 except removed marks; we can reconstruct by iterating code units.
  const map: number[] = [];
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const norm = normalizeForSearch(char);
    if (norm) { // norm may be '' for combining mark (unlikely here after per-char normalize)
      map[j] = i;
      j += norm.length; // normally 1
    }
  }
  interface Range { s: number; e: number }
  const ranges: Range[] = [];
  for (const p of parts) {
    let needle = p.value;
    if (!normalized.includes(needle) && approxMap && approxMap[p.value]) {
      // Use approximate mapped token/phrase if provided
      needle = approxMap[p.value];
    }
    if (!needle) continue;
    let startIdx = 0;
    while (true) {
      const found = normalized.indexOf(needle, startIdx);
      if (found === -1) break;
      const end = found + needle.length;
      const origStart = map[found] ?? 0;
      const origEnd = map[end - 1] !== undefined ? (map[end - 1] + 1) : (text.length);
      ranges.push({ s: origStart, e: origEnd });
      startIdx = found + needle.length;
      if (ranges.length > 500) break; // safety
    }
  }
  if (!ranges.length) return text;
  // Merge overlapping ranges
  ranges.sort((a,b)=> a.s - b.s || a.e - b.e);
  const merged: Range[] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.s <= last.e) {
      if (r.e > last.e) last.e = r.e;
    } else {
      merged.push({ ...r });
    }
  }
  const out: React.ReactNode[] = [];
  let cursor = 0;
  merged.forEach((r, idx) => {
    if (cursor < r.s) out.push(<React.Fragment key={`t-${cursor}-${r.s}`}>{text.slice(cursor, r.s)}</React.Fragment>);
    const slice = text.slice(r.s, r.e);
    // Decide if approximate by checking if no exact normalized include OR approxMap mapping mismatch
    let isApprox = false;
    if (approxMap) {
      // Re-normalize slice and see if it matches any approxMap value but not original part value
      const normSlice = normalizeForSearch(slice);
      for (const k in approxMap) {
        if (approxMap[k] === normSlice && k !== normSlice) { isApprox = true; break; }
      }
    }
    out.push(
      <mark
        key={`m-${idx}`}
  className={`px-0.5 rounded-sm ${isApprox ? 'bg-amber-200 dark:bg-amber-700 outline outline-dashed outline-amber-600 dark:outline-amber-400' : 'bg-yellow-200 dark:bg-yellow-700'}`}
        title={isApprox ? 'Approximate match' : undefined}
      >{slice}</mark>
    );
    cursor = r.e;
  });
  if (cursor < text.length) out.push(<React.Fragment key={`t-tail-${cursor}`}>{text.slice(cursor)}</React.Fragment>);
  return out;
}

async function fetchIndex(): Promise<VerseIndexEntry[] | null> {
  if (INDEX_CACHE) return INDEX_CACHE;
  if (INDEX_LOADING) return INDEX_LOADING;
  INDEX_LOADING = fetch('/search-index-yo.json')
    .then(r => (r.ok ? r.json() : null))
    .then(json => {
      if (json && Array.isArray(json.entries)) {
        INDEX_CACHE = json.entries as VerseIndexEntry[];
        return INDEX_CACHE;
      }
      return null;
    })
    .catch(() => null)
    .finally(() => { INDEX_LOADING = null; });
  return INDEX_LOADING;
}

type LanguageScope = 'both' | 'yo' | 'en';
type FuzzyMode = 'strict' | 'normal' | 'fuzzy';

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [langScope, setLangScope] = useState<LanguageScope>('both');
  const [fuzzyMode, setFuzzyMode] = useState<FuzzyMode>('normal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loaded, setLoaded] = useState<boolean>(!!INDEX_CACHE);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const parsedParts = useMemo(() => parseQueryParts(debouncedQuery), [debouncedQuery]);
  const [referenceMode, setReferenceMode] = useState<null | { book: string; chapter: number; verses?: number[] }>(null);
  const [ambiguousRef, setAmbiguousRef] = useState<null | { options: string[]; remainder: string }>(null);
  // Persist & restore last search query
  useEffect(() => {
    try {
      const last = localStorage.getItem('dabible_last_search_query_v1');
      if (last) { setQuery(last); setDebouncedQuery(last); }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem('dabible_last_search_query_v1', query); } catch { /* ignore */ }
  }, [query]);

  // If user entered a multi-word query without explicit quotes, we treat the full string
  // as an implicit phrase for scoring (not mandatory for matching, but boosted if present).
  const implicitFullPhrase = useMemo(() => {
    const raw = debouncedQuery.trim();
    if (!raw) return null;
    // Skip if user already using explicit quotes / curly quotes
    if (/["“”]/.test(raw)) return null;
    if (!raw.includes(' ')) return null; // single word only
    // Need at least two word parts parsed, otherwise not meaningful
    const wordCount = parsedParts.filter(p => p.type === 'word').length;
    if (wordCount < 2) return null;
    return normalizeForSearch(raw.replace(/\s+/g, ' ').trim());
  }, [debouncedQuery, parsedParts]);

  // Debounce effect
  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(h);
  }, [query]);

  const runSearch = useCallback((idx: VerseIndexEntry[], parts: ParsedPart[], scope: LanguageScope, implicitPhrase?: string | null, fuzzyModeLocal: FuzzyMode = 'normal'): Result[] => {
    if (!parts.length) return [];
    const res: Result[] = [];

    // Helper: approximate (orthography tolerant) match for single word tokens
    // Strategy: if direct substring not present, compare against each token (word boundary split) in the combined text.
    // Accept if Levenshtein distance <= 1 for length >= 5, or <= 2 for length >= 8 (handles doubled vowels / missing diacritic remnants).
    function approxWordMatch(word: string, combined: string): { ok: boolean; matched?: string } {
      // Early reject for very short words to avoid noise
      if (word.length <= 2) return { ok: false };
      // Tokenize combined (already normalized) on non letters/numbers
      const tokens = combined.split(/[^a-z0-9']+/);
      let best = Infinity;
      let bestToken: string | undefined;
      for (const t of tokens) {
        if (!t) continue;
        const lenDiff = Math.abs(t.length - word.length);
        if (lenDiff > 2) continue; // skip wildly different lengths
  if (t === word) return { ok: true, matched: t }; // exact
        // Quick common prefix/substring heuristic to prune
        if (!t.includes(word[0])) continue;
        const d = levenshtein(word, t);
  if (d < best) { best = d; bestToken = t; }
  if (d === 1) return { ok: true, matched: t };
      }
      if (best === Infinity) return { ok: false };
      // Threshold scaling with length; widen under 'fuzzy'
      const allow2 = word.length >= 8;
      const allow1 = word.length >= 5;
      if (fuzzyModeLocal === 'strict') {
        return { ok: false };
      } else if (fuzzyModeLocal === 'normal') {
        if (allow2 && best <= 2) return { ok: true, matched: bestToken };
        if (allow1 && best <= 1) return { ok: true, matched: bestToken };
        return { ok: false };
      } else { // fuzzy
        if (word.length >= 9 && best <= 3) return { ok: true, matched: bestToken };
        if (allow2 && best <= 2) return { ok: true, matched: bestToken };
        if (allow1 && best <= 1) return { ok: true, matched: bestToken };
        return { ok: false };
      }
    }

    outer: for (const entry of idx) {
      let combinedOriginal: string;
      if (scope === 'yo') combinedOriginal = entry.yo;
      else if (scope === 'en') combinedOriginal = (entry.en || '');
      else combinedOriginal = `${entry.yo} ${entry.en || ''}`;
      const combined = normalizeForSearch(combinedOriginal);
      let approxPenalty = 0; // accumulate small penalties for approximate matches
      const approxTokenMap: Record<string,string> = {};
      for (const part of parts) {
        if (combined.includes(part.value)) continue; // direct match OK
        if (part.type === 'word') {
          const a = approxWordMatch(part.value, combined);
            if (typeof a === 'boolean') {
              if (a) { approxPenalty += 0.4; continue; }
            } else if (a.ok) {
              approxPenalty += 0.4;
              if (a.matched) approxTokenMap[part.value] = a.matched;
              continue;
            }
        }
        // If phrase or word still not matched (even approximately), reject verse
        continue outer;
      }
      // Base score: sum of exact occurrence counts (phrases & words)
      let score = 0;
      for (const part of parts) {
        const matchCount = combined.split(part.value).length - 1;
        score += matchCount;
      }
      // Adjust for approximate matches: subtract penalty (so pure exact matches rank higher)
      if (approxPenalty) score -= approxPenalty;
      // Bonus for contiguous full phrase presence (implicit multi-word query)
      if (implicitPhrase && combined.includes(implicitPhrase)) {
        // Add a large constant so any full phrase match sorts ahead of scattered-only matches.
        // The magnitude just needs to exceed plausible sum-of-occurrence scores.
        score += 1000;
      }
      res.push({ ...entry, score, approxTokenMap: Object.keys(approxTokenMap).length ? approxTokenMap : undefined });
      if (res.length > 5000) break; // soft cap to prevent runaway
    }
    res.sort((a, b) => b.score - a.score || a.b.localeCompare(b.b) || a.c - b.c || a.v - b.v);
    return res.slice(0, 100); // limit top 100
  }, []);

  const ensureIndex = useCallback(async () => {
    if (INDEX_CACHE) return true;
    setLoading(true); setError(null);
    const idx = await fetchIndex();
    setLoading(false);
    if (!idx) { setError('Failed to load search index'); return false; }
    setLoaded(true);
    // Build unique token set lazily (simple split on whitespace & punctuation)
    if (!UNIQUE_TOKENS) {
      UNIQUE_TOKENS = new Set<string>();
      for (const e of idx) {
        for (const piece of `${e.yo} ${e.en || ''}`.toLowerCase().split(/[^\p{L}\p{N}']+/u)) {
          if (piece) UNIQUE_TOKENS.add(piece);
        }
      }
    }
    if (parsedParts.length) {
      setResults(runSearch(idx, parsedParts, langScope, implicitFullPhrase, fuzzyMode));
    }
    return true;
  }, [parsedParts, runSearch, langScope, implicitFullPhrase, fuzzyMode]);

  // Attempt to parse scripture reference like "John 3:16" or "1 John 2:3"
  const tryParseReference = useCallback((raw: string): { book: string; chapter: number; verses?: number[] } | null => {
    const q = raw.trim();
    if (!q) return null;
    // Patterns:
    // Book Chapter:verseSpec  where verseSpec can be 5, 5-8, 5,7,9,12-15
    // Book Chapter (chapter only)
    const complexMatch = q.match(/^(.+?)\s+(\d+):(\d[\d,-]*)$/); // verse specification fragment
    const chapterOnlyMatch = !complexMatch && q.match(/^(.+?)\s+(\d+)$/);
    if (!INDEX_CACHE) return null;
    const books = Array.from(new Set(INDEX_CACHE.map(e => e.b)));
    // Prepare normalization map
    const normBookMap: { norm: string; raw: string }[] = books.map(b => ({ norm: normalizeForSearch(b).replace(/\s+/g,''), raw: b }));
    const process = (m: RegExpMatchArray | null, verseSpec: boolean): { book: string; chapter: number; verses?: number[] } | null => {
      if (!m) return null;
      const bookCandidate = m[1].replace(/\s+/g,' ').trim();
      const chapterNum = parseInt(m[2],10);
      if (!Number.isFinite(chapterNum) || chapterNum <= 0) return null;
      let verses: number[] | undefined;
      if (verseSpec) {
        const spec = m[3];
        if (!spec) return null;
        verses = [];
        for (const part of spec.split(',')) {
          if (!part) continue;
            const range = part.split('-');
            if (range.length === 2) {
              const a = parseInt(range[0],10); const b = parseInt(range[1],10);
              if (Number.isFinite(a) && Number.isFinite(b) && a > 0 && b >= a) {
                for (let v=a; v<=b; v++) verses.push(v);
              }
            } else {
              const v = parseInt(part,10);
              if (Number.isFinite(v) && v>0) verses.push(v);
            }
        }
        if (!verses.length) return null;
        // Deduplicate & sort
        verses = Array.from(new Set(verses)).sort((a,b)=>a-b);
      }
      // Normalize candidate
      const normCand = normalizeForSearch(bookCandidate).replace(/\s+/g,'');
      // Exact norm match else fallback contains
      let matched: string | null = null;
      for (const b of normBookMap) {
        if (b.norm === normCand) { matched = b.raw; break; }
      }
      if (!matched) {
        // Try startsWith for partial (e.g., 'john' matches 'John') but avoid ambiguous cases
        const partials = normBookMap.filter(b => b.norm.startsWith(normCand));
        if (partials.length === 1) matched = partials[0].raw; else if (partials.length > 1) {
          // ambiguous - record suggestions (store entire remaining tail for reconstruction)
          const afterBook = q.slice(bookCandidate.length).trimStart();
          setAmbiguousRef({ options: partials.map(p=>p.raw), remainder: afterBook });
          return null;
        }
      }
      if (!matched) return null;
      return { book: matched, chapter: chapterNum, verses };
    };
    setAmbiguousRef(null);
    let ref = process(complexMatch, true);
    if (!ref) ref = process(chapterOnlyMatch as RegExpMatchArray | null, false);
    return ref;
  }, []);

  // Detect reference mode whenever debouncedQuery changes & index available
  useEffect(() => {
    if (!INDEX_CACHE) { setReferenceMode(null); setAmbiguousRef(null); return; }
    const ref = tryParseReference(debouncedQuery);
    setReferenceMode(ref);
  }, [debouncedQuery, tryParseReference]);

  // Trigger search when tokens change and index loaded
  useEffect(() => {
    // Reference search overrides normal token search
    if (referenceMode && INDEX_CACHE) {
      const { book, chapter, verses } = referenceMode;
      const verseSet = verses ? new Set(verses) : null;
      const refEntries = INDEX_CACHE.filter(e => e.b === book && e.c === chapter && (verseSet ? verseSet.has(e.v) : true));
      const refResults: Result[] = refEntries.map(e => ({ ...e, score: 1_000_000 - e.v, fullRef: true }));
      setResults(refResults);
      setSuggestions([]);
      return;
    }
    if (!parsedParts.length) { setResults([]); setSuggestions([]); return; }
    if (!INDEX_CACHE) return; // wait until loaded
    const newResults = runSearch(INDEX_CACHE, parsedParts, langScope, implicitFullPhrase, fuzzyMode);
    setResults(newResults);
    // Fuzzy suggestions only for single unquoted word
    const onlyWords = parsedParts.filter(p => p.type === 'word');
    if (onlyWords.length === 1 && parsedParts.length === 1 && UNIQUE_TOKENS && newResults.length === 0) {
      const term = onlyWords[0].value;
      const suggestionsLocal: { word: string; dist: number }[] = [];
      let iter = 0;
      for (const w of UNIQUE_TOKENS) {
        if (iter++ > 20000) break;
        const d = levenshtein(term, w);
        if (d <= 2 && w !== term) suggestionsLocal.push({ word: w, dist: d });
      }
      suggestionsLocal.sort((a,b)=> a.dist - b.dist || a.word.localeCompare(b.word));
      setSuggestions(suggestionsLocal.slice(0, 8).map(s=>s.word));
    } else {
      setSuggestions([]);
    }
  }, [parsedParts, runSearch, langScope, implicitFullPhrase, fuzzyMode, referenceMode]);

  // Levenshtein distance implementation (iterative DP with two rows)
  function levenshtein(a: string, b: string): number {
    if (a === b) return 0;
    if (!a) return b.length;
    if (!b) return a.length;
    const prev = new Array(b.length + 1);
    const curr = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 0; i < a.length; i++) {
      curr[0] = i + 1;
      const ca = a[i];
      for (let j = 0; j < b.length; j++) {
        const cost = ca === b[j] ? 0 : 1;
        curr[j + 1] = Math.min(
          prev[j + 1] + 1,      // deletion
          curr[j] + 1,          // insertion
          prev[j] + cost        // substitution
        );
      }
      for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
    }
    return prev[b.length];
  }

  const onFocus = () => { void ensureIndex(); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void ensureIndex();
  };

  return (
    <section aria-labelledby="search-heading relative">
      <h2 id="search-heading" className="sr-only">Bible Search</h2>
      <form onSubmit={onSubmit} className="flex-col gap-3 md:flex-row md:items-end" role="search" aria-label="Bible search form">
        <div className='flex mb-2'>
        <div className="flex w-full">
          {/* <label htmlFor="bible-search" className="block text-sm font-medium mb-1">Search Query</label> */}
          <input
            id="bible-search"
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={onFocus}
            placeholder="e.g. da Judasi or faith"
            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-neutral-800 border-gray-500 dark:border-neutral-600"
            autoComplete="off"
          />
        </div>
        {/* <button
          type="submit"
          className="px-4 py-2 h-10 rounded rounded-l-none bg-blue-600 text-white text-sm font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading && !loaded ? 'Loading…' : 'Search'}
        </button> */}
        </div>
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs">
          <fieldset className="flex gap-2" aria-label="Language scope">
            <legend className="sr-only">Language scope</legend>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="lang-scope" value="both" checked={langScope==='both'} onChange={() => setLangScope('both')} /> Both
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="lang-scope" value="yo" checked={langScope==='yo'} onChange={() => setLangScope('yo')} /> Yoruba
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="lang-scope" value="en" checked={langScope==='en'} onChange={() => setLangScope('en')} /> English
            </label>
          </fieldset>
          <fieldset className="gap-2 ml-4 hidden" aria-label="Fuzzy mode">
            <legend className="sr-only">Fuzzy tolerance</legend>
            <label className="flex items-center gap-1 cursor-pointer" title="Exact only (no spelling tolerance)">
              <input type="radio" name="fuzzy-mode" value="strict" checked={fuzzyMode==='strict'} onChange={() => setFuzzyMode('strict')} /> Strict
            </label>
            <label className="flex items-center gap-1 cursor-pointer" title="Minor variants (recommended)">
              <input type="radio" name="fuzzy-mode" value="normal" checked={fuzzyMode==='normal'} onChange={() => setFuzzyMode('normal')} /> Normal
            </label>
            <label className="flex items-center gap-1 cursor-pointer" title="Broader spelling tolerance">
              <input type="radio" name="fuzzy-mode" value="fuzzy" checked={fuzzyMode==='fuzzy'} onChange={() => setFuzzyMode('fuzzy')} /> Fuzzy
            </label>
          </fieldset>
        </div>
      </form>
  { error || parsedParts.length > 0 || suggestions.length > 0 ? (
        
        <div className="min-h-[2rem] mb-2" aria-live="polite" aria-atomic="true">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && (parsedParts.length > 0 || referenceMode) && (
            <p className="text-xs text-gray-600 dark:text-gray-400">{results.length} {referenceMode ? (referenceMode.verses ? (referenceMode.verses.length>1 ? 'verses' : 'verse') : 'chapter verses') : 'results'}</p>
            )}
            {!error && suggestions.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Did you mean: {suggestions.map(s => (
                <button key={s} type="button" onClick={() => setQuery(s)} className="underline text-blue-600 hover:text-blue-800 mx-1">{s}</button>
            ))}</p>
            )}
            {!error && ambiguousRef && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Book? {ambiguousRef.options.map(opt => {
                return <button key={opt} type="button" onClick={() => setQuery((opt + ' ' + ambiguousRef.remainder).trim())} className="underline text-purple-600 hover:text-purple-800 mx-1">{opt}</button>;
              })}</p>
            )}
        </div>
        
    ) : null }
      
    {/* Range deep link bar for contiguous verses */}
    {referenceMode && referenceMode.verses && referenceMode.verses.length>1 && (() => {
      const vs = referenceMode.verses;
      const contiguous = vs[vs.length-1]-vs[0]+1 === vs.length; // simple contiguous check
      if (!contiguous) return null;
      const bookSlug = referenceMode.book.replace(/\s+/g,'_');
      const rangeHash = `#${bookSlug}-${referenceMode.chapter}-${vs[0]}-${vs[vs.length-1]}`;
      const href = `/listen-online/${bookSlug}/${referenceMode.chapter}${rangeHash}`;
      return <div className="mb-3 text-xs flex items-center gap-2"><a href={href} className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-500">Open Range {vs[0]}–{vs[vs.length-1]}</a><button type="button" onClick={()=>{try{navigator.clipboard.writeText(window.location.origin+href);}catch{}}} className="underline">Copy Range Link</button></div>;
    })()}
    <ol className="space-y-4" aria-label="Search results">
        {results.map(r => {
          const bookSlug = r.b.replace(/\s+/g, '_');
          // Use consistent anchor id pattern matching verse elements: `${book}-${chapter}-${verse}`
          const anchorId = `${bookSlug}-${r.c}-${r.v}`;
          const href = `/listen-online/${bookSlug}/${r.c}#${anchorId}`;
          const fullUrl = typeof window !== 'undefined' ? window.location.origin + href : href;
          const copyLink = async () => {
            try { await navigator.clipboard.writeText(fullUrl); } catch { /* ignore */ }
          };
          return (
            <li key={`${r.b}-${r.c}-${r.v}`} className="border border-gray-200 dark:border-neutral-700 rounded p-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
              <div className="flex justify-between items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{r.b} {r.c}:{r.v}</span>
                <span className="flex items-center gap-2">
                  <button type="button" onClick={copyLink} className="text-[10px] px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600" aria-label="Copy deep link">Copy Link</button>
                  <a href={href} className="text-blue-600 hover:underline">Open</a>
                </span>
              </div>
              {langScope !== 'en' && (
                <p className="text-sm mb-1" lang="yo">{highlight(r.yo, parsedParts, r.approxTokenMap, r.fullRef)}</p>
              )}
              {r.en && langScope !== 'yo' && (
                <p className="text-xs text-gray-700 dark:text-gray-300" lang="en">{highlight(r.en, parsedParts, r.approxTokenMap, r.fullRef)}</p>
              )}
            </li>
          );
        })}
      </ol>
    {loaded && !loading && parsedParts.length > 0 && results.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">No verses matched all your terms.</p>
      )}
  {!parsedParts.length && !referenceMode && !ambiguousRef && (
  <p className="text-xs text-gray-500 italic dark:text-gray-400 mt-0 absolute right-4 bottom-0 hidden md:block">Tips: Use quotes for exact phrases (e.g. &quot;ikun omi&quot;), or a reference like John 3:16, John 3:16-18.</p>
      )}
    </section>
  );
}

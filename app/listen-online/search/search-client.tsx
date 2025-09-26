"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface VerseIndexEntry { b: string; c: number; v: number; yo: string; en?: string }

// Module-level cache so navigating away/back preserves loaded index
let INDEX_CACHE: VerseIndexEntry[] | null = null;
let INDEX_LOADING: Promise<VerseIndexEntry[] | null> | null = null;
let UNIQUE_TOKENS: Set<string> | null = null;

interface Result extends VerseIndexEntry { score: number }

function tokenize(q: string) {
  return q
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .split(/[^\p{L}\p{N}']+/u)
    .filter(Boolean);
}

function highlight(text: string, tokens: string[]) {
  if (!tokens.length) return text;
  const pattern = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return text.split(pattern).map((part, i) => {
    if (pattern.test(part)) {
      return <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 px-0.5 rounded-sm">{part}</mark>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
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

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [langScope, setLangScope] = useState<LanguageScope>('both');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loaded, setLoaded] = useState<boolean>(!!INDEX_CACHE);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tokens = useMemo(() => tokenize(debouncedQuery), [debouncedQuery]);

  // Debounce effect
  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(h);
  }, [query]);

  const runSearch = useCallback((idx: VerseIndexEntry[], toks: string[], scope: LanguageScope): Result[] => {
    if (!toks.length) return [];
    const res: Result[] = [];
    outer: for (const entry of idx) {
      let combined: string;
      if (scope === 'yo') combined = entry.yo.toLowerCase();
      else if (scope === 'en') combined = (entry.en || '').toLowerCase();
      else combined = `${entry.yo} ${entry.en || ''}`.toLowerCase();
      for (const t of toks) {
        if (!combined.includes(t)) continue outer;
      }
      // Simple score: sum of occurrences
      let score = 0;
      for (const t of toks) {
        const matchCount = combined.split(t).length - 1;
        score += matchCount;
      }
      res.push({ ...entry, score });
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
    if (tokens.length) {
      setResults(runSearch(idx, tokens, langScope));
    }
    return true;
  }, [tokens, runSearch, langScope]);

  // Trigger search when tokens change and index loaded
  useEffect(() => {
    if (!tokens.length) { setResults([]); setSuggestions([]); return; }
    if (!INDEX_CACHE) return; // wait until loaded
    const newResults = runSearch(INDEX_CACHE, tokens, langScope);
    setResults(newResults);
    // Fuzzy suggestions if no results and single token
    if (tokens.length === 1 && UNIQUE_TOKENS && newResults.length === 0) {
      const term = tokens[0];
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
  }, [tokens, runSearch, langScope]);

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
      <form onSubmit={onSubmit} className="mb-4 flex-col gap-3 md:flex-row md:items-end" role="search" aria-label="Bible search form">
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
        <div className="flex items-center gap-2 text-xs">
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
        </div>
      </form>
      { error || tokens.length > 0 || suggestions.length > 0 ? (
        
        <div className="min-h-[2rem] mb-2" aria-live="polite" aria-atomic="true">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && tokens.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400">{results.length} results</p>
            )}
            {!error && suggestions.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Did you mean: {suggestions.map(s => (
                <button key={s} type="button" onClick={() => setQuery(s)} className="underline text-blue-600 hover:text-blue-800 mx-1">{s}</button>
            ))}</p>
            )}
        </div>
        
    ) : null }
      
      <ol className="space-y-4" aria-label="Search results">
        {results.map(r => {
          const bookSlug = r.b.replace(/\s+/g, '_');
          const href = `/listen-online/${bookSlug}/${r.c}#v${r.v}`;
          return (
            <li key={`${r.b}-${r.c}-${r.v}`} className="border border-gray-200 dark:border-neutral-700 rounded p-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
              <div className="flex justify-between items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{r.b} {r.c}:{r.v}</span>
                <a href={href} className="text-blue-600 hover:underline">Open</a>
              </div>
              {langScope !== 'en' && (
                <p className="text-sm mb-1" lang="yo">{highlight(r.yo, tokens)}</p>
              )}
              {r.en && langScope !== 'yo' && (
                <p className="text-xs text-gray-700 dark:text-gray-300" lang="en">{highlight(r.en, tokens)}</p>
              )}
            </li>
          );
        })}
      </ol>
      {loaded && !loading && tokens.length > 0 && results.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">No verses matched all your terms.</p>
      )}
      {!tokens.length && (
        <p className="text-xs text-gray-500 italic dark:text-gray-400 mt-0 absolute right-0 bottom-0">Tip: Enter multiple words to narrow results. All words must appear in a verse.</p>
      )}
    </section>
  );
}

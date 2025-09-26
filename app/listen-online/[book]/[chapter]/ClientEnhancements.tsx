"use client";
import React from 'react';
import { ReadingPreferencesProvider, useReadingPreferences } from '@/components/reading/ReadingPreferencesContext';
import ReadingPreferencesControls from '@/components/reading/ReadingPreferencesControls';
import ChapterAudioPlayer from '@/components/reading/ChapterAudioPlayer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCallback } from 'react';

interface VerseData { num: number; yo: string; en?: string }

interface ClientEnhancementsProps {
  book: string;
  chapter: number;
  verses: VerseData[];
  hasNext: boolean; hasPrev: boolean; nextHref: string | null; prevHref: string | null;
}

// Verse actions component (hover / focus tools)
function VerseActions({ verse, book, chapter }: { verse: VerseData; book: string; chapter: number }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const elementId = `${book}-${chapter}-${verse.num}`;
  const deepLink = `/listen-online/${book}/${chapter}#${elementId}`;
  const fullUrl = baseUrl + deepLink;

  const copyYo = async () => {
    try { await navigator.clipboard.writeText(`${verse.num}. ${verse.yo}`); } catch { /* ignore */ }
  };
  const copyBi = async () => {
    try { await navigator.clipboard.writeText(`${verse.num}. ${verse.yo}${verse.en ? ' / ' + verse.en : ''}`); } catch { /* ignore */ }
  };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(fullUrl); } catch { /* noop */ }
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${book} ${chapter}:${verse.num}`, text: verse.yo, url: deepLink }); } catch { /*cancel*/ }
    } else {
      copyLink();
    }
  };

  return (
    <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-[10px] flex gap-1 ml-auto pr-1">
      <button onClick={copyYo} aria-label="Copy Yoruba verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Yo</button>
      <button onClick={copyBi} aria-label="Copy bilingual verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Bi</button>
      <button onClick={copyLink} aria-label="Copy verse link" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Link</button>
      <button onClick={share} aria-label="Share verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Share</button>
    </div>
  );
}

function VersesView({ book, chapter, verses }: { book: string; chapter: number; verses: VerseData[] }) {
  const { showParallel, readingMode } = useReadingPreferences();
  const [enableActions, setEnableActions] = useState(false);
  const activate = () => { if (!enableActions) setEnableActions(true); };
  const containerClasses = readingMode === 'focus' ? 'max-w-prose mx-auto' : '';
  return (
    <div className={`${containerClasses} grid gap-6 ${showParallel && readingMode !== 'focus' ? 'md:grid-cols-2' : 'grid-cols-1'} w-full`} style={{ fontSize: `var(--reading-font-size)`, lineHeight: 'var(--reading-line-height)' }} onMouseMove={activate} onTouchStart={activate}>
      <div>
        <h2 className="text-base font-semibold mb-2">Yoruba</h2>
        <ol className="space-y-2 list-none">
          {verses.map(v => (
            <li key={v.num} id={`${book}-${chapter}-${v.num}`} className="flex items-start gap-2 group relative">
              <span className="w-8 text-right pr-1 select-none text-[11px] font-medium text-gray-500 dark:text-gray-400" aria-hidden>{v.num}</span>
              <p className="text-gray-900 dark:text-gray-100 flex-1" lang="yo">{v.yo}</p>
              {enableActions && <VerseActions verse={v} book={book} chapter={chapter} />}
            </li>
          ))}
        </ol>
      </div>
      {showParallel && readingMode !== 'focus' && (
        <div>
          <h2 className="text-base font-semibold mb-2">English (KJV)</h2>
          <ol className="space-y-2 list-none">
            {verses.map(v => (
              <li key={v.num} id={`${book}-${chapter}-${v.num}-en`} className="flex items-start gap-2 group relative">
                <span className="w-8 text-right pr-1 select-none text-[11px] font-medium text-gray-500 dark:text-gray-400" aria-hidden>{v.num}</span>
                <p className="text-gray-700 dark:text-gray-300 flex-1" lang="en">{v.en || ''}</p>
                {enableActions && <VerseActions verse={v} book={book} chapter={chapter} />}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function StickyMiniNav({ book, chapter, hasPrev, hasNext, prevHref, nextHref }: { book: string; chapter: number; hasPrev: boolean; hasNext: boolean; prevHref: string | null; nextHref: string | null }) {
  const [books, setBooks] = useState<{ name: string; numberOfChapters: number }[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState(book);
  const [selectedChapter, setSelectedChapter] = useState(chapter);

  useEffect(() => {
    let cancelled = false;
    interface RawBook { name: string; numberOfChapters: number }
    ;(async () => {
      try {
        const res = await fetch('/bible_paths.json');
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data?.books) ? (data.books as RawBook[]).map(b => ({ name: b.name, numberOfChapters: b.numberOfChapters })) : [];
        setBooks(list);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // Update chapter options when book changes or list loaded
  useEffect(() => {
    const found = books.find(b => b.name === selectedBook);
    if (found) {
      setChapters(Array.from({ length: found.numberOfChapters }, (_, i) => i + 1));
      if (selectedChapter > found.numberOfChapters) setSelectedChapter(1);
    }
  }, [books, selectedBook, selectedChapter]);

  const navigate = useCallback((b: string, c: number) => {
    window.location.href = `/listen-online/${b}/${c}`;
  }, []);

  const onBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBook = e.target.value;
    setSelectedBook(newBook);
    setSelectedChapter(1);
    navigate(newBook, 1);
  };
  const onChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ch = parseInt(e.target.value, 10) || 1;
    setSelectedChapter(ch);
    navigate(selectedBook, ch);
  };

  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-700 px-3 py-2 flex flex-wrap gap-3 items-center text-xs">
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="mini-book">Book</label>
        <select id="mini-book" value={selectedBook} onChange={onBookChange} className="px-1 py-0.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800">
          <option value={book}>{book}</option>
          {books.filter(b => b.name !== book).map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
        </select>
        <label className="sr-only" htmlFor="mini-chapter">Chapter</label>
        <select id="mini-chapter" value={selectedChapter} onChange={onChapterChange} className="px-1 py-0.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800">
          {chapters.length === 0 && <option value={chapter}>{chapter}</option>}
          {chapters.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {hasPrev && prevHref && <Link prefetch={false} href={prevHref} className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600" aria-label="Previous chapter">Prev</Link>}
        {hasNext && nextHref && <Link prefetch={false} href={nextHref} className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600" aria-label="Next chapter">Next</Link>}
        <Link href="/listen-online/search" className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-500">Search</Link>
      </div>
    </div>
  );
}

function AutoScrollHighlighter({ book, chapter, activeVerse, announce }: { book: string; chapter: number; activeVerse: number | null; announce: (s: string) => void }) {
  const { autoScroll } = useReadingPreferences();
  useEffect(() => {
    if (!activeVerse) return;
    const id = `${book}-${chapter}-${activeVerse}`;
    const el = document.getElementById(id);
    if (!el) return;
    announce(`${book} ${chapter}:${activeVerse}`);
    el.classList.add('ring-2','ring-blue-400','bg-blue-50','dark:bg-blue-900/30');
    if (autoScroll) {
      const rect = el.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    const t = setTimeout(() => {
      el.classList.remove('ring-2','ring-blue-400','bg-blue-50','dark:bg-blue-900/30');
    }, 4000);
    return () => clearTimeout(t);
  }, [activeVerse, autoScroll, book, chapter, announce]);
  return null;
}

export default function ClientEnhancements(props: ClientEnhancementsProps) {
  const audioSrc = `https://developers.dabible.com/audio/yoruba/${props.book}/${props.book}_${String(props.chapter).padStart(3,'0')}.mp3`;
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  return (
    <ReadingPreferencesProvider>
      <StickyMiniNav book={props.book} chapter={props.chapter} hasPrev={props.hasPrev} hasNext={props.hasNext} prevHref={props.prevHref} nextHref={props.nextHref} />
      <div className="my-4">
        <ReadingPreferencesControls />
      </div>
      <ChapterAudioPlayer src={audioSrc} book={props.book} chapter={props.chapter} onActiveVerseChange={setActiveVerse} />
      <AutoScrollHighlighter book={props.book} chapter={props.chapter} activeVerse={activeVerse} announce={setLiveAnnouncement} />
      <div aria-live="polite" className="sr-only" role="status">{liveAnnouncement}</div>
      <VersesView book={props.book} chapter={props.chapter} verses={props.verses} />
    </ReadingPreferencesProvider>
  );
}

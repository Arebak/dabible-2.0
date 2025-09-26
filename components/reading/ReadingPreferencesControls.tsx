"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Columns, BookOpen } from 'lucide-react';
import { useReadingPreferences } from './ReadingPreferencesContext';
import { useThemeMode } from '@/components/theme/ThemeProvider';
import { useRouter } from 'next/navigation';

interface ReadingPreferencesControlsProps {
  book: string;
  chapter: number;
}

interface BookMeta { name: string; numberOfChapters: number }

function AudioToggleButton() {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.playing === 'boolean') setPlaying(detail.playing);
    };
    window.addEventListener('dabible:audioState', handler as EventListener);
    return () => { window.removeEventListener('dabible:audioState', handler as EventListener); };
  }, []);
  const toggle = () => {
    try { window.dispatchEvent(new Event('dabible:toggleAudio')); } catch { /* ignore */ }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Pause audio' : 'Play audio'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-[14px] md:text-[13px] font-medium shadow transition-colors ${playing ? 'bg-[#242424] hover:bg-[#121212]' : 'bg-[#BD2F54] hover:bg-[#a52a4b]'}`}
    >
      {playing ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5" aria-hidden="true" />}
      <span>{playing ? 'Stop Listening' : 'Start Listening'}</span>
    </button>
  );
}

export default function ReadingPreferencesControls({ book, chapter }: ReadingPreferencesControlsProps) {
  const { fontSize, lineHeight, showParallel, readingMode, autoScroll, setFontSize, setLineHeight, setShowParallel, setReadingMode, setAutoScroll, reset } = useReadingPreferences();
  const { theme, setTheme } = useThemeMode();
  const router = useRouter();

  const [books, setBooks] = useState<BookMeta[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState(book);
  const [selectedChapter, setSelectedChapter] = useState(chapter);
  const [loadingBooks, setLoadingBooks] = useState(false);

  // Fetch book metadata once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingBooks(true);
        const res = await fetch('/bible_paths.json');
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        type IncomingBook = { name?: string; numberOfChapters?: number };
        const list: BookMeta[] = Array.isArray(data?.books)
          ? (data.books as IncomingBook[])
              .filter(b => typeof b.name === 'string' && typeof b.numberOfChapters === 'number')
              .map(b => ({ name: b.name as string, numberOfChapters: b.numberOfChapters as number }))
          : [];
        setBooks(list);
      } finally {
        if (!cancelled) setLoadingBooks(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Update chapter options when book changes
  useEffect(() => {
    const found = books.find(b => b.name === selectedBook);
    if (found) {
      const chs = Array.from({ length: found.numberOfChapters }, (_, i) => i + 1);
      setChapters(chs);
      if (selectedChapter > found.numberOfChapters) {
        setSelectedChapter(1);
      }
    }
  }, [books, selectedBook, selectedChapter]);

  const navigate = useCallback((b: string, c: number) => {
    router.push(`/listen-online/${b}/${c}`);
  }, [router]);

  const onBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBook = e.target.value;
    setSelectedBook(newBook);
    setSelectedChapter(1);
    navigate(newBook, 1);
  };
  const onChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chNum = parseInt(e.target.value, 10) || 1;
    setSelectedChapter(chNum);
    navigate(selectedBook, chNum);
  };

  return (
    <div className="sticky top-[180px] z-10 flex flex-wrap items-center gap-3 text-xs bg-[#f0f8ff] dark:bg-neutral-800/70 backdrop-blur p-2 rounded-md border border-neutral-200 dark:border-neutral-700">
      {/* Navigation controls */}
      <div className="flex items-center gap-1">
        <label htmlFor="navBook" className="sr-only">Book</label>
        <select
          id="navBook"
          value={selectedBook}
          onChange={onBookChange}
          className="p-2 text-md rounded border border-gray-400 dark:border-neutral-600 bg-white dark:bg-neutral-700"
          aria-label="Select book"
        >
          <option value={book}>{book}</option>
          {books.filter(b => b.name !== book).map(b => (
            <option key={b.name} value={b.name}>{b.name}</option>
          ))}
        </select>
        <label htmlFor="navChapter" className="sr-only">Chapter</label>
        <select
          id="navChapter"
          value={selectedChapter}
            onChange={onChapterChange}
          className="p-2 text-md rounded border border-gray-400 dark:border-neutral-600 bg-white dark:bg-neutral-700"
          aria-label="Select chapter"
        >
          {chapters.length === 0 && <option value={chapter}>{chapter}</option>}
          {chapters.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {loadingBooks && <span className="text-[10px] text-neutral-500">…</span>}
      </div>
      <div className="flex flex-col gap-0 border-l border-r border-neutral-200 dark:border-neutral-700 px-4 ml-1">
        <label htmlFor="fontSize" className="font-medium">Font Size:</label>
        <input
          id="fontSize"
          type="range"
          min={0.8}
          max={1.6}
          step={0.05}
          value={fontSize}
          onChange={e => setFontSize(parseFloat(e.target.value))}
          aria-label="Adjust font size"
        />
        {/* <span>{(fontSize * 100).toFixed(0)}%</span> */}
      </div>
      <div className="flex flex-col gap-0 border-r border-neutral-200 dark:border-neutral-700 pl-2 pr-4 mr-1">
        <label htmlFor="lineHeight" className="font-medium">Line Height:</label>
        <input
          id="lineHeight"
          type="range"
          min={1.2}
          max={2.0}
          step={0.05}
          value={lineHeight}
          onChange={e => setLineHeight(parseFloat(e.target.value))}
          aria-label="Adjust line height"
          className='w-24'
        />
        {/* <span>{lineHeight.toFixed(2)}</span> */}
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={showParallel ? 'Disable parallel Bible view' : 'Enable parallel Bible view'}
          aria-pressed={showParallel}
          onClick={() => setShowParallel(!showParallel)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] md:text-[14px] font-medium shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8385E] ${showParallel ? 'bg-[#242424] text-white hover:bg-[#121212]' : 'bg-white text-[#242424] border border-gray-400 hover:border-[#C8385E]'}`}
        >
          {!showParallel ? 
            <span className='flex gap-2 items-center'>
                <Columns className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Enable Parallel</span>
                <span className="sm:hidden">Para</span>
            </span> : 
            <span className='flex gap-2 items-center'>
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Disable Parallel</span>
                <span className="sm:hidden">Para</span>
            </span>
            }
        </button>
      </div>
      {/* Audio play/pause */}
      <AudioToggleButton />
  <div className="hidden">
        <input
          id="autoScrollToggle"
          type="checkbox"
          checked={autoScroll}
          onChange={e => setAutoScroll(e.target.checked)}
        />
        <label htmlFor="autoScrollToggle">Auto-scroll</label>
      </div>
  <div className="hidden">
        <label htmlFor="readingMode" className="font-medium">Mode</label>
        <select
          id="readingMode"
          value={readingMode}
          onChange={e => setReadingMode(e.target.value as 'normal' | 'focus')}
          className="border border-neutral-300 dark:border-neutral-600 rounded px-1 py-0.5 bg-white dark:bg-neutral-700"
          aria-label="Select reading mode"
        >
          <option value="normal">Normal</option>
          <option value="focus">Focus</option>
        </select>
      </div>
      <div className="flex ml-auto items-center gap-1">
        {/* <label htmlFor="themeSelect" className="font-medium">Theme</label> */}
        <select
          id="themeSelect"
          value={theme}
          onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'contrast')}
          className="border border-neutral-300 dark:border-neutral-600 rounded px-1 py-0.5 bg-white dark:bg-neutral-700"
          aria-label="Select color theme"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
          {/* <option value="contrast">High Contrast</option> */}
        </select>
      </div>
      <button
        type="button"
        onClick={reset}
        className="px-2 py-1 h-6 rounded border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      >Reset</button>
    </div>
  );
}

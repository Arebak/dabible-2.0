"use client";
import React from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { ReadingPreferencesProvider, useReadingPreferences } from '@/components/reading/ReadingPreferencesContext';
import ReadingPreferencesControls from '@/components/reading/ReadingPreferencesControls';
import ChapterAudioPlayer from '@/components/reading/ChapterAudioPlayer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

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
    <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-[10px] flex gap-1 mx-auto left-0 right-0 pr-1 absolute justify-center">
      <button onClick={copyYo} aria-label="Copy Yoruba verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Yo</button>
      <button onClick={copyBi} aria-label="Copy bilingual verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Bi</button>
      <button onClick={copyLink} aria-label="Copy verse link" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Link</button>
      <button onClick={share} aria-label="Share verse" className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500">Share</button>
    </div>
  );
}

function VersesView({ book, chapter, verses, anchorHighlightSet }: { book: string; chapter: number; verses: VerseData[]; anchorHighlightSet: Set<number> }) {
  const { showParallel, readingMode } = useReadingPreferences();
  const [enableActions, setEnableActions] = useState(false);
  const activate = () => { if (!enableActions) setEnableActions(true); };
  const containerClasses = readingMode === 'focus' ? 'max-w-prose mx-auto' : 'w-full';
  return (
    <div className={`${containerClasses} mt-4 md:mt-8`} style={{ fontSize: `var(--reading-font-size)`, lineHeight: 'var(--reading-line-height)' }} onMouseMove={activate} onTouchStart={activate}>
      <ol className="space-y-2 list-none">
        {verses.map(v => {
          const highlight = anchorHighlightSet.has(v.num) ? 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/30' : '';
          return (
            <li
              key={v.num}
              id={`${book}-${chapter}-${v.num}`}
              className={`group relative rounded-sm ${highlight}`}
            >
              <div className={`flex ${showParallel && readingMode !== 'focus' ? 'md:grid-cols-[2rem_1fr_1fr]' : 'grid-cols-[2rem_1fr]'} gap-3 items-start`}>
                <div className="flex flex-1 flex-row gap-2">
                    <span className="text-right select-none text-[80%] font-bold text-[#C8385E] dark:text-gray-400 pt-0.5" aria-hidden>{v.num}</span>
                    <p className="text-gray-900 dark:text-gray-100" lang="yo">{v.yo}</p>
                </div>
                {showParallel && readingMode !== 'focus' && (
                  <div className="flex flex-1 flex-row gap-2"  lang="en">
                      <span className="text-right select-none text-[80%] font-bold text-[#C8385E] dark:text-gray-400 pt-0.5">{v.num}</span>
                      <p className='text-gray-900 dark:text-gray-100'>{v.en || ''}</p>
                  </div>
                )}
              </div>
              {enableActions && <div className="absolute -top-2 left-1/2 -translate-x-1/2"> <VerseActions verse={v} book={book} chapter={chapter} /> </div>}
            </li>
          );
        })}
      </ol>
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
  // Audio-driven temporary highlight (anchor highlights handled separately via class on elements)
  el.classList.add('ring-2','ring-blue-400','bg-blue-50','dark:bg-blue-900/30');
    if (autoScroll) {
      const rect = el.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    // Keep audio highlight ephemeral
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
  const [anchorHighlightSet, setAnchorHighlightSet] = useState<Set<number>>(new Set());
  // Manage conditional mounting of audio player
  const [mountAudio, setMountAudio] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false); // track play state for show/hide
  const pendingToggleRef = useRef(false);
  const router = useRouter();

  // Listen for global audio state (emitted by ChapterAudioPlayer) so we can hide/show without unmounting
  useEffect(() => {
    const stateHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.playing === 'boolean') {
        setAudioPlaying(detail.playing);
      }
    };
    window.addEventListener('dabible:audioState', stateHandler as EventListener);
    return () => window.removeEventListener('dabible:audioState', stateHandler as EventListener);
  }, []);

  // Auto-advance to next chapter when audio fully ends (if a next chapter exists)
  useEffect(() => {
    if (!props.hasNext || !props.nextHref) return; // nothing to do
    const onEnded = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // Ensure event corresponds to the chapter currently displayed
      if (detail && detail.book === props.book && detail.chapter === props.chapter) {
        // Respect auto-advance preference
        try {
          const allow = localStorage.getItem('dabible_audio_auto_advance_v1');
          if (allow === 'false') return;
        } catch { /* ignore */ }
        // Small delay gives a sense of completion before navigation
        setTimeout(() => {
          // Use Next.js router for client transition
            router.push(props.nextHref as string);
        }, 800);
      }
    };
    window.addEventListener('dabible:audioEnded', onEnded as EventListener);
    return () => window.removeEventListener('dabible:audioEnded', onEnded as EventListener);
  }, [props.book, props.chapter, props.hasNext, props.nextHref, router]);

  // Intercept toggle requests when player isn't mounted yet
  useEffect(() => {
    const toggleHandler = () => {
      if (!mountAudio) {
        pendingToggleRef.current = true;
        setMountAudio(true); // mount player; after mount we'll re-fire toggle
      }
    };
    window.addEventListener('dabible:toggleAudio', toggleHandler);
    return () => window.removeEventListener('dabible:toggleAudio', toggleHandler);
  }, [mountAudio]);

  // On chapter change, if user previously indicated autoplay (persistent) then mount & start
  useEffect(() => {
    try {
      const KEY = 'dabible_audio_autoplay_v1';
      const shouldAuto = localStorage.getItem(KEY) === 'true';
      if (shouldAuto) {
        if (!mountAudio) {
          pendingToggleRef.current = true;
          setMountAudio(true);
        } else {
          // Already mounted: just trigger play
          setTimeout(() => { window.dispatchEvent(new Event('dabible:toggleAudio')); }, 0);
        }
      }
    } catch { /* ignore */ }
  }, [props.book, props.chapter, mountAudio]);

  // Idle timeout: after N minutes inactivity, disable autoplay preference
  useEffect(() => {
    const IDLE_MINUTES = 15; // configurable
    let lastActivity = Date.now();
    const mark = () => { lastActivity = Date.now(); };
    const interval = setInterval(() => {
      const diffMin = (Date.now() - lastActivity) / 60000;
      if (diffMin >= IDLE_MINUTES) {
        try { localStorage.setItem('dabible_audio_autoplay_v1', 'false'); } catch {}
      }
    }, 60000);
    window.addEventListener('mousemove', mark);
    window.addEventListener('keydown', mark);
    window.addEventListener('touchstart', mark);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', mark);
      window.removeEventListener('keydown', mark);
      window.removeEventListener('touchstart', mark);
    };
  }, []);

  // After player mounts, if there was a pending toggle, dispatch it again so the real player handles it
  useEffect(() => {
    if (mountAudio && pendingToggleRef.current) {
      pendingToggleRef.current = false;
      // Defer a tick to ensure ChapterAudioPlayer has run its mount effects
      setTimeout(() => {
        try { window.dispatchEvent(new Event('dabible:toggleAudio')); } catch { /* ignore */ }
      }, 0);
    }
  }, [mountAudio]);

  // On initial mount (and on hash change), if URL contains a verse anchor (#book-chapter-verse) OR range (#book-chapter-start-end) highlight & scroll.
  useEffect(() => {
    const highlightFromHash = () => {
      if (typeof window === 'undefined') return;
      const raw = window.location.hash.replace('#','');
      if (!raw) return;
      // Expect pattern book-chapter-verse (book already slugged with underscores)
      const parts = raw.split('-');
      if (parts.length < 3) return;
      const maybeEnd = parseInt(parts[parts.length - 1], 10);
      const maybeStart = parseInt(parts[parts.length - 2], 10);
      const isRange = !isNaN(maybeStart) && !isNaN(maybeEnd) && parts.length >= 4;
      const highlightSet = new Set<number>();
      if (isRange && maybeStart <= maybeEnd) {
        for (let v = maybeStart; v <= maybeEnd; v++) highlightSet.add(v);
      } else if (!isNaN(maybeEnd)) {
        highlightSet.add(maybeEnd);
      } else {
        return;
      }
      setAnchorHighlightSet(highlightSet);
      // Scroll to first verse in set
      const first = Math.min(...highlightSet);
      const id = `${props.book}-${props.chapter}-${first}`;
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }, 50);
      }
    };
    highlightFromHash();
    window.addEventListener('hashchange', highlightFromHash);
    return () => window.removeEventListener('hashchange', highlightFromHash);
  }, [props.book, props.chapter]);
   return (
     <ReadingPreferencesProvider>
       <ReadingPreferencesControls book={props.book} chapter={props.chapter} />
      {mountAudio && (
        <div className={audioPlaying ? 'sticky top-[230px] z-10' : 'hidden'}>
          <ChapterAudioPlayer
            src={audioSrc}
            book={props.book}
            chapter={props.chapter}
            hasNext={props.hasNext}
            onActiveVerseChange={setActiveVerse}
          />
        </div>
      )}
      <AutoScrollHighlighter book={props.book} chapter={props.chapter} activeVerse={activeVerse} announce={setLiveAnnouncement} />
      <div aria-live="polite" className="sr-only" role="status">{liveAnnouncement}</div>
  <VersesView book={props.book} chapter={props.chapter} verses={props.verses} anchorHighlightSet={anchorHighlightSet} />
      {props.hasPrev && props.prevHref && <FloatingPrevButton href={props.prevHref} book={props.book} chapter={props.chapter} />}
      {props.hasNext && props.nextHref && <FloatingNextButton href={props.nextHref} book={props.book} chapter={props.chapter} />}
    </ReadingPreferencesProvider>
  );
}

function FloatingPrevButton({ href, book, chapter }: { href: string; book: string; chapter: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <div
      className="fixed left-2 md:left-4 top-2/3 -translate-y-1/2 z-50 pointer-events-none"
      aria-label={`${book} chapter ${chapter - 1} (previous chapter)`}
    >
      <Link
        prefetch={false}
        href={href}
        className="pointer-events-auto rounded-full w-10 md:w-15 h-10 md:h-15 flex items-center content-center justify-center align-middle text-2xl bg-[#BD2F54] dark:bg-neutral-700 hover:bg-[#89213C] dark:hover:bg-neutral-600 shadow border border-neutral-200 dark:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Previous chapter"
      >
        <CircleArrowLeft size={36} color='white' />
      </Link>
    </div>,
    document.body
  );
}

function FloatingNextButton({ href, book, chapter }: { href: string; book: string; chapter: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <div
      className="fixed right-2 md:right-4 top-2/3 -translate-y-1/2 z-50 pointer-events-none"
      aria-label={`${book} chapter ${chapter + 1} (next chapter)`}
    >
      <Link
        prefetch={false}
        href={href}
        className="pointer-events-auto rounded-full w-10 md:w-15 h-10 md:h-15 flex items-center content-center justify-center align-middle text-2xl bg-[#BD2F54] dark:bg-neutral-700 hover:bg-[#89213C] dark:hover:bg-neutral-600 shadow border border-neutral-200 dark:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Next chapter"
      >
        <CircleArrowRight size={36} color='white' />
      </Link>
    </div>,
    document.body
  );
}

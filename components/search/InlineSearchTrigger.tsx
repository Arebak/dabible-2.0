"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { X, Search } from 'lucide-react';
import clsx from 'clsx';

// Dynamically import the existing search client so we don't bloat the main bundle.
const SearchClient = dynamic(() => import('@/app/listen-online/search/search-client'), {
  ssr: false,
  loading: () => <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Loading search…</div>
});

/**
 * InlineSearchTrigger
 * Provides a header button that opens a lightweight overlay containing the full search experience.
 * - Lazy loads the heavy search index only when user engages search.
 * - Closes on Escape or clicking backdrop.
 * - Focuses the input automatically when opened (SearchClient already focuses on interaction, we attempt best effort).
 */
export function InlineSearchTrigger() {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const onKey = useCallback((e: KeyboardEvent) => {
    // Global shortcut: press / while not in input/textarea to open
    if (e.key === '/' && !open) {
      const target = e.target as HTMLElement;
      const tag = target?.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !target?.closest('[role="dialog"]')) {
        e.preventDefault();
        setOpen(true);
      }
    } else if (e.key === 'Escape' && open) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  useEffect(() => {
    if (open) {
      // Prevent background scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const close = () => setOpen(false);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Bible search (shortcut /)"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
      >
        <Search className="h-5 w-5" />
      </button>
      {open && (
        <div
          ref={backdropRef}
            onClick={onBackdropClick}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Bible search dialog"
        >
          <div className={clsx(
            'relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-700',
            'max-h-[90vh] overflow-auto'
          )}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 rounded-t-lg">
              <h2 className="text-sm font-semibold">Bible Search</h2>
              <button
                type="button"
                onClick={close}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <SearchClient />
              <p className="mt-4 text-[10px] text-gray-500 dark:text-gray-400">
                Tip: Press / to open search. All query terms must appear in a verse. Use language scope radios to limit results.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import of the existing SearchClient (client component) without forcing ssr:false in a server file.
const SearchClient = dynamic(() => import('../../search/search-client'), {
  // Let Next decide; SearchClient is client-only already.
  loading: () => <div className="text-sm text-gray-600 dark:text-gray-300">Loading search…</div>
});

export default function InlineChapterSearch() {
  return (
    <div className="font-extralight font-sanssss">
      <div className="flex items-center justify-between mb-2">
        {/* <h2 className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200">Search Scripture</h2> */}
        <span className="text-[10px] text-gray-400 dark:text-gray-500 hidden md:block">Press / for quick search</span>
      </div>
      <SearchClient />
    </div>
  );
}

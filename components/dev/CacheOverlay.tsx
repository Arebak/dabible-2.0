"use client";
import React, { useEffect, useState } from "react";
import { chapterCache } from "@/lib/chapterCache";

const POLL_INTERVAL = 2000;

export const CacheOverlay: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(chapterCache.stats());

  useEffect(() => {
    const id = setInterval(() => {
      setStats(chapterCache.stats());
    }, POLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] text-xs font-mono">
      <button
        onClick={() => setOpen(o => !o)}
        className="px-2 py-1 rounded shadow bg-gray-800 text-white hover:bg-gray-700"
      >
        Cache {open ? '▾' : '▴'}
      </button>
      {open && (
        <div className="mt-2 w-64 p-3 rounded bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="font-semibold mb-2">Chapter Cache</p>
          <ul className="space-y-1">
            <li>Size: {stats.size}</li>
            <li>Hits: {stats.hits}</li>
            <li>Misses: {stats.misses}</li>
            <li>Hit Rate: {(stats.hitRate * 100).toFixed(1)}%</li>
            <li>Prefetches: {stats.prefetches}</li>
            <li className="pt-1 border-t border-gray-200 dark:border-gray-700 text-[10px]">
              Recent: {stats.keys.join(', ')}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CacheOverlay;

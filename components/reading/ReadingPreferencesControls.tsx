"use client";
import React from 'react';
import { useReadingPreferences } from './ReadingPreferencesContext';
import { useThemeMode } from '@/components/theme/ThemeProvider';

export default function ReadingPreferencesControls() {
  const { fontSize, lineHeight, showParallel, readingMode, autoScroll, setFontSize, setLineHeight, setShowParallel, setReadingMode, setAutoScroll, reset } = useReadingPreferences();
  const { theme, setTheme } = useThemeMode();

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs bg-neutral-50 dark:bg-neutral-800/60 p-2 rounded-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-1">
        <label htmlFor="fontSize" className="font-medium">Font</label>
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
        <span>{(fontSize * 100).toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-1">
        <label htmlFor="lineHeight" className="font-medium">Line</label>
        <input
          id="lineHeight"
          type="range"
          min={1.2}
          max={2.0}
          step={0.05}
          value={lineHeight}
          onChange={e => setLineHeight(parseFloat(e.target.value))}
          aria-label="Adjust line height"
        />
        <span>{lineHeight.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-1">
        <input
          id="parallelToggle"
          type="checkbox"
          checked={showParallel}
          onChange={e => setShowParallel(e.target.checked)}
        />
        <label htmlFor="parallelToggle">Parallel</label>
      </div>
      <div className="flex items-center gap-1">
        <input
          id="autoScrollToggle"
          type="checkbox"
          checked={autoScroll}
          onChange={e => setAutoScroll(e.target.checked)}
        />
        <label htmlFor="autoScrollToggle">Auto-scroll</label>
      </div>
      <div className="flex items-center gap-1">
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
      <div className="flex items-center gap-1">
        <label htmlFor="themeSelect" className="font-medium">Theme</label>
        <select
          id="themeSelect"
          value={theme}
          onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'contrast')}
          className="border border-neutral-300 dark:border-neutral-600 rounded px-1 py-0.5 bg-white dark:bg-neutral-700"
          aria-label="Select color theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="contrast">Contrast</option>
        </select>
      </div>
      <button
        type="button"
        onClick={reset}
        className="ml-auto px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      >Reset</button>
    </div>
  );
}

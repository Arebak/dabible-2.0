"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export interface ReadingPreferences {
  fontSize: number; // base rem multiplier
  lineHeight: number; // tailwind style number e.g., 1.5
  showParallel: boolean; // show English column
  readingMode?: 'normal' | 'focus'; // focus => single centered column
  autoScroll?: boolean; // auto-scroll verses during audio playback
}

interface ReadingPreferencesContextValue extends ReadingPreferences {
  setFontSize: (v: number) => void;
  setLineHeight: (v: number) => void;
  setShowParallel: (v: boolean) => void;
  setReadingMode: (m: 'normal' | 'focus') => void;
  setAutoScroll: (v: boolean) => void;
  reset: () => void;
}

const DEFAULTS: ReadingPreferences = {
  fontSize: 1.0,
  lineHeight: 1.55,
  showParallel: true,
  readingMode: 'normal',
  autoScroll: true
};

const STORAGE_KEY = 'dabible_reading_prefs_v1';

const ReadingPreferencesContext = createContext<ReadingPreferencesContextValue | undefined>(undefined);

export function ReadingPreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<ReadingPreferences>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  // load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPrefs(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoaded(true);
    }
  }, []);

  // persist
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore quota or private errors
    }
  }, [prefs, loaded]);

  const setFontSize = useCallback((v: number) => {
    setPrefs(p => ({ ...p, fontSize: Math.min(1.6, Math.max(0.8, Number(v.toFixed(2)))) }));
  }, []);
  const setLineHeight = useCallback((v: number) => {
    setPrefs(p => ({ ...p, lineHeight: Math.min(2.0, Math.max(1.2, Number(v.toFixed(2)))) }));
  }, []);
  const setShowParallel = useCallback((v: boolean) => setPrefs(p => ({ ...p, showParallel: v })), []);
  const setReadingMode = useCallback((m: 'normal' | 'focus') => setPrefs(p => ({ ...p, readingMode: m })), []);
  const setAutoScroll = useCallback((v: boolean) => setPrefs(p => ({ ...p, autoScroll: v })), []);
  const reset = useCallback(() => setPrefs(DEFAULTS), []);

  // Provide CSS variables for dynamic scaling (scoped to provider wrapper)
  const style: React.CSSProperties = {
    ['--reading-font-size' as string]: `${prefs.fontSize}rem`,
    ['--reading-line-height' as string]: `${prefs.lineHeight}`,
  };

  return (
    <ReadingPreferencesContext.Provider value={{ ...prefs, setFontSize, setLineHeight, setShowParallel, setReadingMode, setAutoScroll, reset }}>
      <div className='d-container !pt-0' style={style}>{children}</div>
    </ReadingPreferencesContext.Provider>
  );
}

export function useReadingPreferences() {
  const ctx = useContext(ReadingPreferencesContext);
  if (!ctx) throw new Error('useReadingPreferences must be used within ReadingPreferencesProvider');
  return ctx;
}

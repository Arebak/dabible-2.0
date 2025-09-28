"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'contrast';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  cycle: () => void;
}

const STORAGE_KEY = 'dabible_theme_v1';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ORDER: ThemeMode[] = ['light','dark','contrast'];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [loaded, setLoaded] = useState(false);

  // load persisted
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'light' || raw === 'dark' || raw === 'contrast') {
        setThemeState(raw);
      }
      // Intentionally ignoring system preference for now so that default stays light
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  // apply class
  useEffect(() => {
    if (!loaded) return;
    const root = document.documentElement;
    root.classList.remove('light','dark','contrast');
    root.classList.add(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }
  }, [theme, loaded]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const cycle = useCallback(() => {
    setThemeState(prev => {
      const idx = ORDER.indexOf(prev);
      return ORDER[(idx + 1) % ORDER.length];
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
  return ctx;
}

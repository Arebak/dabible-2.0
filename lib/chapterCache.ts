// Lightweight in-memory LRU cache for Bible chapter content.
// Persists across component unmounts within the same session/runtime.

export interface ChapterCacheOptions {
  max?: number; // maximum number of cached chapters
}

class LRUChapterCache {
  private map = new Map<string, string>();
  private order: string[] = []; // most recent at end
  private max: number;
  private hits = 0;
  private misses = 0;
  private prefetches = 0;
  private STORAGE_KEY = "dabible.chapterCache.v1";

  constructor(options: ChapterCacheOptions = {}) {
    this.max = options.max ?? 150; // default large enough for typical session
    if (typeof window !== 'undefined') {
      this.hydrate();
      // persist on page hide / unload
      window.addEventListener('pagehide', () => this.persist());
      window.addEventListener('beforeunload', () => this.persist());
    }
  }

  private touch(key: string) {
    const idx = this.order.indexOf(key);
    if (idx !== -1) this.order.splice(idx, 1);
    this.order.push(key);
  }

  get(key: string): string | undefined {
    if (!this.map.has(key)) return undefined;
    const val = this.map.get(key);
    if (val !== undefined) this.touch(key);
    if (val !== undefined) this.hits++; else this.misses++; // (val undefined case already returned)
    return val;
  }

  set(key: string, value: string) {
    if (this.map.has(key)) {
      this.map.set(key, value);
      this.touch(key);
      return;
    }
    this.map.set(key, value);
    this.order.push(key);
    if (this.order.length > this.max) {
      const evict = this.order.shift();
      if (evict) this.map.delete(evict);
    }
  }

  has(key: string) {
    const exists = this.map.has(key);
    if (exists) this.hits++; else this.misses++;
    return exists;
  }

  size() {
    return this.order.length;
  }

  keys() {
    return [...this.order];
  }

  markPrefetch() { this.prefetches++; }

  stats() {
    return {
      size: this.size(),
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits + this.misses === 0 ? 0 : this.hits / (this.hits + this.misses),
      prefetches: this.prefetches,
      keys: this.keys().slice(-10),
    };
  }

  persist() {
    try {
      const payload = JSON.stringify({
        order: this.order,
        entries: Array.from(this.map.entries())
      });
      sessionStorage.setItem(this.STORAGE_KEY, payload);
    } catch {}
  }

  hydrate() {
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { order: string[]; entries: [string, string][] };
      this.order = parsed.order || [];
      this.map = new Map(parsed.entries || []);
    } catch {}
  }
}

// Singleton instance reused across imports
export const chapterCache = new LRUChapterCache({ max: 200 });

export const makeChapterCacheKey = (language: string, bookName: string, chapter: number) =>
  `${language}::${bookName}::${chapter}`;

export default chapterCache;

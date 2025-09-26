# DaBible 2.0


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Bible Search Feature

The application includes a server-built bilingual (Yoruba + English KJV) Bible search index.

### How it works

1. During `pnpm build` a postbuild step runs:
   - `build:sitemaps` → generates `public/sitemap-chapters.xml` and `public/sitemap.xml`.
   - `build:search-index` → generates `public/search-index-yo.json` containing verse entries.
2. Client route: `/listen-online/search` progressively loads the index only after the input receives focus (to keep initial page loads light).
3. Search is token-based AND matching (all tokens must appear) across the selected language scope:
   - Scope options: Yoruba only, English only, or Both.
4. Results are ranked by simple occurrence score and truncated to the top 100.
5. Query input is debounced (250ms) to reduce recomputation churn.
6. If a single-word query returns zero matches, a lightweight Levenshtein-based fuzzy suggestion list (edit distance ≤ 2) proposes up to 8 alternative tokens.

### File outputs

| File | Purpose |
|------|---------|
| `public/search-index-yo.json` | Search index JSON `{ generatedAt, entries: [{ b, c, v, yo, en? }] }` |
| `scripts/build-search-index.mjs` | Generates search index at build time |
| `scripts/generate-sitemaps.mjs` | Generates chapter sitemap(s) |

### Performance considerations

- Index loads only on demand (focus). For very slow networks you can show a skeleton; current UI shows a loading state.
- Simple in-memory module cache prevents refetch across navigations.
- For much larger indexes (multi-language or commentary) consider:
  - Chunking per book: `search-index-{Book}.json` and lazy merge.
  - Web Worker offload for scoring & fuzzy logic.
  - Precomputed trigram index for faster fuzzy search.
  - Compression at the CDN level (ensure `gzip`/`br`).

### Future enhancement ideas

- Phrase matching (preserve order) toggle.
- Verse range filter or Testament filter.
- Export results (CSV / copy to clipboard).
- Advanced fuzzy (e.g., Damerau-Levenshtein or phonetic equivalents) tuned for Yoruba orthography.
- Weighted scoring (prioritize exact Yoruba matches over English or shorter distance edits).

### Development

Regenerate the search index manually:

```bash
pnpm run build:search-index
```

Regenerate sitemaps manually:

```bash
pnpm run build:sitemaps
```

Open the search UI:

```bash
http://localhost:3000/listen-online/search
```

If you modify verse parsing logic in either the SSR chapter page or `build-search-index.ts`, keep them in sync to avoid mismatch in highlighting vs. displayed SSR verses.

### Accessibility

- Search form has `role="search"` and result counts announced via `aria-live`.
- Language tags `lang="yo"` and `lang="en"` assist screen readers and hyphenation.
- Suggestions are rendered as buttons for keyboard activation.

### Limitations

- Current fuzzy suggestions only trigger on single-token queries (to limit complexity).
- Edit distance threshold (2) is heuristic; may surface noisy suggestions for very short terms.
- No persistent client-side index storage (e.g., IndexedDB) yet; page refresh requires re-fetch.

---

## Roadmap

See the evolving [ROADMAP](./ROADMAP.md) for prioritized upcoming improvements (performance, search, accessibility, SEO, architecture). Feel free to open issues referencing specific roadmap items.

## Reading Experience Enhancements (New)

The chapter reading pages (`/listen-online/[Book]/[Chapter]`) now include progressive client-side enhancements layered on top of fully SEO-friendly server-rendered content.

### Features

| Feature | Description | Persistence | Accessibility Notes |
|---------|-------------|------------|---------------------|
| Sticky Mini Navigation | Book + chapter dropdowns, prev/next links, search shortcut. | N/A | Semantic controls, labels on selects and nav buttons. |
| Reading Preferences | Adjust font size (80%–160%) & line height (1.2–2.0). | `localStorage` | Range inputs labeled; values announced to screen readers. |
| Parallel Toggle | Show/hide English KJV column to reduce visual load on mobile. | `localStorage` | Toggle uses native checkbox with label. |
| Verse Hover Actions | Lazy-hydrated per-verse actions (Copy Yo, Copy Bi, Link, Share). | N/A | Appears on hover/focus; aria labels; minimized initial JS. |
| Stable Verse IDs | Each verse has `id="Book-Chapter-Verse"` enabling consistent deep linking and future sync. | N/A | Hash navigation supported. |
| Progressive Audio Player | Lightweight player (Yoruba audio) + sync state indicator (ready/none/loading). | N/A | Buttons labeled; slider has `aria-label`. |
| Active Verse Highlight + Live | Highlight + polite `aria-live` announcing `Book Chapter:Verse`. | N/A | Screen readers get verse updates without interruption. |
| Focus Reading Mode | Collapses to single centered column (removes parallel English). | `localStorage` | Toggle via preferences select; maintains verse IDs. |
| Timestamp Template Script | `scripts/generate-timestamp-template.mjs` scaffolds verse timing JSON. | N/A | Even spacing baseline for manual refinement. |
| Playback Speed Control | 0.75x–2.0x speed selection. | `localStorage` | Native select + labeled. |
| Resume Playback | Prompt to resume if >5s listened previously. | `localStorage` | Non-intrusive small button. |
| Partial Sync Indicator | Shows percentage of verses with timestamps. | N/A | Updates as timestamps added. |
| Auto-Scroll Preference | Toggle verse auto-follow during playback. | `localStorage` | Accessible checkbox. |
| Internal Timestamp Editor | `?editTimestamps=1` enables capture / import / export. | N/A | Table with Set/Delete controls. |

### Implementation Notes

1. Server component (`page.tsx`) still generates SSR bilingual content & JSON-LD for crawlers.
2. Client enhancement layer (`ClientEnhancements.tsx`) hydrates after load; no blocking for initial HTML.
3. Preferences context exposes CSS variables (`--reading-font-size`, `--reading-line-height`) for future theming or offline reader modes.
4. Audio timestamps hook: looks for optional JSON under `/audio-timestamps/<Book>/<Book>_###.json` (structure: `[{ "verse": number, "time": seconds }]`). If absent, player simply functions without sync.
5. Timestamp editor: append `?editTimestamps=1` to a chapter URL, use Set at each verse start, then Export JSON and place under `public/audio-timestamps/<Book>/`.
6. Verse highlight is time-based and ephemeral (removed after 4s) to avoid persistent clutter.

### Future Opportunities

- Inline per-chapter search / filtering.
- Worker-based timestamp alignment assistance (auto-suggest verse boundaries from audio energy).
- Offline caching of timestamp + audio metadata (IndexedDB).
- Waveform / energy bar visualization.
- Multi-verse selection & export (range copy & JSON export).
- Dark mode preference integration if theme system extended.
- Verse selection multi-copy / export (range copy).
- Dark mode preference integration if theme system extended.

### Developer Pointers

- Client code resides in `app/listen-online/[book]/[chapter]/ClientEnhancements.tsx` and `components/reading/*`.
- Preferences: `ReadingPreferencesContext.tsx` — update defaults or version bump the storage key if schema evolves.
- Audio: `ChapterAudioPlayer.tsx` — extend with waveform, speed controls, or timestamp ingestion.
- Ensure any update to verse parsing logic remains consistent across: search index builder, SSR page, and potential timestamp alignment tools.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - features and API.
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js).

## Deploy on Vercel

Deploy using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

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
| `scripts/build-search-index.ts` | Generates search index at build time |
| `scripts/generate-sitemaps.ts` | Generates chapter sitemap(s) |

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - features and API.
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js).

## Deploy on Vercel

Deploy using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

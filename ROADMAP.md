# Project Roadmap

Living roadmap of enhancements for DaBible 2.0. Use this file to prioritize, track progress, and prevent good ideas from being lost.

## How To Use

- Mark an item status: `Planned`, `In Progress`, `Done`, or `Deferred`.
- Promote items from Backlog into the Current Focus section (top) when selected.
- Keep entries concise; link to issues for implementation details.
- Update after each merged PR touching roadmap items.

## Legend

| Field | Meaning |
|-------|---------|
| Priority | 1 (highest near-term) to 3 (nice-to-have) |
| Status | Planned / In Progress / Done / Deferred |
| Area | Perf, SEO, UX, A11y, Search, Arch, Ops, Data, Security |

---

## Current Focus

| Item | Area | Status | Notes |
|------|------|--------|-------|
| Multi-verse selection & export | UX | Planned | Implement selection model (click / shift / meta) + toolbar actions. |
| Command palette (Cmd+K) quick jump | UX | Planned | Fuzzy navigation to book / chapter / verse. |
| Waveform / energy visualization | UX | Planned | RMS sampling + canvas bars under scrub bar. |
| Worker-assisted timestamp suggestions | UX | Planned | Web Worker energy peak detection feeding editor. |
| Audio sync refinement & verse highlighting | UX | In Progress | Core player stable (resume, speed per chapter, global inherit, volume persist, autoplay, auto-advance); next: waveform + worker suggestions + selection integration. |

---

## Backlog

### Performance (Perf)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Search index chunking (per-book split + lazy merge) | 1 | Planned | Reduces first-load memory & network. |
| Web Worker offload for search scoring | 1 | Planned | Keeps UI thread smooth for large indexes. |
| Edge caching headers for chapter pages | 2 | Planned | Add `Cache-Control` + optional surrogate keys. |
| Route streaming / partial hydration for chapters | 2 | Planned | Faster TTFB & perceived load. |
| Image optimization audit & `<Image>` coverage | 3 | Planned | Lower bandwidth & CLS. |

### Search

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
 | Quoted phrase & multi-word AND search | 1 | Done | Implemented diacritic-insensitive multi-word AND + quoted phrase support with highlighting. |
 | Optional explicit match mode toggle | 2 | Planned | Potential UI control (Any / All / Exact) if user confusion arises; current behavior: All terms (AND) + quotes for exact phrase. |
| Synonym / stemming layer (EN ↔ YO) | 2 | Planned | Improves recall. |
| Advanced fuzzy (Damerau + diacritic weighting) | 2 | Planned | Better Yoruba orthography handling. |
| Relevance scoring (BM25-lite) | 2 | Planned | Improves ranking beyond raw occurrence. |
| Search session shareable URLs (?q=&lang=) | 1 | Planned | Encourages sharing & repeat. |
| Bookmarkable saved queries (local) | 3 | Planned | LocalStorage only initial. |

### UX

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Verse hover actions (copy/share/deep link) | 1 | Done | Implemented w/ lazy hydration + Yoruba/Bilingual copy variants. |
| Parallel column toggle (show/hide English) | 1 | Done | Preference persisted (localStorage). |
| Sticky book/chapter navigation bar | 2 | Done | Book & chapter dropdown mini nav. |
| Adjustable font size & line height (persist) | 2 | Done | Preferences context + CSS vars. |
| Reading / Focus mode toggle | 2 | Done | Collapses to single column focus mode. |
| Audio player integration (if assets) | 1 | Done | Player w/ speed, resume position, verse tick marks, timestamp editor (set/delete/import/export), partial sync %. |
| Autoplay + auto-advance preferences (persist) | 1 | Done | Autoplay flag, auto-advance flag, idle timeout reset after inactivity, conditional next-chapter navigation. |
| Autoplay & auto-advance controls moved into player | 2 | Done | Consolidated audio-related UI inside `ChapterAudioPlayer` for coherence. |
| Autoplay help tooltip | 3 | Done | Tooltip explains difference between Auto Play and Auto-Advance. |
| Conditional auto-advance visibility | 3 | Done | Auto-Advance toggle hidden when there is no next chapter. |
| Global last speed persistence fallback | 2 | Done | Writes both per-chapter and global speed key to inherit previous choice. |
| Volume persistence & last non-zero restore | 2 | Done | Immediate hydration + separate last non-zero key; prevents loud flashes & preserves mute toggle behavior across chapters. |
| Auto-scroll verse sync toggle | 1 | Done | User preference (on/off) w/ persistence & accessible announcement. |
| Partial sync completeness indicator | 2 | Done | Displays % verses with timestamps. |
| Dark / High contrast theme system | 1 | Done | ThemeProvider + header & preferences controls (light/dark/contrast). |
| Multi-verse selection & export | 1 | Planned | Select contiguous / disjoint verses for copy (plain/bilingual) & JSON export. |
| Command palette (Cmd+K) quick jump | 1 | Planned | Fast fuzzy jump to book/chapter/verse; prefetch routes. |
| Waveform / energy visualization | 2 | Planned | Lightweight RMS-based mini waveform under scrub bar. |
| Worker-assisted timestamp suggestions | 2 | Planned | Energy peak detection to propose verse boundary times. |

### Accessibility (A11y)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Dual skip links (to search / chapter content) | 1 | Planned | Faster keyboard nav. |
| Improve focus ring contrast (dark mode) | 1 | Planned | WCAG contrast compliance. |
| Debounced live region updates (less chatter) | 2 | Planned | Better SR experience. |
| High contrast theme toggle | 2 | Done | Contrast palette (black/yellow/white) + variable overrides. |

### SEO

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Add `AudioObject` structured data (if audio) | 1 | Planned | Rich results potential. |
| HTML human sitemap page | 2 | Planned | Crawl assist + user nav. |
| Blog Article + FAQ structured data | 2 | Planned | SERP enhancement. |
| Alternate language hreflang readiness | 3 | Planned | Future i18n scaling. |

### Architecture (Arch)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Shared verse parsing module (DRY) | 1 | Planned | Single source for SSR + index builder. |
| Zod validation for `bible_paths.json` | 1 | Planned | Fail fast on malformed content. |
| Unit tests: parsing & search tokenization | 1 | Planned | Regression safety. |
| Import path linting (no deep relative) | 2 | Planned | Consistent structure. |
| Telemetry/perf marks for search latency | 3 | Planned | Data for optimization. |

### Reliability & Ops (Ops)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Integrity check (sitemap & index size) | 1 | Planned | CI gate to detect empty outputs. |
| Pre-push hook (lint + targeted tests) | 2 | Planned | Developer ergonomics. |
| Error boundary for chapter view | 2 | Planned | Graceful fallback. |
| Structured logging abstraction | 3 | Planned | Filter noise vs signal. |

### Data & Analytics (Data)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Track search queries & zero-result rate | 1 | Planned | Guides relevance work. |
| Track suggestion acceptance rate | 2 | Planned | Tune fuzzy threshold. |
| Book/chapter popularity aggregation | 2 | Planned | Potential landing page features. |

### Internationalization (i18n)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Extract UI strings dictionary | 2 | Planned | Prepares for more locales. |
| Route segment structure for locales | 3 | Planned | Future `/en/` or `/yo/` support. |

### Security & Privacy (Security)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Rate limiting for API routes | 2 | Planned | Abuse prevention. |
| Enhanced spam honeypot on forms | 2 | Planned | Defense in depth. |
| CSP & security headers middleware audit | 1 | Planned | Harden surface. |

### Deployment & Ops Enhancements

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| /health endpoint (commit + build time) | 2 | Planned | Monitoring integration. |
| Font preload refinements | 3 | Planned | CLS + FOUT reduction. |
| Incremental regeneration for blog | 2 | Planned | Fresh content without rebuilds. |

### Future / Stretch

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| PWA offline chapters + cached index | 3 | Planned | Offline scripture access. |
| Verse audio sync highlighting | 2 | In Progress | Highlight + timestamp editor + partial sync %, speed, resume; pending waveform + worker suggestions for refinement. |
| Smart cross-reference suggestions | 3 | Planned | Needs cross-ref dataset. |

---

## Workflow Suggestions

- Create a GitHub issue per roadmap item when you begin work; link back here.
- Keep PR titles prefixed with area tag (e.g., `[Search] Phrase toggle`).
- Update status in this file as part of each PR touching an item.
- Re-evaluate priorities monthly or after any major feature launch.

## Next Step

Choose 3–5 items to move into **Current Focus** and I will scaffold tasks.

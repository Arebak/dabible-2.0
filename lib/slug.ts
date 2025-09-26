// Utility helpers for normalizing and comparing Bible book slugs
// Normalization strategy: lowercase + remove underscores, spaces, and dashes
// Use this for matching dynamic route params to canonical book names.

/** Normalize a book name or slug for comparison (case-insensitive, strip separators). */
export function normalizeBookSlug(value: string): string {
  return value.toLowerCase().replace(/[\s_-]+/g, "");
}

/**
 * Return true if two book strings refer to the same logical book.
 * Example: Genesis, genesis, Ge_ne-sis -> all match
 */
export function isSameBook(a: string, b: string): boolean {
  return normalizeBookSlug(a) === normalizeBookSlug(b);
}

/** Convert a stored canonical book name to a slug suitable for a URL segment. */
export function toBookPathSegment(bookName: string): string {
  return bookName.replace(/\s+/g, "_");
}

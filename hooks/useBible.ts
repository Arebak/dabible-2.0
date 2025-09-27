import { useState, useEffect, ChangeEvent, useRef, useCallback } from "react";
import { chapterCache, makeChapterCacheKey } from "@/lib/chapterCache";
// import type { BibleProp } from "@/typings.d.ts";
import axios from "axios";


interface UseBibleOptions {
  initialBook?: string; // raw book param from URL (can contain _ or spaces)
  initialChapter?: number; // raw chapter param from URL
  syncUrl?: boolean; // whether to push state changes into the URL
}

const normalizeForCompare = (value: string) =>
  value.toLowerCase().replace(/[_\s]+/g, "");

const useBible = (initialLanguage: string, options: UseBibleOptions = {}) => {
  const [books, setBooks] = useState<BibleProp[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleProp>();
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [bookContent, setBookContent] = useState<string>("");
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [audioFilePath, setAudioFilePath] = useState<string>("");
  // loading & error states
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
  const [booksError, setBooksError] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [contentError, setContentError] = useState<string | null>(null);
  // avoid pushing URL during the very first initialization
  const initializedRef = useRef(false);
  // global cache (LRU) via chapterCache
  

  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      setBooksError(null);
      try {
        const response = await axios.get("/bible_paths.json");
        const fetchedBooks: BibleProp[] = response.data.books;
        setBooks(fetchedBooks);

        // Determine initial selected book
        let initialSelected = fetchedBooks[0];
        if (options.initialBook) {
          const target = normalizeForCompare(options.initialBook);
          const match = fetchedBooks.find((b) => normalizeForCompare(b.name) === target);
          if (match) initialSelected = match;
        }
        setSelectedBook(initialSelected);

        // Set initial chapter if provided and valid
        if (options.initialChapter && options.initialChapter > 0) {
          setCurrentChapter(options.initialChapter);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch books:", error);
        if (error && typeof error === 'object' && 'message' in error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setBooksError((error as any).message || "Failed to load books");
        } else {
          setBooksError("Failed to load books");
        }
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, [options.initialBook, options.initialChapter]);

  const fetchBookContent = useCallback(async (book: BibleProp, chapter: number, opts: { force?: boolean } = {}) => {
    const filePath =
      language === "english"
        ? book.englishFilePath.replace(
            "_001",
            `_${String(chapter).padStart(3, "0")}`
          )
        : book.yorubaFilePath.replace(
            "_001",
            `_${String(chapter).padStart(3, "0")}`
          );

    // AUDIO FILE PATH
    const audioFilePath = book.yorubaAudioPaths.replace(
      "_001",
      `_${String(chapter).padStart(3, "0")}`
    );

    setAudioFilePath(audioFilePath);

    const cacheKey = makeChapterCacheKey(language, book.name, chapter);
    if (!opts.force && chapterCache.has(cacheKey)) {
      setBookContent(chapterCache.get(cacheKey) || "");
      setContentError(null);
      return; // no loading state flash for cached content
    }

    setLoadingContent(true);
    setContentError(null);
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();

      let content;
      if (language === "english") {
        const decoder = new TextDecoder("utf-8");
        content = decoder.decode(arrayBuffer);
      } else {
        const decoder = new TextDecoder("utf-16le");
        content = decoder.decode(arrayBuffer);
      }

      setBookContent(content);
      chapterCache.set(cacheKey, content);
      // Prefetch adjacent chapters (next & previous) optimistically (fire-and-forget)
      if (book.numberOfChapters > 1) {
        const adjacents: number[] = [];
        if (chapter + 1 <= book.numberOfChapters) adjacents.push(chapter + 1);
        if (chapter - 1 >= 1) adjacents.push(chapter - 1);
        adjacents.forEach(async (c) => {
          const k = makeChapterCacheKey(language, book.name, c);
          if (chapterCache.has(k)) return;
          const fp = (language === "english" ? book.englishFilePath : book.yorubaFilePath).replace(
            "_001",
            `_${String(c).padStart(3, "0")}`
          );
          try {
            const r = await fetch(fp);
            if (!r.ok) return;
            const ab = await r.arrayBuffer();
            const decoder = new TextDecoder(language === "english" ? "utf-8" : "utf-16le");
            const txt = decoder.decode(ab);
            chapterCache.set(k, txt);
            chapterCache.markPrefetch();
          } catch {
            // silent prefetch failure
          }
        });
      }
    } catch (error: unknown) {
      console.error("Failed to fetch book content:", error);
      setBookContent("");
      if (error && typeof error === 'object' && 'message' in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setContentError((error as any).message || "Failed to load content");
      } else {
        setContentError("Failed to load content");
      }
    } finally {
      setLoadingContent(false);
    }
  }, [language]);

  useEffect(() => {
    if (selectedBook) {
      fetchBookContent(selectedBook, currentChapter);
    }
  }, [selectedBook, currentChapter, language, fetchBookContent]);

  const retryLoadContent = () => {
    if (selectedBook) {
      fetchBookContent(selectedBook, currentChapter, { force: true });
    }
  };


  const handleBookChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBookName = event.target.value;
    const selectedBook = books.find((book) => book.name === selectedBookName);
    setSelectedBook(selectedBook);
    setCurrentChapter(1);

  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    if (!selectedBook) {
      setCurrentChapter(1);
    }
  };

  const handleNextChapter = () => {
    if (selectedBook && currentChapter < selectedBook.numberOfChapters) {
      setCurrentChapter(currentChapter + 1);
      if (options.syncUrl) {
        window.history.pushState({}, '', `/listen-online/${selectedBook.name.replaceAll(" ", "_")}/${currentChapter + 1}`);
      }

    }
  };

  const handlePreviousChapter = () => {
    if (selectedBook && currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      if (options.syncUrl) {
        window.history.pushState({}, '', `/listen-online/${selectedBook.name.replaceAll(" ", "_")}/${currentChapter - 1}`);
      }
    }
  };

  // When user manually changes book (e.g. via dropdown) and syncUrl enabled, reflect in URL (chapter resets to 1 already)
  useEffect(() => {
    if (!options.syncUrl) return;
    if (!selectedBook) return;
    if (!initializedRef.current) {
      // Skip first run so we don't overwrite URL if user navigated directly
      initializedRef.current = true;
      return;
    }
    // push current state into URL
    window.history.replaceState({}, '', `/listen-online/${selectedBook.name.replaceAll(" ", "_")}/${currentChapter}`);
  }, [selectedBook, currentChapter, options.syncUrl]);

  // removed second effect; handled in combined effect above

  return {
    books,
    selectedBook,
    currentChapter,
    bookContent,
    language,
    audioFilePath,
    loadingBooks,
    booksError,
    loadingContent,
    contentError,
    setCurrentChapter,
    handleBookChange,
    handleLanguageChange,
    handleNextChapter,
    handlePreviousChapter,
    setAudioFilePath,
    setSelectedBook,
    retryLoadContent,
  };
};

export default useBible;

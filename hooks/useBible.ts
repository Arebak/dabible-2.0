import { useState, useEffect, ChangeEvent } from "react";
// import type { BibleProp } from "@/typings.d.ts";
import axios from "axios";


const useBible = (initialLanguage: string) => {
  const [books, setBooks] = useState<BibleProp[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleProp>();
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [bookContent, setBookContent] = useState<string>("");
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [audioFilePath, setAudioFilePath] = useState<string>("");
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/bible_paths.json");
        setBooks(response.data.books);
        setSelectedBook(response.data.books[0]);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      fetchBookContent(selectedBook, currentChapter);
    }
  }, [selectedBook, currentChapter, language]);

  const fetchBookContent = async (book: BibleProp, chapter: number) => {
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

    try {
      const response = await fetch(filePath);
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
    } catch (error) {
      console.error("Failed to fetch book content:", error);
      setBookContent("Failed to load content");
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
      window.history.pushState({}, '', `/listen-online/${selectedBook.name}/${currentChapter + 1}`);

    }
  };

  const handlePreviousChapter = () => {
    if (selectedBook && currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      window.history.pushState({}, '', `/listen-online/${selectedBook.name}/${currentChapter - 1}`);
    }
  };

  return {
    books,
    selectedBook,
    currentChapter,
    bookContent,
    language,
    audioFilePath,
    setCurrentChapter,
    handleBookChange,
    handleLanguageChange,
    handleNextChapter,
    handlePreviousChapter,
    setAudioFilePath,
  };
};

export default useBible;

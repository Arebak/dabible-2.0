import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import { BibleProp } from "@/typings";
// import FontSizeSelector from "../FontSizeSelector";

const SelectBook = () => {
  const [books, setBooks] = useState<BibleProp[]>();
  const [selectedBook, setSelectedBook] = useState<BibleProp>();
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [bookContent, setBookContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("english");
  const [audioFilePath, setAudioFilePath] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/bible_paths.json");
        setBooks(response.data.books);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook, currentChapter, language]);

  const fetchBookContent = async (
    book: BibleProp,
    chapter: number
  ): Promise<void> => {
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

  const handleBookChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedBookName = event.target.value;
    const selectedBook = books?.find((book) => book.name === selectedBookName);
    setSelectedBook(selectedBook);
    setCurrentChapter(1); // Reset to first chapter
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    // Preserve the current chapter if a book is already selected
    if (!selectedBook) {
      setCurrentChapter(1); // Reset to first chapter only if no book is selected
    }
  };

  const handleNextChapter = () => {
    if (selectedBook && currentChapter < selectedBook.numberOfChapters) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (selectedBook && currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  // Font size
  // List of font sizes
  const fontSizes: string[] = [
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
  ];

  // State to manage the selected font size
  const [selectedFontSize, setSelectedFontSize] = useState<string>("16px");

  // Handler for changing the font size
  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFontSize(e.target.value);
  };

  return (
    <div className="flex justify-between w-full ">
      <div className="flex-[0.6]">
        <div className="flex justify-between">
          <select onChange={handleBookChange}>
            <option value="">Select a book</option>
            {books?.map((book, index) => (
              <option key={index} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>

          <select onChange={handleLanguageChange} value={language}>
            <option value="english">English</option>
            <option value="yoruba">Yoruba</option>
          </select>

          <select
            id="fontSizeSelect"
            value={selectedFontSize}
            onChange={handleFontSizeChange}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <div className="">
            <div className="flex justify-between items-center mt-5 px-5">
              <button
                className="bg-slate-600 text-white px-5 py-2 rounded-xl"
                onClick={handlePreviousChapter}
                disabled={currentChapter === 1}
              >
                Previous
              </button>
              <button
                className="bg-slate-600 text-white px-5 py-2 rounded-xl"
                onClick={handleNextChapter}
                disabled={currentChapter === selectedBook.numberOfChapters}
              >
                Next
              </button>
            </div>
            <h2 className="px-5 pt-5 font-bold text-xl">
              {selectedBook.name} - Chapter {currentChapter}
            </h2>
            <div style={{ fontSize: selectedFontSize }}>{bookContent}</div>
          </div>
        )}
      </div>

      <div className="px-8 flex-[0.4]">
        <div className="w-2/3">
          {language === "yoruba" && (
            <AudioPlayer
              src={audioFilePath}
              prevChapter={handlePreviousChapter}
              nextChapter={handleNextChapter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBook;

import React, { ChangeEvent, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import AudioPlayer from "./AudioPlayer";
import TopLangControls from "./AudioPlayerTopLangControls";
import MiddleTabControls from "./AudioPlayerTabControlsMiddle";
import BibleBody from "./AudioPlayerBibleBody";

interface BibleTabProps {
  parallelBibleVisibility?: boolean;
  selectedBook: { name: string; numberOfChapters: number } | undefined;
  currentChapter: number;
  selectedFontSize: string;
  bookContent: string;
  selectedLanguage: string;
  language: string;
  books: { name: string; numberOfChapters: number }[];
  fontSizes: string[];
  audioUIVisibility: boolean;
  audioSrc: string;
  handleLanguageChange: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
  handlePreviousChapter: () => void;
  handleNextChapter: () => void;
  handleBookChange: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
  handleChapterChange: (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => void;
  handleFontSizeChange: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
  setParallelBibleVisibility?: (visibility: boolean) => void;
  setAudioUIVisibility: (visibility: boolean) => void;
  parallelLanguageChange?: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
}

const BibleTab: React.FC<BibleTabProps> = ({
  parallelBibleVisibility,
  selectedBook,
  currentChapter,
  selectedFontSize,
  selectedLanguage,
  bookContent,
  language,
  books,
  fontSizes,
  audioSrc,
  audioUIVisibility,
  setAudioUIVisibility,
  handleBookChange,
  setParallelBibleVisibility,
  handleLanguageChange,
  handlePreviousChapter,
  handleNextChapter,
  handleChapterChange,
  handleFontSizeChange,
  parallelLanguageChange,
}) => {
  const [audioFullscreenVisibility, setAudioFullscreenVisibility] =
    useState<boolean>(false);

  return (
    <>
      <div
        className={`${
          parallelBibleVisibility ? "w-1/2" : "w-full"
        } relative `}
      >
        <TopLangControls
          language={language}
          parallelLanguageChange={parallelLanguageChange}
          parallelBibleVisibility={parallelBibleVisibility}
          setParallelBibleVisibility={setParallelBibleVisibility}
        />
        <MiddleTabControls
          books={books}
          currentChapter={currentChapter}
          fontSizes={fontSizes}
          handleBookChange={handleBookChange}
          handleChapterChange={handleChapterChange}
          handleFontSizeChange={handleFontSizeChange}
          handleNextChapter={handleNextChapter}
          audioUIVisibility={audioUIVisibility}
          setAudioUIVisibility={setAudioUIVisibility}
          handlePreviousChapter={handlePreviousChapter}
          selectedBook={selectedBook}
          handleLanguageChange={handleLanguageChange}
          selectedLanguage={selectedLanguage}
          selectedFontSize={selectedFontSize}
          parallelBibleVisibility={parallelBibleVisibility}
        />

        <BibleBody
          bookContent={bookContent}
          currentChapter={currentChapter}
          handleBookChange={handleBookChange}
          handleNextChapter={handleNextChapter}
          handlePreviousChapter={handlePreviousChapter}
          selectedBook={selectedBook}
          selectedFontSize={selectedFontSize}
          setAudioUIVisibility={setAudioUIVisibility}
          parallelBibleVisibility={parallelBibleVisibility}
          setParallelBibleVisibility={setParallelBibleVisibility}
        />
      </div>
      {/* AUDIO PLAYER  */}
      {audioUIVisibility && (
        <div
          className={`bg-white sm:border-t fixed z-50 left-0 bottom-0 transform w-full border-grey-700 ${audioFullscreenVisibility ? "pb-0" : "pb-4"}`}
        >
          <AudioPlayer
            src={audioSrc}
            prevChapter={handlePreviousChapter}
            nextChapter={handleNextChapter}
            audioFullscreenVisibility={audioFullscreenVisibility}
            setAudioFullscreenVisibility={() =>
              setAudioFullscreenVisibility(!audioFullscreenVisibility)
            }
            currentBook={selectedBook?.name || ""}
            currentChapter={currentChapter}
          />
        </div>
      )}
    </>
  );
};

export default BibleTab;
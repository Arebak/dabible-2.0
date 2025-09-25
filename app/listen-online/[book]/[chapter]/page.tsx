
"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import useBible from "../../../../hooks/useBible";
import BibleTab from "@/components/audio-player/AudioPlayerBibleTab";
import { useParams } from 'next/navigation';


export default function ListenOnlinePage() {
    const params = useParams();

    const { book, chapter } = params;
      const {
        books: books1,
        selectedBook: selectedBook1,
        currentChapter: currentChapter1,
        setCurrentChapter: setCurrentChapter1,
        bookContent: bookContent1,
        language: language1,
        handleBookChange: handleBookChange1,
        handleLanguageChange: handleLanguageChange1,
        handleNextChapter: handleNextChapter1,
        handlePreviousChapter: handlePreviousChapter1,
        audioFilePath: audioFilePath1,
    } = useBible("yoruba");

    const {
        books: books2,
        selectedBook: selectedBook2,
        currentChapter: currentChapter2,
        setCurrentChapter: setCurrentChapter2,
        bookContent: bookContent2,
        language: language2,
        handleBookChange: handleBookChange2,
        handleLanguageChange: handleLanguageChange2,
        handleNextChapter: handleNextChapter2,
        handlePreviousChapter: handlePreviousChapter2,
        audioFilePath: audioFilePath2,
    } = useBible("english");

    const [parallelBibleVisibility, setParallelBibleVisibility] =
        useState<boolean>(false);
    const [audioUIVisibility1, setAudioUIVisibility1] = useState<boolean>(false);
    const [audioUIVisibility2, setAudioUIVisibility2] = useState<boolean>(false);
    const [selectedFontSize, setSelectedFontSize] = useState<string>("18px");
    const fontSizes: string[] = [
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
    ];

    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFontSize(e.target.value);
    };

    const handleParallelLanguageChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setParallelBibleVisibility(true);
        handleLanguageChange2(event);
    };


  return (
    <main className="mx-auto px-4 overflow-x-scroll">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden pt-10 md:pt-[70px] min-h-[40vh]">
        {/* Faded oval background */}
        <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[1000px] h-[300px] rounded-full"
            style={{
            background:
                "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
            }}
        />

        <Image
            src="/png/red-circle.png"
            alt="heart image"
            width={200}
            height={200}
            className="absolute -top-10 right-0 w-32 md:w-48 lg:w-52"
        />
        <Image
            src="/png/blue-circle.png"
            alt="heart image"
            width={200}
            height={200}
            className="absolute -top-10 left-0 w-32 md:w-48 lg:w-52"
        />
        <div className="max-w-3xl mx-auto text-center px-4">
            <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
                src="/svg/start.svg"
                alt="star icon"
                width={16}
                height={16}
                className="mr-1 w-3 h-3 md:w-4 md:h-4"
            />{" "}
            Listen Online {" "}
            <Image
                src="/svg/start.svg"
                alt="star icon"
                width={16}
                height={16}
                className="ml-1 w-3 h-3 md:w-4 md:h-4"
            />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            {!parallelBibleVisibility
                ? `${(Array.isArray(book) ? book.join(" ") : (book ?? "")).replaceAll(" ", "_")} ${chapter ?? ""}`
                : `${(Array.isArray(book) ? book.join(" ") : (book ?? "")).replaceAll(" ", "_")} ${chapter ?? ""} - Parallel View`}
            </h1>
        </div>
        {/* <BibleWrapper /> */}
         <div className="min-w-full">
            <div className={`${ !parallelBibleVisibility ? "d-container" : "lg:px-20 px-10"} flex lg:flex-row flex-col  justify-between lg:gap-x-8 gap-x-0 gap-y-10 lg:gap-y-0 `}>
                <BibleTab
                parallelBibleVisibility={parallelBibleVisibility}
                handlePreviousChapter={handlePreviousChapter1}
                handleNextChapter={handleNextChapter1}
                selectedBook={selectedBook1}
                currentChapter={currentChapter1}
                selectedFontSize={selectedFontSize}
                bookContent={bookContent1}
                selectedLanguage={language1}
                language={language1}
                books={books1}
                handleChapterChange={(e) => {
                    setCurrentChapter1(parseInt(e.target.value));
                    if (selectedBook1 && selectedBook1.name) {
                        window.history.pushState({}, '', `/listen-online/${selectedBook1.name}/${e.target.value}`);
                    }
                }}
                fontSizes={fontSizes}
                audioSrc={audioFilePath1}
                audioUIVisibility={audioUIVisibility1}
                setAudioUIVisibility={setAudioUIVisibility1}
                handleFontSizeChange={handleFontSizeChange}
                parallelLanguageChange={handleParallelLanguageChange}
                handleLanguageChange={handleLanguageChange1}
                handleBookChange={handleBookChange1}
                />

                <div className={`${parallelBibleVisibility ? "block child-full-w-in-parallel" : "hidden"}`}>
                <BibleTab
                    parallelBibleVisibility={parallelBibleVisibility}
                    setParallelBibleVisibility={setParallelBibleVisibility}
                    handlePreviousChapter={handlePreviousChapter2}
                    handleNextChapter={handleNextChapter2}
                    selectedBook={selectedBook2}
                    currentChapter={currentChapter2}
                    selectedFontSize={selectedFontSize}
                    bookContent={bookContent2}
                    language={language2}
                    selectedLanguage={language2}
                    books={books2}
                    handleChapterChange={(e) => {
                        setCurrentChapter2(parseInt(e.target.value));
                        if (selectedBook2 && selectedBook2.name) {
                            window.history.pushState({}, '', `/listen-online/${selectedBook2.name}/${e.target.value}`);
                        }
                    }}
                    fontSizes={fontSizes}
                    audioSrc={audioFilePath2}
                    audioUIVisibility={audioUIVisibility2}
                    setAudioUIVisibility={() => {
                    setAudioUIVisibility1(false);
                    setAudioUIVisibility2(!audioUIVisibility2);
                    }}
                    handleLanguageChange={handleLanguageChange2}
                    handleBookChange={handleBookChange2}
                    handleFontSizeChange={handleFontSizeChange}
                />
                </div>
            </div>
            </div>
        </section>
    </main>
  );
}

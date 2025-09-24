import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import React, { ChangeEvent } from "react";
import { ReactNode } from "react";

interface BibleTabProps {
  parallelBibleVisibility?: boolean;
  selectedBook: { name: string; numberOfChapters: number } | undefined;
  currentChapter: number;
  selectedFontSize: string;
  bookContent: string;
  handlePreviousChapter: () => void;
  handleNextChapter: () => void;
  handleBookChange: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
  setParallelBibleVisibility?: (visibility: boolean) => void;
  setAudioUIVisibility: (visibility: boolean) => void;
}

const BibleBody: React.FC<BibleTabProps> = ({
  parallelBibleVisibility,
  selectedBook,
  currentChapter,
  selectedFontSize,
  bookContent,
  handlePreviousChapter,
  handleNextChapter,
}) => {
  return (
    <div
      className={`relative md:min-h-[60vh] md:h-fit min-h-[50vh] ${
        parallelBibleVisibility ? "h-[500px]" : "h-full"
      }  w-full overflow-y-auto
     bg-white border-gray-300 border p-4 flex flex-col md:gap-y-10 gap-y-6 items-center `}
    >
      {selectedBook && (
        <>
          <h4 className="text-[#242424] font-bold text-3xl">
            {selectedBook?.name}{" "}
            {selectedBook === undefined ? "" : currentChapter}
          </h4>
          <p
            style={{ fontSize: selectedFontSize }}
            className={`text-xl  ${
              parallelBibleVisibility ? "w-full md:px-4 px-4 sanmi" : "w-full md:px-10"
            } max-w-[1000px] md:leading-[50px] leading-10`}
          >
            {bookContent}
          </p>

          <button
            disabled={currentChapter === 1}
            onClick={handlePreviousChapter}
            className="w-10 h-10 cursor-pointer absolute left-6 top-[30vh] transform -translate-y-1/2 text-black  border-[#D0D5DD] border rounded-full flex justify-center items-center"
          >
            <KeyboardArrowLeftOutlined
              fontSize="medium"
              sx={{ color: "#D0D5DD" }}
            />
          </button>
          <button
            onClick={handleNextChapter}
            disabled={currentChapter === selectedBook?.numberOfChapters}
            className="w-10 h-10 cursor-pointer absolute right-6 top-[30vh] transform -translate-y-1/2 text-black  border-[#D0D5DD] border rounded-full flex justify-center items-center"
          >
            <KeyboardArrowRightOutlined
              fontSize="medium"
              sx={{ color: "#D0D5DD" }}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default BibleBody;

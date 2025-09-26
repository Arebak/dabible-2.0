import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import React, { ChangeEvent } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { MenuBookOutlined as MenuBookOutlinedIcon } from "@mui/icons-material";
import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ReactNode } from "react";
import CustomSelect from "./AudioPlayerCustomSelect";
import { useToggle } from "../store/ToggleContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface MiddleTabControlProps {
  parallelBibleVisibility?: boolean;
  selectedBook: { name: string; numberOfChapters: number } | undefined;
  currentChapter: number;
  selectedFontSize: string;
  selectedLanguage: string;
  audioUIVisibility: boolean;
  books: { name: string; numberOfChapters: number }[];
  fontSizes: string[];
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
  handleLanguageChange: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
  setAudioUIVisibility: (visibility: boolean) => void;
}

const MiddleTabControls: React.FC<MiddleTabControlProps> = ({
  parallelBibleVisibility,
  selectedBook,
  currentChapter,
  selectedFontSize,
  books,
  fontSizes,
  selectedLanguage,
  handlePreviousChapter,
  handleNextChapter,
  handleBookChange,
  handleChapterChange,
  handleFontSizeChange,
  handleLanguageChange,
  audioUIVisibility,
  setAudioUIVisibility,
}) => {
  const { toggleState } = useToggle();
  return (
    <div
      className={`-mt-1 flex justify-between border-l border-t border-r border-gray-300 md:rounded-tr-none rounded-tr-lg  ${
        parallelBibleVisibility ? "sm:p-3 px-0" : "px-4 py-3  "
      }`}
    >
      <div className={`flex items-center flex-wrap sm:gap-2 gap-1 `}>
        {/* LANGUAGE SELECTION  */}
        <Select
          defaultValue=""
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onChange={handleLanguageChange}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <CustomSelect
                  IconName={LanguageOutlinedIcon}
                  labelClassName="hidden md:inline-block"
                  label={selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1) : "Yoruba Language"}
                />
              );
            }
            return selected;
          }}
          sx={{
            border: "none",
            "& fieldset": {
              border: "none",
            },
          }}
          className={`${
            parallelBibleVisibility
              ? "xl:text-sm"
              : "xl:text-base"
          } h-10 focus-within:ring-2 focus-within:ring-blue-800 w-auto capitalize bg-[#f4f4f4] md:flex items-center hidden `}
        >
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="yoruba">Yoruba</MenuItem>
        </Select>

        {/* SELECT A BOOK */}
        <Select
          defaultValue=""
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onChange={handleBookChange}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <CustomSelect
                  IconName={MenuBookOutlinedIcon}
                  label={selectedBook ? selectedBook.name : "Select A Book"}
                />
              );
            }
            const newUrl = window.location.pathname.replace(/(listen-online\/)[^/]+/, `$1${selected.replaceAll(" ", "_")}`);
            window.history.pushState({}, '', newUrl);
            return selected;
          }}
          sx={{
            border: "none",
            "& fieldset": {
              border: "none",
            },
          }}
          className={`${
            parallelBibleVisibility
              ? "xl:text-sm"
              : "xl:text-base"
          } capitalize focus-within:ring-2 focus-within:ring-blue-800 w-auto flex items-center bg-[#f4f4f4] h-10 ${
            toggleState ? "z-20" : "z-30"
          }`}
        >
          {books?.map((book, index) => (
            <MenuItem key={index} value={book.name}>
              {book.name}
            </MenuItem>
          ))}
        </Select>
        {/* SELECT A CHAPTER */}
        <Select
          value={currentChapter ? String(currentChapter) : ""}
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          onChange={handleChapterChange}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <CustomSelect
                  IconName={FormatListBulletedOutlinedIcon}
                  label={`Select A Chapter`}
                />
              );
            }
            return (
              <span><span className="hidden md:inline-block">Chapter</span> {selected}</span>
            );
          }}
          sx={{
            border: "none",
            "& fieldset": {
              border: "none",
            },
          }}
          className={` ${
            parallelBibleVisibility
              ? "xl:text-sm"
              : "xl:text-base"
          } capitalize w-auto focus-within:ring-2 focus-within:ring-blue-800 flex items-center bg-[#f4f4f4] h-10  ${
            toggleState ? "z-20" : "z-30"
          }`}
        >
          {Array.from(
            { length: selectedBook?.numberOfChapters || 0 },
            (_, index) => (
              <MenuItem key={index + 1} value={String(index + 1)}>
                Chapter {index + 1}
              </MenuItem>
            )
          )}
        </Select>

        {/* FONT SIZE  */}
        <Select
          defaultValue=""
          displayEmpty
          IconComponent={ArrowDropDownIcon}
          value={selectedFontSize}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onChange={handleFontSizeChange}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <CustomSelect
                  IconName={FormatSizeOutlinedIcon}
                  label="Font Size"
                />
              );
            }
            return selected;
          }}
          sx={{
            border: "none",
            "& fieldset": {
              border: "none",
            },
          }}
          className={`${
            parallelBibleVisibility
              ? "xl:text-sm"
              : "xl:text-base"
          } capitalize w-auto focus-within:ring-2 focus-within:ring-blue-800 bg-[#f4f4f4] h-10 flex items-center md:hidden  ${
            toggleState ? "z-20" : "z-30"
          } `}
        >
          {fontSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>

        <button
          onClick={() => setAudioUIVisibility(!audioUIVisibility)}
          disabled={!selectedBook}
          className={`disabled:cursor-not-allowed flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-blue-800 justify-center space-x-1.5 bg-[#C8385E] disabled:bg-[#C8385E]/40 rounded-full  py-2.5 text-white cursor-pointer md:w-fit w-full  ${
            parallelBibleVisibility ? "px-3" : "px-5"
          } `}
        >
          {audioUIVisibility ? (
            <>
              <StopIcon sx={{ color: "white" }} />
              <span
                className={`  ${
                  parallelBibleVisibility
                    ? "font-normal font-xs"
                    : "font-[500] text-base"
                }`}
              >
                <span>
                  {" "}
                  Stop <span className="sm:inline-block hidden">Listening</span>
                </span>
              </span>
            </>
          ) : (
            <>
              <PlayArrowIcon sx={{ color: "white" }} />
              <span
                className={` ${
                  parallelBibleVisibility
                    ? "font-normal font-xs"
                    : "font-[500] text-base"
                }`}
              >
                <span>
                  {" "}
                  Start <span className="sm:inline-block hidden">Listening</span>
                </span>
              </span>
            </>
          )}
        </button>

      {!parallelBibleVisibility && (
        <div className={`xl:flex hidden flex-wrap items-center space-x-0`}>
          <IconButton
            onClick={handlePreviousChapter}
            disabled={currentChapter === 1 || !selectedBook}
            className="focus-within:ring-2 focus-within:ring-blue-800"
          >
            <KeyboardArrowLeftOutlined
              className={`${parallelBibleVisibility ? "text-3xl" : "text-4xl"}`}
            />
          </IconButton>
          <IconButton
            onClick={handleNextChapter}
            disabled={
              currentChapter === selectedBook?.numberOfChapters || !selectedBook
            }
            className="focus-within:ring-2 focus-within:ring-blue-800"
          >
            <KeyboardArrowRightOutlined
              className={`${parallelBibleVisibility ? "text-3xl" : "text-4xl"}`}
            />
          </IconButton>
        </div>
      )}

      </div>

      {!parallelBibleVisibility && (
        <div
          className={`md:flex hidden items-center space-x-0 text-sm text-gray-500/60 capitalize`}
        >
          <span className="">
            {selectedBook?.name || "Select a book"}
          </span>
          <ChevronRightIcon className="md:inline-block hidden" />
          <span className="md:inline-block hidden">
            {!selectedBook?.name
              ? "Select A chapter"
              : `Chapter ${currentChapter}`}
          </span>
          <ChevronRightIcon className="" />
        </div>
      )}
    </div>
  );
};

export default MiddleTabControls;

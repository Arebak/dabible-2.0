"use client";

import React, { ChangeEvent, ReactNode } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Select, MenuItem } from "@mui/material";
// import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomSelect from "./AudioPlayerCustomSelect";
import { useToggle } from "../store/ToggleContext";

interface TopLanguageControlProps {
  parallelBibleVisibility?: boolean;
  language: string;
  setParallelBibleVisibility?: (visibility: boolean) => void;
  parallelLanguageChange?: (
    event: ChangeEvent<HTMLSelectElement>,
    child: ReactNode
  ) => void;
}

const TopLangControls: React.FC<TopLanguageControlProps> = ({
  parallelBibleVisibility,
  parallelLanguageChange,
  language,
  setParallelBibleVisibility,
}) => {
  const { toggleState } = useToggle();
  return (
    <div className="flex md:justify-between sm:gap-x-3 items-center ">
      <div
        className={`${
          parallelBibleVisibility ? "px-4 " : "px-6 space-x-16"
        } pt-2 pb-1 border-[#626262]/40 border-[1px] border-b-0 flex justify-between items-center bg-white md:space-x-16 space-x-3 rounded-tl-[16px] rounded-tr-[16px]`}
      >
        <span
          className={`whitespace-nowrap ${
            parallelBibleVisibility ? "xl:text-sm" : "xl:text-base"
          } capitalize `}
        >
          {language} <span className="md:inline-block hidden">Language</span>
        </span>
        <IconButton
          onClick={() => {
            setParallelBibleVisibility?.(false);
          }}
          className="focus-within:ring-2 focus-within:ring-blue-800"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="flex w-full justify-end h-[56px] sm:-ml-3"></div>

      <Select
        defaultValue=""
        displayEmpty
        IconComponent={ArrowDropDownIcon}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange={parallelLanguageChange}
        renderValue={() => {
          // if (selected === "") {
            return (
              <CustomSelect
                IconName={VerticalSplitIcon}
                label="Parallel Bible"
                labelClassName="hidden md:inline-block"
              />
            );
          // }
          // return selected;
        }}
        sx={{
          border: "1px solid #CCCCCC",
          borderBottom: "0",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          // height: 56,
          backgroundColor: "white",
          "& fieldset": {
            border: "none",
          },
        }}
        className={`${
          parallelBibleVisibility
            ? "xl:w-[180px] xl:text-sm hidden"
            : "w-[230px] xl:text-base"
        } focus-within:ring-2 focus-within:ring-blue-800 flex items-center capitalize  ${toggleState ? "z-20" : "z-30"} `}
      >
        <MenuItem value="english">English</MenuItem>
        <MenuItem value="yoruba">Yoruba</MenuItem>
      </Select>
      {/* <SearchOutlinedIcon
        fontSize="medium"
        className={` text-white bg-[#C8385E] md:hidden sm:inline-block hidden p-1 text-5xl rounded-full cursor-pointer`}
      />
      <button
        className={`${
          parallelBibleVisibility
            ? "font-normal text-sm"
            : " font-[500] text-base"
        } text-gray-500 mx-2 inline-block md:hidden`}
      >
        Share
      </button>

      <IconButton className="md:hidden inline-block">
        <MoreVertOutlinedIcon />
      </IconButton> */}
    </div>
  );
};

export default TopLangControls;

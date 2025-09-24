import React, { useRef, useState, useEffect, ChangeEvent } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import Image from "next/image";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { KeyboardArrowDown } from "@mui/icons-material";
interface AudioPlayerProps {
  src?: string;
  prevChapter?: () => void;
  nextChapter?: () => void;
  audioFullscreenVisibility?: boolean;
  setAudioFullscreenVisibility?: () => void;
  currentChapter?: number;
  currentBook?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  prevChapter,
  nextChapter,
  setAudioFullscreenVisibility,
  audioFullscreenVisibility,
  currentChapter,
  currentBook,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleEnd = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [isLooping]);

  // Auto play audio when visible
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [src]);
  // HANDLE PAUSE AND PLAY
  const handleTogglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const playNextChapter = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    nextChapter();
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div
      className={`flex justify-between items-end  max-container w-full  lg:h-[16vh] h-[15vh]`}
    >
      {/* player controls only visible on minimized mobile  */}
      <div
        className={`${
          audioFullscreenVisibility ? "hidden" : "flex bg-transparent"
        }  lg:flex-row flex-col lg:items-end justify-between lg:gap-y-0 gap-y-4  w-full  `}
      >
        {/* MINIMIZED MOBILE */}
        <div className={`flex items-center justify-between `}>
          <div className="flex items-center space-x-3">
            <div className="relative lg:w-[125px] lg:h-[130px] w-[62px] h-[62px] ">
              <Image src="/png/AudioImage.png" alt="player image" fill />
            </div>

            <div className="flex flex-col space-y-2 text-black">
              <h3>{currentBook} ( Yoruba )</h3>
              <p>Chapter {currentChapter}</p>
            </div>
          </div>

          <div className={`lg:hidden flex items-center gap-x-3`}>
            <div onClick={setAudioFullscreenVisibility} className="">
              <OpenInFullIcon
                fontSize="large"
                sx={{ color: "#212121" }}
                className="cursor-pointer"
              />
            </div>

            <button
              onClick={handleTogglePlayPause}
              className="bg-[#F41B1B] text-white py-2.5 px-3 h-fit rounded-full text-sm"
            >
              {isPlaying ? (
                <PauseIcon fontSize="medium" />
              ) : (
                <PlayArrowIcon fontSize="medium" />
              )}
            </button>
          </div>
        </div>
        <div className={`lg:hidden flex `}>
          <audio ref={audioRef} src={src} className="hidden" />

          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full mt-4 appearance-none bg-gray-200 h-1.5 rounded-full"
            style={{
              background: `linear-gradient(to right, #F41B1B ${
                (currentTime / duration) * 100
              }%, #e5e7eb 0%)`,
            }}
          />
        </div>
        {/* MINIMIZED DESKTOP  */}
        <div className="flex-col items-center hidden lg:flex">
          <div className="flex space-x-4 ">
            <button>
              <ShuffleIcon fontSize="medium" sx={{ color: "#C1272D" }} />
            </button>
            <button onClick={prevChapter}>
              <SkipPreviousIcon fontSize="medium" sx={{ color: "#C1272D" }} />
            </button>
            <button
              onClick={handleTogglePlayPause}
              className="bg-[#F41B1B] text-white py-3.5 px-4 h-fit rounded-full text-sm"
            >
              {isPlaying ? (
                <PauseIcon fontSize="medium" />
              ) : (
                <PlayArrowIcon fontSize="medium" />
              )}
            </button>
            <button onClick={playNextChapter}>
              <SkipNextIcon fontSize="medium" sx={{ color: "#C1272D" }} />
            </button>
            <button onClick={toggleLoop}>
              {isLooping ? (
                <RepeatOnIcon fontSize="medium" sx={{ color: "#C1272D" }} />
              ) : (
                <RepeatIcon fontSize="medium" sx={{ color: "#C1272D" }} />
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span>{formatTime(currentTime)}</span>
            <div className="">
              <audio ref={audioRef} src={src} className="hidden" />

              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="lg:w-[650px] w-full mt-4 appearance-none bg-gray-200 h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, #F41B1B ${
                    (currentTime / duration) * 100
                  }%, #e5e7eb 0%)`,
                }}
              />
            </div>
            <span>
              {isNaN(duration) || duration === 0
                ? "0:00"
                : formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="items-center hidden lg:flex gap-x-4 ">
          <div className="flex items-center space-x-2">
            <IconButton onClick={() => setVolume(0.0)}>
              <VolumeUpIcon
                sx={{ color: "#212121" }}
                className="cursor-pointer"
              />
            </IconButton>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="appearance-none bg-gray-200 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(to right, #F41B1B ${
                  volume * 100
                }%, #e5e7eb 0%)`,
              }}
            />
          </div>

          <div onClick={setAudioFullscreenVisibility} className="">
            <OpenInFullIcon
              fontSize="medium"
              sx={{ color: "#212121" }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* FULL SCREEN BLURY AUDIO PLAYER   */}
      <div
        className={`h-[100vh] Audiobg w-full  ${
          audioFullscreenVisibility ? "absolute left-0" : "hidden"
        }`}
      >
        <div className="max-container">
          <div className="relative flex flex-col items-start justify-end h-screen py-16 gap-y-14">
            <IconButton
              className="absolute left-0 text-white top-28"
              onClick={setAudioFullscreenVisibility}
            >
              <KeyboardArrowDown fontSize="large" />
            </IconButton>

            <div className="flex flex-col w-full gap-y-10">
              <div className="flex justify-center w-full">
                <Image
                  src="/png/Yoruba White SVG.png"
                  width={350}
                  height={350}
                  alt="player image"
                />
              </div>
              <div className="flex flex-col items-center space-y-2 text-white">
                <h3 className="text-xl font-semibold">
                  {currentBook} ( Yoruba )
                </h3>
                <p className="text-base font-semibold">
                  Chapter {currentChapter}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-y-8 ">
              <div className="flex space-x-4 ">
                <button>
                  <ShuffleIcon fontSize="medium" sx={{ color: "#fff" }} />
                </button>
                <button onClick={prevChapter}>
                  <SkipPreviousIcon fontSize="medium" sx={{ color: "#fff" }} />
                </button>
                <button
                  onClick={handleTogglePlayPause}
                  className="bg-[#fff]  py-3.5 px-4 h-fit rounded-full text-sm"
                >
                  {isPlaying ? (
                    <PauseIcon fontSize="medium" className="text-[#C1272D]" />
                  ) : (
                    <PlayArrowIcon
                      fontSize="medium"
                      className="text-[#C1272D]"
                    />
                  )}
                </button>
                <button onClick={playNextChapter}>
                  <SkipNextIcon fontSize="medium" sx={{ color: "#fff" }} />
                </button>
                <button onClick={toggleLoop}>
                  {isLooping ? (
                    <RepeatOnIcon fontSize="medium" sx={{ color: "#fff" }} />
                  ) : (
                    <RepeatIcon fontSize="medium" sx={{ color: "#fff" }} />
                  )}
                </button>
              </div>

              <div className="flex w-full">
                <audio ref={audioRef} src={src} className="hidden" />

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full mt-4 appearance-none bg-gray-200 h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(to right, #fff ${
                      (currentTime / duration) * 100
                    }%, #e5e7eb 0%)`,
                  }}
                  id="gradient-range"
                />
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-4">
                  {" "}
                  <IconButton onClick={() => setVolume(0.0)}>
                    <VolumeUpOutlinedIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="appearance-none bg-gray-200 h-1.5 rounded-full"
                    style={{
                      background: `linear-gradient(to right, #F41B1B ${
                        volume * 100
                      }%, #e5e7eb 0%)`,
                    }}
                  />
                </div>
                <IconButton>
                  <IosShareIcon sx={{ color: "#fff" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

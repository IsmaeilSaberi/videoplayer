"use client";
import { IoPlay, IoPause } from "react-icons/io5";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { CgMiniPlayer } from "react-icons/cg";
import { BiFullscreen } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(0);

  const playingHandler = (inp) => {
    inp == 1 ? videoRef.current.play() : videoRef.current.pause();
    setIsPlaying(inp);
  };

  // PLAY AND PAUSE

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[95%] max-w-[1000px]">
        <div className="ctrls absolute right-2 left-2 bottom-1 z-30">
          <div className="bg-transparent text-white p-3 rounded-md flex flex-col gap-3">
            <div className="duration-bar w-full bg-white ">duration bar</div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="text-2xl">
                  {isPlaying == 0 ? (
                    <IoPlay
                      onClick={() => {
                        playingHandler(1);
                      }}
                    />
                  ) : (
                    <IoPause
                      onClick={() => {
                        playingHandler(0);
                      }}
                    />
                  )}
                </button>
                <button className="text-2xl">
                  <FiVolume2 />
                </button>
                <button className="text-2xl">
                  <FiVolumeX />
                </button>
                <input
                  type="range"
                  step={"any"}
                  min={0}
                  max={1}
                  className="video-player-input"
                />
              </div>
              <div className="flex gap-2">
                <button className="text-xl">1.5x</button>
                <button className="text-2xl">
                  <CgMiniPlayer />
                </button>
                <button className="text-2xl">
                  <BiFullscreen />
                </button>
              </div>
            </div>
          </div>
        </div>
        <video ref={videoRef} src={src} className="rounded-lg w-full z-20" />
      </div>
    </div>
  );
};

export default VideoPlayer;

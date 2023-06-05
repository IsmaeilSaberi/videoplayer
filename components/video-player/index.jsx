"use client";
import { IoPlay, IoPause } from "react-icons/io5";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { CgMiniPlayer } from "react-icons/cg";
import { BiFullscreen } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(0);

  // PLAY AND PAUSE
  const playingHandler = (inp) => {
    inp == 1 ? videoRef.current.play() : videoRef.current.pause();
    setIsPlaying(inp);
  };

  // VOLUME
  const [volume, setVolume] = useState(1);
  const [oldVolume, setOLdVolume] = useState(1);
  const volumeInputRef = useRef();

  // SPEED
  const [videoSpeed, setVideoSpeed] = useState(1);
  const speedHandler = () => {
    let newSpeed = videoSpeed + 0.25;
    if (newSpeed > 2.25) {
      newSpeed = 0.5;
    }
    setVideoSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  // PICTURE IN PICTURE
  const pictureInPictureHandler = (inp) => {
    if (inp == 1) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  // FULLSCREEN
  const fullscreenRef = useRef();
  const fullscreenHandler = (inp) => {
    if (inp == 1) {
      fullscreenRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // DURATION
  const [nowTime, setNowTime] = useState(0);
  const [fullTime, setFullTime] = useState(821.5);
  const videoTimeRef = useRef();

  const timeBeauty = (inp) => {
    let minutes = Math.floor(inp / 60);
    let seconds = Math.floor(inp % 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    let output = `${minutes}:${seconds}`;
    return output;
  };

  setInterval(() => {
    if (videoRef.current) {
      if (videoRef.current.currentTime != null) {
        setNowTime(videoRef.current.currentTime);
        videoTimeRef.current.value = videoRef.current.currentTime;
        setFullTime(videoRef.current.duration);
      }
    }
  }, 1000);

  return (
    <div className="flex justify-center items-center">
      <div ref={fullscreenRef} className="relative w-[95%] max-w-[1000px]">
        <div className="ctrls absolute right-2 left-2 bottom-1 z-30">
          <div className="bg-transparent text-white p-3 rounded-md flex flex-col gap-3">
            <div className="duration-bar w-full flex justify-between items-center gap-2">
              <div className="w-10">{timeBeauty(nowTime)}</div>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setNowTime(e.target.value);
                    videoTimeRef.current.value = e.target.value;
                    videoRef.current.currentTime = e.target.value;
                    // playingHandler(0);
                  }}
                  ref={videoTimeRef}
                  type="range"
                  step={"any"}
                  min={0}
                  max={fullTime}
                  defaultValue={0}
                  className="video-player-input h-2 cursor-pointer appearance-none rounded-lg border-transparent transparent w-full"
                />
              </div>
              <div className="w-10">{timeBeauty(fullTime)}</div>
            </div>
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
                  {volume == 0 ? (
                    <FiVolumeX
                      onClick={(e) => {
                        setVolume(oldVolume);
                        volumeInputRef.current.value = oldVolume;
                        videoRef.current.volume = oldVolume;
                      }}
                    />
                  ) : (
                    <FiVolume2
                      onClick={(e) => {
                        setVolume(0);
                        volumeInputRef.current.value = 0;
                        videoRef.current.volume = 0;
                      }}
                    />
                  )}
                </button>
                <div>
                  <input
                    onChange={(e) => {
                      volumeInputRef.current.value = e.target.value;
                      setVolume(e.target.value);
                      setOLdVolume(e.target.value);
                      videoRef.current.volume = e.target.value;
                    }}
                    ref={volumeInputRef}
                    type="range"
                    step={"any"}
                    min={0}
                    max={1}
                    className="video-player-input h-2 cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => speedHandler()} className="text-xl">
                  {videoSpeed}x
                </button>
                <button className="text-2xl">
                  <CgMiniPlayer
                    onClick={() => {
                      !document.pictureInPictureElement
                        ? pictureInPictureHandler(1)
                        : pictureInPictureHandler(0);
                    }}
                  />
                </button>
                <button className="text-2xl">
                  <BiFullscreen
                    onClick={() => {
                      !document.fullscreenElement
                        ? fullscreenHandler(1)
                        : fullscreenHandler(0);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <video
          loop
          ref={videoRef}
          src={src}
          className="rounded-lg w-full z-20 h-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

import React, { useState, useEffect } from "react";

// Importing Icons
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

// Importing utils
import { playAudio } from "../utils";

const Player = ({
  currentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  // Play pause handler
  const playSongHandler = () => {
    // If song is playing pause it and if not play it
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Updates the time handler
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };

  // Format time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Drag Handler
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // Skip handler
  const skipHandler = (direction) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    // Skip forward
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
      playAudio(isPlaying, audioRef);
    } else {
      if ((currentSongIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
      playAudio(isPlaying, audioRef);
    }
  };

  // UseEffect
  useEffect(() => {
    // Setting the state
    const newSongs = songs.map((newSong) => {
      if (newSong.id !== currentSong.id) {
        return {
          ...newSong,
          active: false,
        };
      } else {
        return {
          ...newSong,
          active: true,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  // Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          onClick={() => skipHandler("skip-backward")}
          className="icon skip-back"
        />

        {isPlaying ? (
          <FaPause onClick={playSongHandler} className="icon play" />
        ) : (
          <FaPlay onClick={playSongHandler} className="icon play" />
        )}

        <FaAngleRight
          onClick={() => skipHandler("skip-forward")}
          className="icon skip-forward"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;

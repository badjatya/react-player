import React, { useState, useEffect } from "react";

// Importing Icons
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

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
    setSongInfo({ ...songInfo, currentTime, duration });
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
    } else {
      if ((currentSongIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
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

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
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

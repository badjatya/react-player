import React, { useRef } from "react";

// Importing Icons
import { FaPlay, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Player = ({ currentSong, setIsPlaying, isPlaying }) => {
  // Ref
  const audioRef = useRef(null);

  // Event Handler
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
  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FaAngleLeft className="icon skip-back" />
        <FaPlay onClick={playSongHandler} className="icon play" />
        <FaAngleRight className="icon skip-forward" />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;

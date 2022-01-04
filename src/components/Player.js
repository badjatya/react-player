import React from "react";

// Importing Icons
import { FaPlay, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Player = () => {
  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FaAngleLeft className="icon skip-back" />
        <FaPlay className="icon play" />
        <FaAngleRight className="icon skip-forward" />
      </div>
    </div>
  );
};

export default Player;

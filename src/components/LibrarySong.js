import React from "react";

// Importing utils
import { playAudio } from "../utils";

const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  // Song select handler
  const songSelectHandler = () => {
    setCurrentSong(song);
    // checking is song is playing
    playAudio(isPlaying, audioRef);

    // Setting the state
    const newSongs = songs.map((newSong) => {
      if (newSong.id !== song.id) {
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
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="SongImage" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

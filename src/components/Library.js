import React from "react";

// Importing Components
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          isPlaying={isPlaying}
          setSongs={setSongs}
          songs={songs}
          audioRef={audioRef}
          setCurrentSong={setCurrentSong}
          song={song}
        />
      ))}
    </div>
  );
};

export default Library;

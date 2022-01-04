import React from "react";

// Importing Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          setCurrentSong={setCurrentSong}
          song={song}
        />
      ))}
    </div>
  );
};

export default Library;

import React from "react";

// Importing Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong song={song} />
      ))}
    </div>
  );
};

export default Library;

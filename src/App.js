import React, { useState } from "react";

// Importing Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

// Importing data
import data from "./data";

const App = () => {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Library songs={songs} setCurrentSong={setCurrentSong} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
    </div>
  );
};

export default App;

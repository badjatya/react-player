import React, { useState } from "react";

// Importing Components
import Song from "./components/Song";
import Player from "./components/Player";

// Importing data
import data from "./data";

const App = () => {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
};

export default App;

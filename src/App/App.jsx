import React, { useState } from "react";
import Playlist from "../Playlist/Playlist.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Spotify from "../Spotify/Spotify.js";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]);

  const handleAddTrack = (track) => {
    if (!playlist.some((t) => t.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const handleRemoveTrack = (track) => {
    setPlaylist(playlist.filter((t) => t.id !== track.id));
  };

  const handleClick = (input) => {
    if (input == "") {
      return;
    }
    Spotify.search(input).then(setResults);
  };

  const handleCreate = (playlistName) => {
    Spotify.createPlaylist(playlistName).then((id) => {
      let uriArray = playlist.map((t) => t.uri);
      Spotify.addTracksToSpotify(id, uriArray)
        .then(alert("Playlist Created Successfully"))
        .then(setPlaylist([]));
    });
  };

  return (
    <div className={styles.container}>
      <h1>JAMMMING</h1>
      <SearchBar onSearch={handleClick} />
      <div className={styles.appDiv}>
        <SearchResults results={results} onAdd={handleAddTrack} />
        <Playlist
          onCreate={handleCreate}
          playlist={playlist}
          onRemove={handleRemoveTrack}
        />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import TrackList from "../TrackList/TrackList";
import styles from "./Playlist.module.css";

function Playlist({ onCreate, playlist, onRemove }) {
  const [listName, setListName] = useState("");

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const handleClick = () => {
    onCreate(listName);
    setListName("");
  };

  return (
    <div className={styles.playlistDiv}>
      <input
        className={styles.inputName}
        type="text"
        placeholder="Playlist name"
        value={listName}
        onChange={handleChange}
      />
      <TrackList list={playlist} onRemove={onRemove} />
      <button onClick={handleClick} className={styles.buttonSave}>
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;

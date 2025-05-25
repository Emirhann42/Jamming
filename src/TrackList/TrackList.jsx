import Track from "../Track/Track";
import styles from "./TrackList.module.css";

function TrackList({ list, onRemove }) {
  return (
    <div className="trackListDiv">
      {list.map((track) => (
        <div key={track.id} className={styles.tracklistDiv}>
          <Track track={track} />
          <button
            className={styles.buttonRemove}
            onClick={() => onRemove(track)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
}

export default TrackList;

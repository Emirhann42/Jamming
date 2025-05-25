import styles from "./Track.module.css";

function Track({ track }) {
  return (
    <div className={styles.trackDiv}>
      <h4>{track.name}</h4>
      <p>
        {track.artist} | {track.album}
      </p>
    </div>
  );
}

export default Track;

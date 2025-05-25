import Track from "../Track/Track";
import styles from "./SearchResults.module.css";

function SearchResults({ results, onAdd }) {
  return (
    <div className={styles.resultsDiv}>
      <h2>Results</h2>
      {results.map((track) => {
        return (
          <div key={track.id} className={styles.filterDiv}>
            <Track track={track} />
            <button className={styles.buttonAdd} onClick={() => onAdd(track)}>
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;

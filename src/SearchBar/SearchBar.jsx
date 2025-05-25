import styles from "./SearchBar.module.css";
import { useState } from "react";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className={styles.searchBarDiv}>
      <input
        onChange={handleChange}
        value={searchInput}
        className={styles.inputSearch}
        type="text"
        placeholder="Search a song.."
      />
      <button
        onClick={() => props.onSearch(searchInput)}
        className={styles.buttonSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

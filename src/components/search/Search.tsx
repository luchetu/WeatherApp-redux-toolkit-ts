import React from "react";
import styles from "./Search.module.scss";


interface SearchProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ onSubmit, city, setCity }) => {
  return (
    <form className={styles.input} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.inputValue}
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default Search;

import React, { KeyboardEvent } from 'react';
import styles from './searchbar.module.css';
import ISearchBarProps from '../../model/SearchBar';

const SearchBar: React.FC<ISearchBarProps> = ({
  searchTerm,
  onInputChange,
  onSearchSubmit,
}): JSX.Element => {
  const onSearchSubmitEnter = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearchSubmit();
    }
  };

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchbar__input}
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        placeholder="Search..."
        onKeyUp={onSearchSubmitEnter}
      />
      <button className={styles.searchbar__btn} onClick={onSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

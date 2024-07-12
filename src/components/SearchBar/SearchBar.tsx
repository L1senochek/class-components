import React, { ChangeEvent, KeyboardEvent } from 'react';
import styles from './searchbar.module.css';
import ISearchBarProps from '../../model/SearchBar';

const SearchBar: React.FC<ISearchBarProps> = ({
  searchTerm,
  onInputChange,
  onSearchSubmit,
}): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onInputChange(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearchSubmitEnter(event);
    }
  };

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
        onChange={handleChange}
        placeholder="Search..."
        onKeyUp={handleKeyUp}
      />
      <button className={styles.searchbar__btn} onClick={onSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

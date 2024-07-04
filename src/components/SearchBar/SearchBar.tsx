import React, { ChangeEvent, MouseEvent } from 'react';
import styles from './searchbar.module.css';

interface ISearchBarProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}

class SearchBar extends React.Component<ISearchBarProps> {
  render() {
    const { searchTerm, onInputChange, onSearchSubmit } = this.props;

    return (
      <div className={styles.searchbar}>
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          placeholder="Search..."
        />
        <button onClick={onSearchSubmit}>Search</button>
      </div>
    );
  }
}

export default SearchBar;

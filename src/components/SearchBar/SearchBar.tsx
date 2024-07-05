import React, { KeyboardEvent } from 'react';
import styles from './searchbar.module.css';
import ISearchBarProps from '../../model/SearchBar';

class SearchBar extends React.Component<ISearchBarProps> {
  public constructor(props: ISearchBarProps) {
    super(props);
    this.onSearchSubmitEnter = this.onSearchSubmitEnter.bind(this);
  }

  private onSearchSubmitEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onSearchSubmit();
    }
  }

  public render() {
    const { searchTerm, onInputChange, onSearchSubmit } = this.props;

    return (
      <div className={styles.searchbar}>
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          placeholder="Search..."
          onKeyUp={this.onSearchSubmitEnter}
        />
        <button onClick={onSearchSubmit}>Search</button>
      </div>
    );
  }
}

export default SearchBar;

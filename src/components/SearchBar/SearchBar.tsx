import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './searchbar.module.css';
import ISearchBarProps from '../../model/SearchBar';
import IconLoupe from '../Icons/IconLoupe/IconLoupe';

const SearchBar: React.FC<ISearchBarProps> = ({
  searchTerm,
  onInputChange,
  onSearchSubmit,
}): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const handleInputFocus = (): void => setIsFocused(!isFocused);
  const handleButtonHover = (): void => setIsHovered(!isHovered);

  return (
    <div
      className={`${styles.searchbar} ${isFocused ? styles.focused : ''} ${isHovered ? styles.hovered : ''}`}
      onFocus={handleInputFocus}
      onBlur={handleInputFocus}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonHover}
    >
      <button className={styles.searchbar__btn} onClick={onSearchSubmit}>
        <IconLoupe />
      </button>
      <input
        className={styles.searchbar__input}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchBar;

import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
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
      onSearchSubmit();
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearchSubmit();
  };

  const handleInputFocus = (): void => setIsFocused(!isFocused);
  const handleButtonHover = (): void => setIsHovered(!isHovered);

  return (
    <form
      className={`${styles.searchbar} ${isFocused ? styles.focused : ''} ${isHovered ? styles.hovered : ''}`}
      onFocus={handleInputFocus}
      onBlur={handleInputFocus}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonHover}
      onSubmit={onSubmit}
    >
      <button className={styles.searchbar__btn} type="submit">
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
    </form>
  );
};

export default SearchBar;

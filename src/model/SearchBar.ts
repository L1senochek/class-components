import { ChangeEvent } from 'react';

interface ISearchBarProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

export default ISearchBarProps;

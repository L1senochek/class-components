import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { IAppProps, IGoogleBooksApiItem } from './model/App';

const App: React.FC<IAppProps> = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IGoogleBooksApiItem[]>([]);
  const [, setError] = useState<null | Error>(null);
  const [throwError, setThrowError] = useState<boolean>(false);

  const fetchSearchResults = async (
    term: string,
    limit: number = 10,
    page: number = 1
  ): Promise<void> => {
    try {
      const offset = (page - 1) * limit;
      const query =
        term.trim() !== '' ? encodeURIComponent(term.trim()) : 'book';
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${offset}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('error response');
      }

      const data = await response.json();
      const items: IGoogleBooksApiItem[] = data.items
        ? data.items.map(
            (item: IGoogleBooksApiItem): IGoogleBooksApiItem => ({
              id: item.id,
              volumeInfo: {
                imageLinks: item.volumeInfo.imageLinks
                  ? { thumbnail: item.volumeInfo.imageLinks.thumbnail }
                  : undefined,
                title: item.volumeInfo.title,
                description:
                  item.volumeInfo.description ?? 'No description available',
              },
            })
          )
        : [];

      setSearchResults(items);
      localStorage.setItem('searchTerm', term.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
      const newError =
        error instanceof Error ? error : new Error('Unknown error');
      setError(newError);
    }
  };

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      fetchSearchResults(savedSearchTerm);
    } else {
      fetchSearchResults('');
    }
  }, [setSearchTerm]);

  const handleSearchInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(event.target.value);

  const handleSearchSubmit = (): void => {
    fetchSearchResults(searchTerm);
  };

  const handleThrowError = (): void => setThrowError(true);

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <>
      <header className="top-section">
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className="middle-section">
        <SearchResults searchResults={searchResults} />
      </main>
    </>
  );
};

export default App;

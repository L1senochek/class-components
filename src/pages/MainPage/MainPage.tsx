import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import { IAppProps } from '../../model/App';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Pagination from '../../components/Pagination/Pagination';
import Limit from '../../components/Limit/Limit';
import styles from './main-page.module.css';

const MainPage: React.FC<IAppProps> = (): JSX.Element => {
  const [searchResults, setSearchResults] = useState([]);
  const [, setError] = useState<null | Error>(null);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useSearchQuery('');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  console.log(searchResults, searchParams, currentPage, totalUsers);

  const fetchGitHubUsers = async (
    term: string,
    limit: number = 10,
    page: number = 1
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const query =
        term.trim() !== ''
          ? encodeURIComponent(term.trim())
          : encodeURIComponent('a');
      const url = `https://api.github.com/search/users?q=${query}&per_page=${limit}&page=${page}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();

      setSearchResults(data.items);
      setTotalUsers(data.total_count);
      localStorage.setItem('searchTerm', term.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
      const newError =
        error instanceof Error ? error : new Error('Unknown error');
      setError(newError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      fetchGitHubUsers(savedSearchTerm, limit, currentPage);
    } else {
      fetchGitHubUsers('', limit, currentPage);
    }
  }, [setSearchTerm, currentPage, limit]);

  const handleSearchInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handleLimitChange = (newLimit: number): void => {
    searchParams.set('limit', newLimit.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    fetchGitHubUsers(searchTerm, newLimit, 1);
  };

  const handleSearchSubmit = (): void => {
    searchParams.set('query', searchTerm);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    fetchGitHubUsers(searchTerm, limit, 1);
  };

  const handlePageChange = (newPage: number): void => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    fetchGitHubUsers(searchTerm, limit, newPage);
  };

  const handleThrowError = (): void => setThrowError(true);

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <>
      <header className={styles['top-section']}>
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className={styles['middle-section']}>
        <Limit limit={limit} onLimitChange={handleLimitChange} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <SearchResults searchResults={searchResults} />
        )}
        <Pagination
          totalItems={totalUsers}
          limit={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default MainPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import { IAppProps } from '../../model/App';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Pagination from '../../components/Pagination/Pagination';
import Limit from '../../components/Limit/Limit';
import styles from './main-page.module.css';
import CardModal from '../../components/CardModal/CardModal';
import IconGitHubLogo from '../../components/Icons/iconGitHub/iconGitHub';
import Settings from '../../components/Settings/Settings';

const MainPage: React.FC<IAppProps> = (): JSX.Element => {
  const [searchResults, setSearchResults] = useState([]);
  const [, setError] = useState<null | Error>(null);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useSearchQuery('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

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
    localStorage.setItem('currentPage', currentPage.toString());
    localStorage.setItem('limit', limit.toString());
  }, [setSearchTerm, currentPage, limit]);

  const handleSearchInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handleLimitChange = (newLimit: number): void => {
    searchParams.set('limit', newLimit.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    localStorage.setItem('limit', newLimit.toString());
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
    localStorage.setItem('currentPage', newPage.toString());
    fetchGitHubUsers(searchTerm, limit, newPage);
  };

  const handleItemClick = (itemId: string): void => {
    setSelectedItemId(itemId);
    navigate(`/main/user/${itemId}`);
  };

  const handleThrowError = (): void => setThrowError(true);

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <>
      <header className={styles['top-section']}>
        <div className={styles.logo}>
          <div className={styles.logo__wrapper}>
            <IconGitHubLogo />
            <h1 className={styles.logo__title}>GitHub API</h1>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onInputChange={handleSearchInputChange}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className={styles['middle-section']}>
        <div className={styles.settings__wrapper}>
          <Limit limit={limit} onLimitChange={handleLimitChange} />
          <Settings />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <SearchResults
            searchResults={searchResults}
            onItemClick={handleItemClick}
          />
        )}
        <Pagination
          totalItems={totalUsers}
          limit={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {selectedItemId && <CardModal />}
      </main>
    </>
  );
};

export default MainPage;

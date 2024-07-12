import React from 'react';
import styles from './searchresults.module.css';
import ISearchResultsProps from '../../model/SearchResults';

const SearchResults: React.FC<ISearchResultsProps> = ({
  searchResults,
}): JSX.Element => {
  return (
    <div className={styles.searchresults}>
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((result) => (
            <div key={result.login} className={styles.searchresults__card}>
              <div className={styles.searchresults__header}>
                <h3 className={styles.searchresults__title}>{result.login}</h3>
                {result.avatar_url && (
                  <img
                    className={styles.searchresults__img}
                    src={result.avatar_url}
                    alt={result.login}
                  />
                )}
              </div>
              <p className={styles.searchresults__description}>
                {result.html_url}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p className={styles.searchresults__noresults}>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;

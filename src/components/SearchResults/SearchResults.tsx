import React from 'react';
import styles from './searchresults.module.css';
import ISearchResultsProps from '../../model/SearchResults';

class SearchResults extends React.Component<ISearchResultsProps> {
  public render() {
    const { searchResults } = this.props;

    return (
      <div className={styles.searchresults}>
        {searchResults.length > 0 ? (
          <>
            {searchResults.map((result) => (
              <div key={result.id} className={styles.searchresults__card}>
                <div className={styles.searchresults__header}>
                  <h3 className={styles.searchresults__title}>
                    {result.volumeInfo.title}
                  </h3>
                  <img
                    className={styles.searchresults__img}
                    src={result.volumeInfo.imageLinks?.thumbnail}
                    alt={result.volumeInfo.title}
                  />
                </div>
                <p className={styles.searchresults__description}>
                  {result.volumeInfo.description}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className={styles.searchresults__noresults}>No results found</p>
        )}
      </div>
    );
  }
}

export default SearchResults;

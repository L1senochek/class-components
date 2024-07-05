import React from 'react';
import styles from './searchresults.module.css';
import ISearchResultsProps from '../../model/SearchResults';

class SearchResults extends React.Component<ISearchResultsProps> {
  public render() {
    const { searchResults } = this.props;

    return (
      <div className={styles.searchresults}>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <strong>{result.volumeInfo.title}</strong>
                <img
                  src={result.volumeInfo.imageLinks?.thumbnail}
                  alt={result.volumeInfo.title}
                />
                <p>{result.volumeInfo.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  }
}

export default SearchResults;

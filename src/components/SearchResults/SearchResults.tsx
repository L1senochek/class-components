import React from 'react';
import styles from './searchresults.module.css';
import { IGoogleBooksApiItem } from '../../App';

interface SearchResultsProps {
  searchResults: IGoogleBooksApiItem[];
  error: Error | null;
}

class SearchResults extends React.Component<SearchResultsProps> {
  render() {
    const { searchResults, error } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    console.log(searchResults, 11111111111);

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

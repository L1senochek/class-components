import React, { ChangeEvent } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

interface IAppProps {}

interface IAppState {
  searchTerm: string;
  searchResults: IGoogleBooksApiItem[];
  error: Error | null;
}

export interface IGoogleBooksApiItem {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      error: null,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.fetchSearchResults(savedSearchTerm);
    } else {
      this.fetchSearchResults('');
    }
  }

  fetchSearchResults = async (
    term: string,
    limit: number = 10,
    page: number = 1
  ) => {
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

      this.setState({ searchResults: items, error: null });

      console.log(data, data.items);

      localStorage.setItem('searchTerm', term.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = () => {
    const { searchTerm } = this.state;
    this.fetchSearchResults(searchTerm);
    console.log(searchTerm);
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    const { searchTerm, searchResults, error } = this.state;

    return (
      <>
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={this.handleSearchInputChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <button onClick={this.throwError}>Throw Error</button>
        <SearchResults searchResults={searchResults} error={error} />
      </>
    );
  }
}

export default App;

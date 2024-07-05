import React, { ChangeEvent } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { IAppProps, IAppState, IGoogleBooksApiItem } from './model/App';

class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      error: null,
      throwError: false,
    };
  }

  public componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.fetchSearchResults(savedSearchTerm);
    } else {
      this.fetchSearchResults('');
    }
  }

  private fetchSearchResults = async (
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
      localStorage.setItem('searchTerm', term.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  private handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  private handleSearchSubmit = () => {
    const { searchTerm } = this.state;
    this.fetchSearchResults(searchTerm);
  };

  private handleThrowError = () => {
    this.setState({ throwError: true });
  };

  public render() {
    const { searchTerm, searchResults, throwError } = this.state;

    if (throwError) {
      throw new Error('Test error');
    }

    return (
      <>
        <header className="top-section">
          <SearchBar
            searchTerm={searchTerm}
            onInputChange={this.handleSearchInputChange}
            onSearchSubmit={this.handleSearchSubmit}
          />
          <button onClick={this.handleThrowError}>Throw Error</button>
        </header>
        <main className="middle-section">
          <SearchResults searchResults={searchResults} />
        </main>
      </>
    );
  }
}

export default App;

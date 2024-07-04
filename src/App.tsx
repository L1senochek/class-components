import React, { ChangeEvent } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';

interface IAppProps {}

interface IAppState {
  searchTerm: string;
  searchResults: string[];
  error: Error | null;
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

  handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = () => {
    const { searchTerm } = this.state;
    console.log(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <>
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={this.handleSearchInputChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <button>Throw Error</button>
        SearchResults
      </>
    );
  }
}

export default App;

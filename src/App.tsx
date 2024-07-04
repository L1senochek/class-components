import React from 'react';
import './App.css';

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

  render() {
    return (
      <>
        SearchBar
        <button>Throw Error</button>
        SearchResults
      </>
    );
  }
}

export default App;

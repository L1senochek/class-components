interface IGitHubUserCardProps {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface ISearchResultsProps {
  searchResults: IGitHubUserCardProps[];
}

export default ISearchResultsProps;

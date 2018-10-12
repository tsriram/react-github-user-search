import * as React from "react";

import "../styles/user-search.css";
import SearchBar from "./SearchBar";

interface SearchPageState {
  readonly query: string;
}

export default class UserSearchPage extends React.Component<
  {},
  SearchPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = this.state.query;
    console.log("query: ", query);
  };

  public render() {
    return (
      <div className="user-search page-container">
        <h2>User Search</h2>
        <SearchBar
          query={this.state.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

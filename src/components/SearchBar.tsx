import * as React from "react";

interface SearchBarProps {
  readonly query: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly onSubmit: React.EventHandler<React.FormEvent>;
}

const SearchBar: React.SFC<SearchBarProps> = ({
  query,
  onChange,
  onSubmit
}) => {
  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search GitHub users"
          autoFocus
          onChange={onChange}
          value={query}
          className="search-input"
        />
        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

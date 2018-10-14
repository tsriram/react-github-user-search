import { IconContext } from "react-icons";
import { GoMail, GoLocation } from "react-icons/go";
import * as React from "react";

interface SearchResultProps {
  readonly userNode: {
    readonly name: string;
    readonly email: string;
    readonly bio: string;
    readonly login: string;
    readonly avatarUrl: string;
    readonly location: string;
    readonly url: string;
  };
}

const SearchResult: React.SFC<SearchResultProps> = props => {
  const { name, email, bio, login, avatarUrl, location, url } = props.userNode;

  return (
    <IconContext.Provider value={{ className: "react-icons-go" }}>
      <div className="search-result">
        <img className="avatar" alt={name} src={`${avatarUrl}&s=96`} />
        <div className="user-info">
          <div className="row">
            <a className="user-login" href={url} target="_blank">
              {login}
            </a>
            <span className="user-name">{name}</span>
          </div>

          {bio && (
            <div className="row">
              <div className="user-bio">{bio}</div>
            </div>
          )}

          <div className="row">
            {location && (
              <div className="user-location">
                <GoLocation />
                {location}
              </div>
            )}
            {email && (
              <div className="user-email">
                <GoMail />
                {email}
              </div>
            )}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default SearchResult;
